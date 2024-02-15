import { Schema } from "mongoose";
import { Model, TObjectId } from "./type";

export enum Status {
    ACTIVE,
    INACTIVE
}
export interface IProduct {
    prise: number,
    title: string,
    description: string,
    image: string,
    status: Status,
}
export class ProductModel extends Model<IProduct> {
    constructor() {
        super({
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            prise: {
                type: Number,
                required: true
            },
            status: {
                type: Number,
                required: true,
                default: Status.ACTIVE,
                enum: [Status.ACTIVE, Status.INACTIVE]
            },
        }, "products");
    }
}