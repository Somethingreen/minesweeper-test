import { PayloadAction } from "@reduxjs/toolkit";
import { CallEffect } from "redux-saga/effects";
import { socketSend } from "../sagas";


describe("socketSend", () => {
  it("Should call send on a WebSocket", () => {
    const ws = {} as WebSocket;
    ws.send = jest.fn();
    const action: PayloadAction<string> = { type: "test", payload: "message" };
    const socketSendIter = socketSend(ws, action);
    const effect = socketSendIter.next();

    expect((effect.value as CallEffect).payload).toEqual({ context: ws, fn: ws.send, args: [ 'message' ]});
  });
});
