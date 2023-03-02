import ToDoModel from "../models/ToDo";
import { Document } from "mongoose";

export class ToDoDTO {
    id: string;
    label: string;
    checked: boolean;
    constructor(model: Document<typeof ToDoModel>) {
        this.id = model.get('_id');
        this.label = model.get('label');
        this.checked = model.get('checked');
    }
}