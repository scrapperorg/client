import React from 'react';
import { StandardModal } from '../standardModal'
import { ChangePasswordForm } from '../../forms/ChangePasswordForm';
import { useChangePasswordForm } from 'screens/usersManagement/hooks/useChangePasswordForm';

interface ChangePasswordModalProps {
  isOpened: boolean;
  currentUserId: string | null;
  closeModal: () => void;
  setCurrentUserId: (userId: string | null) => void;
}

export const ChangePasswordModal = (props: ChangePasswordModalProps) => {
  const { isOpened, closeModal, currentUserId, setCurrentUserId } = props;

  const {
    form,
    successMessage,
    handleSubmit,
    setSuccessMessage
  } = useChangePasswordForm(currentUserId);

  const onCloseModal = () => {
    closeModal();
    form.reset();
    setSuccessMessage(undefined);
    setCurrentUserId(null);
  }

  return (
    <StandardModal
      isOpened={isOpened}
      closeModal={onCloseModal}
    >
      <ChangePasswordForm
        form={form}
        handleSubmit={handleSubmit}
        successMessage={successMessage}
      />
    </StandardModal>
  )
}
