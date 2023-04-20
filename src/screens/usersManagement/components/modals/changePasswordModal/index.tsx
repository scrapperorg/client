import React from 'react';
import { StandardModal } from '../standardModal'

interface ChangePasswordModalProps {
  isOpened: boolean;
  closeModal: () => void;
}

export const ChangePasswordModal = (props: ChangePasswordModalProps) => {
  const { isOpened, closeModal } = props;

  return (
    <StandardModal
      isOpened={isOpened}
      closeModal={closeModal}
    >
      Change Password modal
    </StandardModal>
  )
}
