import { Schema } from "mongoose";
import { Model, TObjectId } from "./type";

export enum Status {
    ACTIVE,
    INACTIVE
}
export interface ISession {
    token: string,
    date: Date,
    user: TObjectId,
    status: Status,
}
export class SessionModel extends Model<ISession> {
    constructor() {
        super({
            date: {
                type: Date,
                required: true
            },
            token: {
                type: String,
                required: true
            },
            user: {
                type: Schema.Types.ObjectId,
                ref: "users",
                required: true
            },
            status: {
                type: Number,
                required: true,
                default: Status.ACTIVE,
                enum: [Status.ACTIVE, Status.INACTIVE]
            },
        }, "sessions");
    }
}