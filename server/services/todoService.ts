import ToDoModel from "../models/ToDo";

class ToDoService {
    async createToDo(label: string) {
        try {
            await ToDoModel.create({
                label,
                checked: false,
            })
        } catch(e) {
            console.log(e)
            throw e;
        }
    }
    async getAllToDos() {
        const todos = await ToDoModel.find()
        return todos;
    }
    async getToDoById(id: string) {
        const todo = await ToDoModel.findOne({ id });
        return todo;
    }
}

export default new ToDoService();