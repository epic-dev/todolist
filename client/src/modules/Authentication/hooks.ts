import { useEffect } from "react"
import { useAppDispatch } from "../../redux/hooks";
import { setSuccessAuth } from "./slices/AuthSlice";
import axios from "axios";
import { IAuthResponse } from "./interfaces/IAuthResponse";
import { API_URL } from "../../shared/http";
import { useNavigate } from "react-router-dom";

export const useCheckAuth = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const checkAuth = async function() {
        try {
            const response = await axios.get<IAuthResponse>(`${API_URL}/user/refresh`, {
              withCredentials: true,
            });
            localStorage.setItem('token', response.data.accessToken);
            dispatch(setSuccessAuth(response.data));
            navigate('/todos');
        } catch(e) {
            console.error(e)
            navigate('/login');
        }
    }
    return useEffect(() => {
        if(localStorage.getItem('token')) {
            checkAuth();
        } else {
            navigate('/login');
        }
    }, []);
}