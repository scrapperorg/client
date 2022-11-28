import {useState} from "react";
import {useParams} from "react-router-dom";
import {ResetPasswordFormValues} from "../components/resetForm";
import {authApiService} from "services/api/AuthApiService";

export interface HandleValidateProps {
    token: string;
}

export function useResetPasswordForm() {
    const [showError, setShowError] = useState(false);
    const [showInvalidTokenMessage, setShowInvalidTokenMessage] = useState(false);
    const [isPasswordReset, setIsPasswordReset] = useState(false);
    const [showResetLoading, setShowResetLoading] = useState(false);
    const [showValidateLoading, setShowValidateLoading] = useState(false);
    const [isTokenValidated, setIsTokenValidated] = useState(false);

    const { token='' } = useParams();

    const handleResetPassword = async ({ password }: ResetPasswordFormValues) => {
        setShowResetLoading(true);
        const response = await authApiService.resetPassword(token, password);

        if (!response.success) {
            setShowResetLoading(false);
            setShowError(true);
            return;
        }

        setShowResetLoading(false);
        setIsPasswordReset(true);
    };

    const handleValidateToken = async ({ token }: HandleValidateProps) => {
        setShowValidateLoading(true);
        const response = await authApiService.validateResetPasswordToken(token);

        if(response?.status === 404) {
            setTimeout(() => {
                setShowValidateLoading(false);
                setShowInvalidTokenMessage(true);
            }, 1000);
            return;
        }

        if(!response.success) {
            setShowValidateLoading(false);
            setShowError(true)
            return;
        }

        setTimeout(() => {
            setShowValidateLoading(false);
            setIsTokenValidated(true);
        }, 1000);
    }

    return {
        showError,
        showInvalidTokenMessage,
        isPasswordReset,
        showResetLoading,
        showValidateLoading,
        isTokenValidated,
        token,
        handleResetPassword,
        handleValidateToken,
        setShowError
    }

}
