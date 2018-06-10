import { createAction } from 'redux-actions';

export namespace GridActions {
  export enum Type {
    OVER_CELL = 'OVER_CELL',
    OUT_CELL = 'OUT_CELL',
    CLICK_CELL = 'CLICK_CELL',
    START_GAME = 'START_GAME',
    SHOOT_CELL = 'SHOOT_CELL',
  }

  export const overCell = createAction<{rowId: number, columnId: number}>(Type.OVER_CELL);
  export const outCell = createAction(Type.OUT_CELL);
  export const clickCell = createAction<{rowId: number, columnId: number}>(Type.CLICK_CELL);
  export const startGame = createAction(Type.START_GAME);
  export const shootCell = createAction(Type.SHOOT_CELL);
}

export type GridActions = Omit<typeof GridActions, 'Type'>;
