import { ICell, IShip, GridModel } from 'app/models';
import { RouterState } from 'react-router-redux';

export interface RootState {
  grid: RootState.GridState;
  router: RouterState;
}

export namespace RootState {
  export type GridState = {
    status: GridModel.Status,
    cells: ICell[],
    ships: IShip[],
    shoot: {
      position: number,
      order: number[],
    },
  };
}
