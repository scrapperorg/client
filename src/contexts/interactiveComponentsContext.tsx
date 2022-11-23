import React, { createContext, useState } from 'react';
import { SIDEBAR_BUTTONS_LIST } from 'constants/icons';

export interface InteractiveComponentsState {
  isSidebarOpened: boolean;
  toggleSidebar: () => void;
  selectedIndex: string;
  selectIndex: (index: string) => void;
  isProfileModalOpened: boolean;
  closeProfileModal: () => void;
  openProfileModal: () => void;
}

const InteractiveComponentsDefaultState: InteractiveComponentsState = {
  isSidebarOpened: true,
  toggleSidebar: () => null,
  selectedIndex: '',
  selectIndex: () => null,
  isProfileModalOpened: false,
  closeProfileModal: () => null,
  openProfileModal: () => null,
};

export const InteractiveComponentsContext = createContext(InteractiveComponentsDefaultState);

export const InteractiveComponentsProvider = ({ children }: any) => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(SIDEBAR_BUTTONS_LIST[0].key);
  const [isProfileModalOpened, setIsProfileModalOpened] = useState(false);

  function toggleSidebar() {
    setIsSidebarOpened(!isSidebarOpened);
  }

  function selectIndex(index: string) {
    setSelectedIndex(index);
  }

  function closeProfileModal() {
    setIsProfileModalOpened(false);
  }

  function openProfileModal() {
    setIsProfileModalOpened(true);
  }

  return (
    <InteractiveComponentsContext.Provider
      value={{
        isSidebarOpened,
        toggleSidebar,
        selectedIndex,
        selectIndex,
        isProfileModalOpened,
        closeProfileModal,
        openProfileModal,
      }}
    >
      {children}
    </InteractiveComponentsContext.Provider>
  );
};
