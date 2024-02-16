import { Errors } from "../error";
import { userModel } from "../models";
import { IUserDocument } from "../models/user.model";
import { hash, compare } from "bcrypt";

interface TCreateUserData {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
}
interface TAuthenticateData {
    email: string;
    password: string;
}

export class UserService {
    public async create(data: TCreateUserData): Promise<IUserDocument> {
        const isUser = await userModel.model.findOne({ email: data.email });
        if (isUser) throw new Error("User with this email already exists");
        data.password = await hash(data.password, 10);
        const user = await userModel.model.create(data);
        // send email with verification token
        return user;
    }
    async authenticate(data: TAuthenticateData): Promise<IUserDocument> {
        const user = await userModel.model.findOne({ email: data.email });
        if (!user) throw new Errors("email or password is not valid ", 203, ["email", "password"]);
        const isPassword = await compare(data.password, user.password);
        if (!isPassword) throw new Errors("email or password is not valid ", 203, ["email", "password"]);
        return user;
    }
}