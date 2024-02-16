import { Errors } from "../error";
import { sessionModel, userModel } from "../models";
import { IUserDocument } from "../models/user.model";
import { hash, compare } from "bcrypt";
import { randomBytes } from "node:crypto";

interface ICreateSessionData {
    user: IUserDocument;
}
interface IAuthenticateSessionData {
    token: string
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
    }
    async authenticate(data: IAuthenticateSessionData) {
        const session = await sessionModel.model.findOne({ token: data.token });
        if (!session) throw new Errors("Session not found", 404, ["token"]);
        if (session.status !== 0) throw new Errors("Session is not active", 401, ["token"]);

        const user = await userModel.model.findOne({ _id: session.user });
        if (!user) throw new Errors("User not found", 404, ["token"]);

        return {
            user,
            session
        };
    }
}