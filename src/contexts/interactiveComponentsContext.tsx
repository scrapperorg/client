import React, { createContext, useState } from 'react';

export interface InteractiveComponentsState {
  isSidebarOpened: boolean;
  toggleSidebar: () => void;
}

const InteractiveComponentsDefaultState: InteractiveComponentsState = {
  isSidebarOpened: true,
  toggleSidebar: () => null,
};

export const InteractiveComponentsContext = createContext(InteractiveComponentsDefaultState);

export const InteractiveComponentsProvider = ({ children }: any) => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);

  function toggleSidebar() {
    setIsSidebarOpened(!isSidebarOpened);
  }

  return (
    <InteractiveComponentsContext.Provider value={{ isSidebarOpened, toggleSidebar }}>
      {children}
    </InteractiveComponentsContext.Provider>
  );
};
