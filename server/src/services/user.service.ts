import { userModel } from "../models";
import { IUser } from "../models/user.model";
interface TCreateUserData {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
}
export class UserService {
    public async createUser(data: TCreateUserData): Promise<IUser> {
        const isUser = await userModel.model.findOne({ email: data.email });
        if (isUser) throw new Error("User with this email already exists");
        const user = await userModel.model.create(data);
        // send email with verification token
        return user;
    }
}