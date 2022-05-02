import { Action, PayloadAction } from "@reduxjs/toolkit";
import { EventChannel, eventChannel } from "redux-saga";

export const actions = {
  SOCKET_OPEN: 'socket/open',
  SOCKET_ERROR: 'socket/error',
  SOCKET_CLOSED: 'socket/closed',
  SOCKET_MESSAGE: 'socket/message',
  SOCKET_SEND: 'socket/send'
}

const socketOpen = (_: Event): Action => ({ type: actions.SOCKET_OPEN });
const socketError = (_: Event): Action => ({ type: actions.SOCKET_ERROR });
const socketClosed = (_: CloseEvent): Action => ({ type: actions.SOCKET_CLOSED });
const socketMessage = (e: MessageEvent): PayloadAction<string> => ({ type: actions.SOCKET_MESSAGE, payload: e.data });

export function createEventChannel(ws: WebSocket): EventChannel<unknown> {
  return eventChannel((emit) => {
    ws.addEventListener('open', (e: Event) => emit(socketOpen(e)));
    ws.addEventListener('error', (e) => emit(socketError(e)));
    ws.addEventListener('close', (e: CloseEvent) => emit(socketClosed(e)));
    ws.addEventListener('message', (e: MessageEvent) => emit(socketMessage(e)));
    return () => ws.close();
  });
}

export function socketSend(message: string): PayloadAction<string> {
    return { type: actions.SOCKET_SEND, payload: message };
}

export function createWebsocketConnection(url: string): WebSocket {
  return new WebSocket(url);
}
