import express from "express";
import { createServer } from "http";
import { Server as Socket } from "socket.io";
import { Controllers } from "./controllers";

export const app = express();
export const server = createServer(app);
export const socket = new Socket(server);

for (const controller of Controllers) {
    new controller(app, socket).init();
}