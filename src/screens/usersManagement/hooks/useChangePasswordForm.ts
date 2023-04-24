import { joiResolver } from "@hookform/resolvers/joi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { changePasswordSchema } from "../formSchemas/changePasswordSchema";
import { userApiService } from "services/api/UserApiService";

export interface ChangePasswordFormValues {
  password: string;
  confirmPassword: string;
}

export function useChangePasswordForm(userId: string | null) {
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>();

  const form = useForm<ChangePasswordFormValues>({
    mode: 'onSubmit',
    resolver: joiResolver(changePasswordSchema),
  });

  const handleSuccess = () => {
    setSuccessMessage('Parola a fost salvata cu succes!');
    form.reset();
  }

  const handleSubmit = async (values: ChangePasswordFormValues) => {
    setIsLoading(true);

    const response = await userApiService.updatePassword(userId, values);

    if (!response.success || !response.payload) {
      setShowError(true);
    } else {
      handleSuccess();
    }

    setIsLoading(false);
  }

  return {
    isLoading,
    showError,
    successMessage,
    form,
    handleSubmit,
    setSuccessMessage,
  }
}