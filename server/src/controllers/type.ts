import { Application } from "express";
import { Server as Socket } from "socket.io";
import { log } from "../log";
export class Controller {
    app: Application;
    socket: Socket;
    constructor(app: Application, socket: Socket) {
        this.app = app;
        this.socket = socket;
    }
    init() {
        log(
            {
                message: `no init method found in controller`,
                type: "error"
            }
        )
    }
}