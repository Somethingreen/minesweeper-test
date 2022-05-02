import { PayloadAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";
import { socketSend, actions } from "../../app/websocket";
import { updateField, win, lose } from "./gameSlice";
import { CellCoords } from "./gameTypes";

function* gameStart(action: PayloadAction<string>) {
  yield put(socketSend(`new ${action.payload}`));
}

function* openCell(action: PayloadAction<CellCoords>) {
  yield put(socketSend(`open ${action.payload.col} ${action.payload.row}`));
}

function* apiMessage(action: PayloadAction<string>) {
  switch (action.payload) {
    case 'new: OK':
    case 'open: OK':
      yield put(socketSend('map'));
      break;
    case 'open: You lose':
      yield put(lose());
      break;
    default:
      if (action.payload.startsWith('map:')) {
        const map = action.payload.substring(4);
        yield put(updateField(map));
      } else if (action.payload.startsWith('open: You win')) {
        yield put(win());
      }
  }
}

export function* gameSaga() {
  yield takeEvery('game/start', gameStart);
  yield takeEvery('game/open_cell', openCell);
  yield takeEvery(actions.SOCKET_MESSAGE, apiMessage);
}
