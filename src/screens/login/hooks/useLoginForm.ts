import {useContext, useState} from "react";
import {AuthContext} from "contexts/authContext";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {authApiService} from "services/api/AuthApiService";
import {axios} from "config/http";
import PATHS from "constants/paths";
import {useNavigate} from "react-router-dom";
import {loginSchema} from "../formSchemas/loginSchema";

interface LoginFormValues {
    email: string;
    password: string;
}

export function useLoginForm() {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const [showLoading, setShowLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const loginForm = useForm<LoginFormValues>({
        mode: 'onChange',
        defaultValues: { email: '', password: '' },
        resolver: joiResolver(loginSchema),
    });

    const handleSubmit = async ({ email, password }: LoginFormValues) => {
        setShowLoading(true);
        const response = await authApiService.login(email, password);

        if (!response.success) {
            setShowLoading(false);
            setShowError(true);
            return;
        }

        if (!response.payload) {
            return;
        }

        authContext.setUser(response.payload.user);
        const token = response.payload?.token as string;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['authorization'] = token;
        setShowLoading(false);
        navigate(PATHS.MONITOR);
    };

    return {
        showLoading,
        showError,
        handleSubmit,
        setShowError,
        loginForm
    }
}
