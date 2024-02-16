import { Schema, SchemaDefinition, model as MongoseModel, ObjectId, Types } from "mongoose"
export class Model<T = {}> extends Schema<T> {
    get model() {
        return MongoseModel<T>(this.colletion, this)
    }
    constructor(definition: SchemaDefinition<T>, public colletion: string) {
        super(definition)
        this.transform();
    }
    transform() {
        this.set('toJSON', {
            virtuals: true,
            transform: function (doc, ret) {
                delete ret._id;
                delete ret.__v;
            },
        });

    }
}
export type TObjectId = ObjectId | Schema.Types.ObjectId | Types.ObjectId;