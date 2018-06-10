export interface ICell {
  rowId: number,
  columnId: number,
  over: boolean;
  lock: boolean;
  error: boolean;
  hit: boolean;
  ship?: {
    id: number;
    rowId: number;
    columnId: number;
  };
}
