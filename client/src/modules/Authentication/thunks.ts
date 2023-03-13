import { Dispatch } from "redux";
import AuthService from "./services/AuthService";
import { reset, setAuthError, setSuccessAuth } from "./slices/AuthSlice";
import { AxiosError } from "axios";

export const login = (email: string, password: string) =>
    async (dispatch: Dispatch) => {
        try {
            const response = await AuthService.login(email, password);
            if (!response) {
                console.log(response)
                
                return;
            }
            const { data } = response;
            dispatch(setSuccessAuth(data));

            /** temporary: saving token to the local storage
             * the better way is to store the token in httpOnly cookies
             */
            localStorage.setItem('token', data.accessToken);
            return true;
        } catch(e) {
            // FIXME
            const { response } = e as AxiosError<{message: string, errors: string[]}>; //axios error
            dispatch(setAuthError([response?.data.message ?? '']));
            return false;
        }
    }
export const logout = () => (dispatch: Dispatch) => {
    localStorage.removeItem('token');
    dispatch(reset());
};
export const registration = (email: string, password: string) =>
    async (dispatch: Dispatch) => {
        try {
            const { data } = await AuthService.registration(email, password);
            dispatch(setSuccessAuth(data));
            // see comment above
            localStorage.setItem('token', data.accessToken);
        } catch(e) {
            // FIXME DRY
            const { response } = e as AxiosError<{message: string, errors: string[]}>; //axios error
            dispatch(setAuthError([response?.data.message ?? '']));
        }
    }