import { AxiosResponse } from "axios";
import $api from "../../../shared/http";
import { ToDoListResponse } from "../../../models/ToDoListResponse";

export default class ToDoListService {
    static async getTodos(): Promise<AxiosResponse<ToDoListResponse>> {
        // TODO: get todo's via graphql
        return $api.get<ToDoListResponse[]>('/getTodos');
    }
}