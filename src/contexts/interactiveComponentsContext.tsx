import React, { createContext, useState } from 'react';
import { SIDEBAR_BUTTONS_LIST } from 'constants/icons';

export interface InteractiveComponentsState {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  selectedIndex: string;
  selectIndex: (index: string) => void;
  closeModal: () => void;
  openModal: (modalName: string) => void;
  modalName: string;
}

const InteractiveComponentsDefaultState: InteractiveComponentsState = {
  isCollapsed: false,
  toggleSidebar: () => null,
  selectedIndex: '',
  selectIndex: () => null,
  closeModal: () => null,
  openModal: () => null,
  modalName: '',
};

export const InteractiveComponentsContext = createContext(InteractiveComponentsDefaultState);

export interface InteractiveComponentsProviderProps {
  children: JSX.Element;
}
export interface UseModalHook {
  closeModal: () => void;
  openModal: (name: string) => void;
  modalName: string;
}

export interface UseSidebarHook {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export interface UseIndexHook {
  selectedIndex: string;
  selectIndex: (index: string) => void;
}

const useModal: () => UseModalHook = () => {
  const [modalName, setModalName] = useState('');
  const closeModal = () => {
    setModalName('');
  };
  const openModal = (name: string) => {
    setModalName(name);
  };
  return { closeModal, openModal, modalName };
};

const useSidebar: () => UseSidebarHook = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return { isCollapsed, toggleSidebar };
};

const useIndex: () => UseIndexHook = () => {
  const [selectedIndex, setSelectedIndex] = useState(SIDEBAR_BUTTONS_LIST[0].key);
  const selectIndex = (index: string) => {
    setSelectedIndex(index);
  };

  return { selectedIndex, selectIndex };
};

export const InteractiveComponentsProvider: React.FC<InteractiveComponentsProviderProps> = ({
  children,
}) => {
  const { selectedIndex, selectIndex } = useIndex();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const { closeModal, openModal, modalName } = useModal();

  const state: InteractiveComponentsState = {
    isCollapsed,
    toggleSidebar,
    selectedIndex,
    selectIndex,
    closeModal,
    openModal,
    modalName,
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
