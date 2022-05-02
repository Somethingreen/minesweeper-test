import { createAction } from "@reduxjs/toolkit";
import { CellCoords } from "./gameTypes";

export const start = createAction<string>('game/start');
export const openCell = createAction<CellCoords>('game/open_cell');
