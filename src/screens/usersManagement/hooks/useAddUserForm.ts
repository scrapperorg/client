import { joiResolver } from '@hookform/resolvers/joi';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserDto } from 'services/api/dtos';
import { addUserSchema } from '../formSchemas/addUserSchema';
import { userApiService } from 'services/api/UserApiService';
import { UsersManagementContext } from '../context';

export interface AddUserFormValues {
  name: string;
  surname: string;
  role: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function useAddUserForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>();

  const { fetch: fetchAllUsers } = useContext(UsersManagementContext);

  const form = useForm<AddUserFormValues>({
    mode: 'onSubmit',
    resolver: joiResolver(addUserSchema),
  });

  const handleSuccess = (payload: UserDto) => {
    setSuccessMessage(`Utilizatorul ${payload.name} ${payload.surname} a fost adaugat cu succes!`);
    form.reset();
    fetchAllUsers();
  }

  const handleSubmit = async (values: AddUserFormValues) => {
    setIsLoading(true);

    const response = await userApiService.addUser(values);

    if (!response.success || !response.payload) {
      setShowError(true);
    } else {
      handleSuccess(response.payload);
    }

    setIsLoading(false);
  };

  return {
    isLoading,
    showError,
    successMessage,
    form,
    setSuccessMessage,
    handleSubmit,
  }
}
