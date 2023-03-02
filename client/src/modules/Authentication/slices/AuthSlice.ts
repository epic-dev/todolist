import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../redux/store";
import { IUser } from "../interfaces/IUser";

interface IAuthState {
    user: IUser | null;
    isAuthenticated: boolean;
    token: string | null;
    errors: string[] | null;
}
interface IAuthSuccessPayload {
    user: IUser;
    accessToken: string;
}

const initialState: IAuthState = {
    user: null,
    isAuthenticated: false,
    token: null,
    errors: null,
}
// @ts-ignore
export const AuthSlice = createSlice({
    name: 'AuthSlice',
    initialState,
    reducers: {
        setSuccessAuth: (state, action: PayloadAction<IAuthSuccessPayload>) => {
            const {
                user,
                accessToken,
            } = action.payload;

            state.user = user;
            state.token = accessToken;
            state.isAuthenticated = true;
        },
        setAuthError: (state, action: PayloadAction<string[]>) => {
            state = initialState;
            state.errors = action.payload;
        },
        reset: (state) => {
            state = initialState;
        }
    },
})

export const { setSuccessAuth, setAuthError, reset } = AuthSlice.actions;

export default AuthSlice.reducer;

// TODO: probably move to selectors directory
export const getUser = (state: RootState) => state.auth.user;
export const getAuth = (state: RootState) => state.auth;
export const isAuthenticated = (state: RootState) => state.auth.isAuthenticated;