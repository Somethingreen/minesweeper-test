import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { GameField, CellCoords, GameSessionState, CellState } from './gameTypes';


export interface GameState {
  field: GameField | null,
  state: GameSessionState
}

const initialState: GameState = {
  field: null,
  state: GameSessionState.PENDING
};

const parseField = (map: string): GameField => {
  const rows = map.split("\n").filter(x => x.length > 0);
  const field: GameField = rows.map(line => {
    const cells: Array<CellState> = line.split("") as CellState[];
    return cells;
  });
  return field;
}

const mergeField = (oldField: GameField, newField: GameField): GameField => {
  const result: GameField = oldField.map((row, i) => row.map((x, j) => {
    const newState = newField[i][j];
    if (newState !== CellState.UNKNOWN) {
      return newState;
    }
    return x;
  }));
  return result;
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<string>) => {
      const newField = parseField(action.payload);
      if (state.field === null) {
        state.field = newField;
      } else {
        state.field = mergeField(state.field, newField);
      }
    },

    cycleCell: (state, action: PayloadAction<CellCoords>) => {
      if (state.field) {
          const row = action.payload.row
          const col = action.payload.col;
          const oldCellState = state.field[row][col];
          let newCellState = oldCellState;

        switch (oldCellState) {
          case CellState.UNKNOWN:
            newCellState = CellState.MARKED; break;
          case CellState.MARKED:
            newCellState = CellState.MAYBE; break;
          case CellState.MAYBE:
            newCellState = CellState.UNKNOWN; break;
        }

        state.field[row][col] = newCellState;
      }
    },

    lose: (state) => {
      state.state = GameSessionState.LOST;
    },

    win: (state) => {
      state.state = GameSessionState.WON;
    },

    reset: () => initialState
  }
});

export const { updateField, cycleCell, win, lose, reset } = gameSlice.actions;

export const selectField = (state: RootState) => state.game.field;
export const selectGameState = (state: RootState) => state.game.state;

export default gameSlice.reducer;
