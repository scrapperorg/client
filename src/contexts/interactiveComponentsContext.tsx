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

export const InteractiveComponentsProvider = ({ children }: any) => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(SIDEBAR_BUTTONS_LIST[0].key);
  // const [isProfileModalOpened, setIsProfileModalOpened] = useState(false);
  const { isModalOpened, closeModal, openModal } = useModal();

  const toggleSidebar = () => {
    setIsSidebarOpened(!isSidebarOpened);
  };

  const selectIndex = (index: string) => {
    setSelectedIndex(index);
  };

  // const closeProfileModal = () => {
  //   setIsProfileModalOpened(false);
  // };

  // const openProfileModal = () => {
  //   setIsProfileModalOpened(true);
  // };

  return (
    <InteractiveComponentsContext.Provider
      value={{
        isSidebarOpened,
        toggleSidebar,
        selectedIndex,
        selectIndex,
        // isProfileModalOpened,
        // closeProfileModal,
        // openProfileModal,
        isModalOpened,
        closeModal,
        openModal,
      }}
    >
      {children}
    </InteractiveComponentsContext.Provider>
  );
};
