import { Response } from "express";
import { MongooseError } from "mongoose";
import { ZodError } from "zod";
import { log } from "./log";
export class Errors extends Error {
    constructor(public message: string, public httpCode: number, public errorMode: string[]) {
        super(message)
    }
    static handler(error: unknown, res: Response) {
        log({ message: error as any, type: "error" });
        // log(error as any, "error", "error handler", "runing", error);
        if (error instanceof ZodError) {
            const errorMode = error.issues.map((issue) => issue.path[0]) as string[];
            const message = error.errors.map((zodissue) => zodissue.message).join(", ");
            res.status(400).json({ errorMode, message });
        } else if (error instanceof MongooseError) {
            // mongoose error
            res.status(500).json({
                message: "database error",
                errorMode: ["serveur"],
            });
        } else if (error instanceof Errors) {
            res.status(error.httpCode).json({
                message: error.message,
                errorMode: error.errorMode,
            });
        } else {
            res.status(500).json({
                message: "unknown error",
                errorMode: ["serveur"],
            });
        }
    }
}