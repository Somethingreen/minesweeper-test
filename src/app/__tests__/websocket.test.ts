import { Action, PayloadAction } from "@reduxjs/toolkit";
import { createEventChannel, actions } from "../websocket";


describe("createEventChannel", () => {
  it("Should convert socket events to corresponding actions", async () => {
    const ws = new EventTarget() as WebSocket;
    ws.close = jest.fn(() => {});
    const chan = createEventChannel(ws);

    let take = new Promise(resolve => chan.take(resolve));
    ws.dispatchEvent(new Event("open"));
    let action = await take as Action;
    expect(action.type).toEqual(actions.SOCKET_OPEN);

    take = new Promise(resolve => chan.take(resolve));
    ws.dispatchEvent(new Event("error"));
    action = await take as Action;
    expect(action.type).toEqual(actions.SOCKET_ERROR);

    take = new Promise(resolve => chan.take(resolve));
    ws.dispatchEvent(new CloseEvent("close"));
    action = await take as Action;
    expect(action.type).toEqual(actions.SOCKET_CLOSED);

    take = new Promise(resolve => chan.take(resolve));
    const message = new MessageEvent("message", { data: "test" });
    ws.dispatchEvent(message);
    let payloadAction = await take as PayloadAction;
    expect(payloadAction.type).toEqual(actions.SOCKET_MESSAGE);
    expect(payloadAction.payload).toEqual("test");
  });
});
