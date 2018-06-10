export interface IShip {
  id: number,
  points: number[][];
  status: ShipModel.Status;
}

export namespace ShipModel {
  export enum Status {
    INIT = 'INIT',
    READY = 'READY',
    DESTROYED = 'DESTROYED',
  }
}
