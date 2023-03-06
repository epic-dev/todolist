import { AxiosResponse } from "axios";
import $api from "../../../shared/http";
import { IToDo } from "../interfaces/IToDo";

export default class ToDoListService {
    static async getTodos(): Promise<AxiosResponse<IToDo[]>> {
        // TODO: get todo's via graphql
        return $api.get<IToDo[]>('/getTodos');
    }
}