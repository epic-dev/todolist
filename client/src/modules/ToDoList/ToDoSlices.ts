import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IToDo } from "./interfaces/IToDo";

interface IToDoInitialState {
    entry: IToDo | null;

    successfullyAdded: boolean | null;

    entries: IToDo[] | null;
    errors: string[] | null;
}

// probbaly could be union type
const initialState: IToDoInitialState = {
    entry: null,

    successfullyAdded: null,

    entries: [],
    errors: null,
}

export const ToDoSlice = createSlice({
    name: 'ToDoSlice',
    initialState,
    reducers: {
        setToDos: (state, action: PayloadAction<IToDo[]>) => {
            state.entries = action.payload;
        },
        setFailedState: (state, action: PayloadAction<string[]>) => {
            state.entries = null;
            state.errors = action.payload;
        },
        setOneToDo: (state, action: PayloadAction<IToDo>) => {
            state.entry = action.payload;
        },
        newToDoAdded: (state, action: PayloadAction<boolean>) => {
            state.successfullyAdded = action.payload;
        }
    }
});

export const { setToDos, setFailedState, setOneToDo, newToDoAdded } = ToDoSlice.actions;

export default ToDoSlice.reducer;