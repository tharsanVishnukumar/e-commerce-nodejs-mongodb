import express from "express";
import { createServer } from "http";
import { Server as Socket } from "socket.io";
import { Controllers } from "./controllers";

export const app = express();
export const server = createServer(app);
export const socket = new Socket(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

for (const Controller of Controllers) {
    new Controller(app, socket).init();
}