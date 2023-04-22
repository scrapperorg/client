import React from 'react';
import { StandardModal } from '../standardModal'
import { useAddUserForm } from 'screens/usersManagement/hooks/useAddUserForm';
import { AddUserForm } from '../../forms/addUserForm';

interface AddUserModalProps {
  isOpened: boolean;
  closeModal: () => void;
}

export const AddUserModal = (props: AddUserModalProps) => {
  const { isOpened, closeModal } = props;

  const { form, handleSubmit, successMessage, setSuccessMessage } = useAddUserForm();

  const onCloseModal = () => {
    closeModal();
    form.reset();
    setSuccessMessage(undefined);
  }

  return (
    <StandardModal
      isOpened={isOpened}
      closeModal={onCloseModal}
    >
      <AddUserForm
        form={form}
        handleSubmit={handleSubmit}
        successMessage={successMessage}
      />
    </StandardModal>
  )
}
