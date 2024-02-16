import { Schema, HydratedDocument } from "mongoose";
import { Model, TObjectId } from "./type";

export enum Role {
    ADMIN,
    USER
}
export enum Status {
    ACTIVE,
    EMAIL_NOT_VERIFIED,
    BANNED
};
export interface IUser {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    role: Role,
    status: Status,
    basket: {
        product: TObjectId,
        quantity: number,
    }[],
}
export interface IUserDocument extends HydratedDocument<IUser> { }

export class UserModel extends Model<IUser> {
    constructor() {
        super({
            email: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            },
            firstname: {
                type: String,
                required: true
            },
            lastname: {
                type: String,
                required: true
            },
            status: {
                type: Number,
                required: true,
                default: Status.EMAIL_NOT_VERIFIED,
                enum: [Status.ACTIVE, Status.EMAIL_NOT_VERIFIED, Status.BANNED]
            },
            role: {
                type: Number,
                required: true,
                default: Role.USER,
                enum: [Role.ADMIN, Role.USER]
            },
            basket: {
                type: [{
                    product: {
                        type: Schema.Types.ObjectId,
                        required: true,
                        ref: "products"
                    },
                    quantity: {
                        type: Number,
                        required: true
                    }
                }],
                required: true,
                default: []
            }
        }, "users");
    }
}