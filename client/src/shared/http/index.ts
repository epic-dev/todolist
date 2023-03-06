import axios from 'axios';
import { IAuthResponse } from '../../modules/Authentication';

export const API_URL = 'http://localhost:3000/api'; // TODO: to config

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

export default $api;

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    // TODO re-think authorization process, 
    // probably we should not call /refresh endpoint at all
    const origin = error.config;
    if(error.response.status === 401 && !origin._retry) {
        console.log('[Response Interceptor]; Retry on 401')
        origin._retry = true;
        const { data } = await axios.get<IAuthResponse>(API_URL + '/user/refresh', { withCredentials: true });
        localStorage.setItem('token', data.accessToken);
    }
})