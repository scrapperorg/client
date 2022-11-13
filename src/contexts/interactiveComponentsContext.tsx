import React, { createContext, useState } from 'react';

export interface SidebarState {
  isSidebarOpened?: boolean;
  toggleSidebar?: () => void;
}

const sidebarDefaultState: SidebarState = {
  isSidebarOpened: true,
  toggleSidebar: () => null,
};

export const SidebarContext = createContext(sidebarDefaultState);

export const SidebarProvider = ({ children }: any) => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);

  function toggleSidebar() {
    setIsSidebarOpened(!isSidebarOpened);
  }

  return (
    <SidebarContext.Provider value={{ isSidebarOpened, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
