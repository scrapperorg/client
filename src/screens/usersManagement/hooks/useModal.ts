import { useContext } from 'react';
import { InteractiveComponentsContext } from 'contexts/interactiveComponentsContext';

export function useModal(currentModal: string) {
  const {
    openModal: openGenericModal,
    closeModal,
    modalName,
  } = useContext(InteractiveComponentsContext);

  const isModalOpen = modalName === currentModal;

  const openModal = () => {
    console.log('currentModal', currentModal);
    openGenericModal(currentModal);
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
}
