import React, { createContext, useState } from 'react';
import { SIDEBAR_BUTTONS_LIST } from 'constants/icons';

export interface InteractiveComponentsState {
  isSidebarOpened: boolean;
  toggleSidebar: () => void;
  selectedIndex: string;
  selectIndex: (index: string) => void;
}

const InteractiveComponentsDefaultState: InteractiveComponentsState = {
  isSidebarOpened: true,
  toggleSidebar: () => null,
  selectedIndex: '',
  selectIndex: () => null,
};

export const InteractiveComponentsContext = createContext(InteractiveComponentsDefaultState);

export const InteractiveComponentsProvider = ({ children }: any) => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(SIDEBAR_BUTTONS_LIST[0].key);

  function selectIndex(index: string) {
    setSelectedIndex(index);
  }

  function toggleSidebar() {
    setIsSidebarOpened(!isSidebarOpened);
  }

  return (
    <InteractiveComponentsContext.Provider
      value={{ isSidebarOpened, toggleSidebar, selectedIndex, selectIndex }}
    >
      {children}
    </InteractiveComponentsContext.Provider>
  );
};
