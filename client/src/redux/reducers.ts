import { combineReducers } from "redux";
import { ToDoReducer } from "../modules/ToDoList";
import { AuthReducer } from "../modules/Authentication";

export const rootReducer = combineReducers({
    todos: ToDoReducer,
    auth: AuthReducer,
});