import React, { createContext, useState } from 'react';
import { SIDEBAR_BUTTONS_LIST } from 'constants/icons';

export interface InteractiveComponentsState {
  isSidebarOpened: boolean;
  toggleSidebar: () => void;
  selectedIndex: string;
  selectIndex: (index: string) => void;
  isModalOpened: boolean;
  closeModal: () => void;
  openModal: () => void;
}

const InteractiveComponentsDefaultState: InteractiveComponentsState = {
  isSidebarOpened: true,
  toggleSidebar: () => null,
  selectedIndex: '',
  selectIndex: () => null,
  isModalOpened: false,
  closeModal: () => null,
  openModal: () => null,
};

export const InteractiveComponentsContext = createContext(InteractiveComponentsDefaultState);

export interface InteractiveComponentsProviderProps {
  children: JSX.Element;
}
export interface UseModalHook {
  isModalOpened: boolean;
  closeModal: () => void;
  openModal: () => void;
}

const useModal: () => UseModalHook = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const closeModal = () => setIsModalOpened(false);
  const openModal = () => setIsModalOpened(true);

  return { isModalOpened, closeModal, openModal };
};

export const InteractiveComponentsProvider: React.FC<InteractiveComponentsProviderProps> = ({
  children,
}) => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(SIDEBAR_BUTTONS_LIST[0].key);
  const { isModalOpened, closeModal, openModal } = useModal();

  const toggleSidebar = () => {
    setIsSidebarOpened(!isSidebarOpened);
  };

  const selectIndex = (index: string) => {
    setSelectedIndex(index);
  };

  const state: InteractiveComponentsState = {
    isSidebarOpened,
    toggleSidebar,
    selectedIndex,
    selectIndex,
    isModalOpened,
    closeModal,
    openModal,
  };

  return (
    <InteractiveComponentsContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </InteractiveComponentsContext.Provider>
  );
};
