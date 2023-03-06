import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { PageNotFound } from "../404";
import { AuthPage } from "../modules/Authentication";
import { ToDoListView } from "../modules/ToDoList";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <PageNotFound />,
        children: [
            {
                path: '/login',
                element: <AuthPage />
            },
            {
                path: '/todos',
                element: <ToDoListView />
            },
        ],
    },
]);