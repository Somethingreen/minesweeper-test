import reducer, { cycleCell, GameState, updateField } from '../gameSlice';
import { CellState, GameSessionState } from '../gameTypes';

const UNK = CellState.UNKNOWN;
const MRK = CellState.MARKED;
const MBY = CellState.MAYBE;
const CN1 = CellState.N1;

describe("updateField", () => {
  it("should set field if empty", () => {
    const state: GameState = { field: null, state: GameSessionState.PENDING };
    const result = reducer(state, updateField(UNK + UNK + "\n" + UNK + "1\n"));
    expect(result).toEqual({ field: [[UNK, UNK], [UNK, '1']], state: GameSessionState.PENDING });
  });

  it("should update field preferring known state", () => {
    const state: GameState = { field: [[UNK, MRK], [MBY, CN1]], state: GameSessionState.PENDING };
    const result = reducer(state, updateField(UNK + '1' + "\n" + '1' + "1\n"));
    expect(result).toEqual({ field: [[UNK, '1'], ['1', '1']], state: GameSessionState.PENDING });
  });
});

describe("cycleCell", () => {
  it("should cycle local cell state", () => {
    let state: GameState = { field: [[UNK, MRK], [MBY, UNK]], state: GameSessionState.PENDING };
    state = reducer(state, cycleCell({ row: 0, col: 0 }));
    expect(state).toEqual({ field: [[MRK, MRK], [MBY, UNK]], state: GameSessionState.PENDING });

    state = reducer(state, cycleCell({ row: 0, col: 0 }));
    expect(state).toEqual({ field: [[MBY, MRK], [MBY, UNK]], state: GameSessionState.PENDING });

    state = reducer(state, cycleCell({ row: 0, col: 0 }));
    expect(state).toEqual({ field: [[UNK, MRK], [MBY, UNK]], state: GameSessionState.PENDING });
  });
});
