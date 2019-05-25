import socketIo from "socket.io-client";
import { socketTest } from "../constants/routes";

/** Events */
import { SEND_MESSAGE, RECEIVE_MESSAGE } from "./events";

export const socket = socketIo(socketTest);

export const joinRoom = () => socket.emit("join");

export const sendMessage = (message: string) => {
  socket.emit(SEND_MESSAGE, { message });
};

export const receiveMessage = (messageDataCb: (messageData: any) => void) => {
  socket.on(RECEIVE_MESSAGE, (messageData: any) => {
    messageDataCb(messageData);
  });
};

export const stopListening = (eventName: string) => {
  socket.off(eventName);
};
