import { Schema, SchemaDefinition, model as MongoseModel, ObjectId, Types } from "mongoose"
export class Model<T = {}> extends Schema<T> {
    get model() {
        return MongoseModel<T>(this.colletion, this)
    }
    constructor(definition: SchemaDefinition<T>, public colletion: string) {
        super(definition)
    }
}
export type TObjectId = ObjectId | Schema.Types.ObjectId | Types.ObjectId;