import { gameSaga } from "../gameSagas";
import { expectSaga } from "redux-saga-test-plan";

describe("apiMessage", () => {
  it("should request map on OK response to from 'new' and 'open'", () => {
    expectSaga(gameSaga)
      .put({ type: 'socket/send', payload: 'map' })
      .dispatch({ type: 'socket/message', payload: 'new: OK' })
      .run();

    expectSaga(gameSaga)
      .put({ type: 'socket/send', payload: 'map' })
      .dispatch({ type: 'socket/message', payload: 'open: OK' })
      .run();
  });

  it("should put game into lost state on loss", () => {
    expectSaga(gameSaga)
      .put({ type: 'game/lose' })
      .dispatch({ type: 'socket/message', payload: 'open: You lose' })
      .run();
  });

  it("should put game into won state on win", () => {
    expectSaga(gameSaga)
      .put({ type: 'game/win' })
      .dispatch({ type: 'socket/message', payload: 'open: You win - lorem ipsum' })
      .run();
  });

  it("should pass game field state on 'map' response", () => {
    expectSaga(gameSaga)
      .put({ type: 'game/updateField', payload: "123\n456\n789\n" })
      .dispatch({ type: 'socket/message', payload: "map:\n123\n456\n789\n" })
      .run();
  });
});

describe("gameStart", () => {
  it("should send game start request", () => {
    expectSaga(gameSaga)
      .put({ type: 'socket/send', payload: 'map' })
      .dispatch({ type: 'game/start' })
      .run();
  })
});

describe("openCell", () => {
  it("should send 'open' request", () => {
    expectSaga(gameSaga)
      .put({ type: 'socket/send', payload: 'open 1 2' })
      .dispatch({ type: 'game/openCell', payload: { col: 2, row: 1 } })
      .run();
  });
});
