import { NextFunction, Request, Response } from "express";
import ToDoService from "../services/todoService";
import { ToDoDTO } from "../dto/ToDoDto";
import { ApiError } from "../exceptions/apiError";

class ToDosController {
    async addNewToDo(req: Request, res: Response, next: NextFunction) {
        const { label } = req.body; // TODO: validate
        try {
            await ToDoService.createToDo(label);
            res.sendStatus(200);
        } catch(e) {
            next(ApiError.UnhandledException('Could not create new ToDo'));
        }
    }
    async fetchAllToDos(req: Request, res: Response, next: NextFunction) {
        const todos = await ToDoService.getAllToDos();
        const dtos = todos.map(todo => new ToDoDTO(todo));
        return res.json(dtos);
    }
    async fetchToDoById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.body;
        try {
            const todo = await ToDoService.getToDoById(id);
            if (!todo) {
                return next(ApiError.NotFound(`No such entity id: ${id}`));
            }
            return res.json(new ToDoDTO(todo))
        } catch (e) {
            throw ApiError.UnhandledException('Could not fetch ToDo');
        }
    }
    async toggleToDo(req: Request, res: Response, next: NextFunction) {

    }
    async removeToDo(req: Request, res: Response, next: NextFunction) {

    }
    async updateToDoLabel(req: Request, res: Response, next: NextFunction) {

    }
}

const tc = new ToDosController();

export default tc;
