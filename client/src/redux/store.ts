import { Middleware, configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";

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
    reducer: rootReducer,
    middleware: (_default) =>
        _default()
        .concat(loggingMiddleware),

});
/**
 * it's enough for me to look at the store directly in chrome dev tools :)
 * no need to install react dev tools
 * */
//@ts-ignore
window.store = store;

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;