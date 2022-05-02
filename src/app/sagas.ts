import { EventChannel } from 'redux-saga';
import { take, put, apply } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';


export function* socketSend(ws: WebSocket, action: PayloadAction<string>) {
  yield apply(ws, 'send', [action.payload]);
}

export function* watchSocketChannel(chan: EventChannel<unknown>): any {
  while (true) {
    try {
      const action = yield take(chan);
      yield put(action);
    } catch (err) {
      console.error(err);
    }
  }
}
