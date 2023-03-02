import { Action, MiddlewareAPI, Dispatch } from "redux";

const checkAuthStatus = ({ dispatch, getState }: MiddlewareAPI) =>
    (next: Dispatch) => (action: Action) => {
        const { auth } = getState()
        const isAuthenticated = auth.isAuthenticated;
        if (!isAuthenticated) {
            console.log('UNAUTHENTICATED');
        }
        return next(action);
    };

export const authMiddlewares = [
    checkAuthStatus,
];