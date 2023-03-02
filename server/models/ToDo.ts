import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

@modelOptions({ schemaOptions: { collection: 'todos', timestamps: true } })
class ToDo {
    @prop({ required: true, auto: true })
    public id: ObjectId;

    @prop({ required: true })
    public label: string;

    @prop({ defult: false })
    public checked: boolean;
}

const ToDoModel = getModelForClass(ToDo);

export default ToDoModel;