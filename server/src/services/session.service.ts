import { Errors } from "../error";
import { sessionModel } from "../models";
import { IUserDocument } from "../models/user.model";
import { hash, compare } from "bcrypt";
import { randomBytes } from "node:crypto";

interface ICreateSessionData {
    user: IUserDocument;
}
export class SessionService {
    async create(data: ICreateSessionData) {
        const { user } = data;
        const token = randomBytes(128).toString("hex");
        const session = await sessionModel.model.create({
            user: user._id,
            date: new Date(),
            token,
            status: 0
        });
        return session;
        // const session = await userModel.createSession(user);
        // return session;
    }
}