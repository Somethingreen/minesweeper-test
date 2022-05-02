import { call, takeEvery, all } from 'redux-saga/effects';
import { createWebsocketConnection, actions, createEventChannel } from './websocket';
import { WEBSOCKET_URL } from './const';
import { gameSaga } from '../features/game/gameSagas';
import { socketSend, watchSocketChannel } from './sagas';


export default function* rootSaga(): any {
    const ws = createWebsocketConnection(WEBSOCKET_URL);
    const chan = yield call(createEventChannel, ws);

    yield takeEvery(actions.SOCKET_SEND, socketSend, ws);

    yield all([
        gameSaga(),
        watchSocketChannel(chan)
    ]);

}
