export type GameField = Array<Array<CellState>>;
export type CellCoords = {
  row: number,
  col: number
};

export enum GameSessionState {
  PENDING,
  WON,
  LOST
}

export enum CellState {
  UNKNOWN = '□',
  MARKED = '+',
  MAYBE = '?',
  N0 = "0",
  N1 = "1"
}
