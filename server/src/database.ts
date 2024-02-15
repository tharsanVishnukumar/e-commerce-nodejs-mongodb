import mongoose, { Mongoose } from "mongoose"
import { log } from "./log";
export class Database {
    mongoose: Mongoose = mongoose;
    async connect() {
        await this.mongoose.connect('mongodb://localhost:27017/e-commerce')
        log({ message: 'Database connected', type: 'info' })
    }
}