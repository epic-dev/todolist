import { Middleware, configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from '../modules/Authentication'
import { ToDoReducer } from "../modules/ToDoList";

let loggingMiddleware: Middleware = () => () => () => {};
if(process.env.NODE_ENV === 'development') {
    loggingMiddleware = ({ getState }) => (next) => (action) => {
        console.group('[LOGGER]');
        console.log('Action', action);
        console.log('State', getState());
        console.groupEnd();
        next(action);
    }
}

const store = configureStore({
    // combine reducers
    reducer: {
        todos: ToDoReducer,
        auth: AuthReducer,
    },
    middleware: (_default) =>
        _default()
        .concat(loggingMiddleware),

});

//@ts-ignore
window.store = store;

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;