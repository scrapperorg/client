import React from 'react';
import { StandardModal } from '../standardModal'

interface AddUserModalProps {
  isOpened: boolean;
  closeModal: () => void;
}

export const AddUserModal = (props: AddUserModalProps) => {
  const { isOpened, closeModal } = props;

  return (
    <StandardModal
      isOpened={isOpened}
      closeModal={closeModal}
    >
      Add user modal
    </StandardModal>
  )
}
