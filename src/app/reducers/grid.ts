import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { GridActions } from 'app/actions';
import { ICell, IShip, GridModel, ShipModel } from 'app/models';
import { shuffleArray, getRandomItem } from 'app/utils';

const gridSize = 10;

const cells: ICell[] = [];

Array.from({length: gridSize}).forEach((r, rowId) => {
  Array.from({length: gridSize}).forEach((c, columnId) => {
    cells.push({
      rowId,
      columnId,
      over: false,
      error: false,
      lock: false,
      hit: false,
    });
  })
});

const ships: IShip[] = [
  {
    id: 0,
    points: getRandomItem([
      [[0, 0], [1, 0], [2, 0], [3, 0]],
      [[0, 0], [0, 1], [0, 2], [0, 3]],
    ]),
    status: ShipModel.Status.INIT,
  },
  {
    id: 1,
    points: getRandomItem([
      [[0, 0], [1, 0], [2, 0], [2, 1]],
      [[0, 0], [0, 1], [0, 2], [-1, 2]],
      [[0, 0], [-1, 0], [-2, 0], [-2, -1]],
      [[0, 0], [0, -1], [0, -2], [1, -2]],
    ]),
    status: ShipModel.Status.INIT,
  },
  {
    id: 2,
    points: [
      [0, 0],
    ],
    status: ShipModel.Status.INIT,
  },
  {
    id: 3,
    points: [
      [0, 0],
    ],
    status: ShipModel.Status.INIT,
  },
];

const initialState: RootState.GridState = {
  status: GridModel.Status.INIT,
  cells: cells,
  ships: ships,
  shoot: {
    position: 0,
    order: shuffleArray(Array.from({length: gridSize * gridSize}).map((k, i) => i)),
  }
};

export const gridReducer = handleActions<RootState.GridState, ICell>(
  {
    [GridActions.Type.OVER_CELL]: (state, action) => {
      if (!action.payload) {
        return state;
      }
      const ship = state.ships.find(s => s.status === ShipModel.Status.INIT);
      if (!ship) {
        return state;
      }
      const {rowId, columnId} = action.payload;
      let error = false;
      const overMap: {
        cellId: number,
        rowId: number,
        columnId: number,
      }[] = [];
      ship.points.forEach(point => {
        const targerRowId = point[0] + rowId;
        const targerColumnId = point[1] + columnId;
        const cellId = state.cells.findIndex(cell => cell.rowId === targerRowId && cell.columnId === targerColumnId);
        if (cellId > -1) {
          overMap.push({
            cellId,
            rowId: point[0],
            columnId: point[1],
          });
          if (state.cells[cellId].lock) {
            error = true;
          }
        } else {
          error = true;
        }
      });
      const cells = state.cells.map(cell => Object.assign({}, cell, {
        over: false,
        error: false,
        ship: !cell.lock ? null : cell.ship,
      }));
      overMap.forEach(({cellId, rowId, columnId}) => {
        cells[cellId].over = !error;
        cells[cellId].error = error;
        if (!error) {
          cells[cellId].ship = {
            id: ship.id,
            rowId,
            columnId,
          }
        }
      });
      return Object.assign({}, state, {cells});
    },
    [GridActions.Type.OUT_CELL]: (state, action) => {
      const cells = state.cells.map(cell => Object.assign({}, cell, {
        over: false,
        error: false,
        ship: !cell.lock ? null : cell.ship,
      }));
      return Object.assign({}, state, {cells});
    },
    [GridActions.Type.CLICK_CELL]: (state, action) => {
      const newState = Object.assign({}, state);
      const {cells, ships} = newState;
      const overCells = cells.filter(cell => cell.over && !cell.error);
      overCells.forEach(({rowId, columnId}) => {
        for (let r = rowId - 1; r <= rowId + 1; r++) {
          for (let c = columnId - 1; c <= columnId + 1; c++) {
            const cell = cells.find(a => a.rowId === r && a.columnId === c);
            if (cell) {
              cell.lock = true;
              cell.error = false;
              cell.over = false;
            }
          }
        }
      });
      const ship = ships.find(s => s.status === ShipModel.Status.INIT);
      if (ship) {
        ship.status = ShipModel.Status.READY;
      }
      if (!ships.find(s => s.status === ShipModel.Status.INIT)) {
        newState.status = GridModel.Status.READY;
      }
      return newState;
    },
    [GridActions.Type.START_GAME]: (state, action) => {
      return Object.assign({}, state, {status: GridModel.Status.GAME});
    },
    [GridActions.Type.SHOOT_CELL]: (state, action) => {
      const newState = Object.assign({}, state);
      const {shoot, cells} = newState;
      if (!cells.find(c => !!c.ship && !c.hit)) {
        newState.status = GridModel.Status.FINISH;
        return newState;
      }
      cells[shoot.order[shoot.position]].hit = true;
      shoot.position++;
      return newState;
    },
  },
  initialState,
);
