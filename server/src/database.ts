import mongoose, { Mongoose } from "mongoose"
import { log } from "./log";
import { envirements } from "./env";
export class Database {
    mongoose: Mongoose = mongoose;
    async connect() {
        await this.mongoose.connect(envirements.databaseUri);
        log({ message: 'Database connected', type: 'info' })
    }
}