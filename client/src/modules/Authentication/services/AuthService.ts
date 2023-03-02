import { AxiosResponse } from "axios";
import $api from "../../../shared/http";
import { IAuthResponse } from "../interfaces/IAuthResponse";

// TODO: service handlers should not depend on data fetcher
// make an interface e.g. Data provider which could be axios/fetch/etc.

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>('/user/login', { email, password });
    }
    static async logout(): Promise<void> {
        return $api.post('/user/logout');
    }
    static async registration(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>('/user/registration', { email, password });
    }
}