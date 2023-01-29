import React, { createContext, useState } from 'react';
import { SIDEBAR_BUTTONS_LIST } from 'constants/icons';

export interface InteractiveComponentsState {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  selectedIndex: string;
  selectIndex: (index: string) => void;
  isModalOpened: boolean;
  closeModal: () => void;
  openModal: () => void;
  // assignResponsibleModal
  isAssignResponsibleModalOpened: boolean,
  openAssignResponsibleModal: () => void,
  closeAssignResponsibleModal: () => void,
}

const InteractiveComponentsDefaultState: InteractiveComponentsState = {
  isCollapsed: false,
  toggleSidebar: () => null,
  selectedIndex: '',
  selectIndex: () => null,
  isModalOpened: false,
  closeModal: () => null,
  openModal: () => null,
  // assignResponsibleModal
  isAssignResponsibleModalOpened: false,
  openAssignResponsibleModal: () => { console.log('method not implemented') },
  closeAssignResponsibleModal: () => { console.log('method not implemented') }
};

export const InteractiveComponentsContext = createContext(InteractiveComponentsDefaultState);

export interface InteractiveComponentsProviderProps {
  children: JSX.Element;
}
export interface UseModalHook {
  isModalOpened: boolean;
  closeModal: () => void;
  openModal: () => void;
  toggleModal: () => void;
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
  const [isModalOpened, setIsModalOpened] = useState(false);
  const closeModal = () => setIsModalOpened(false);
  const openModal = () => setIsModalOpened(true);
  const toggleModal = () => setIsModalOpened(!isModalOpened);

  return { isModalOpened, closeModal, openModal, toggleModal };
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
  const { isModalOpened, closeModal, openModal } = useModal();
  const {
    isModalOpened: isAssignResponsibleModalOpened,
    openModal: openAssignResponsibleModal,
    closeModal: closeAssignResponsibleModal
  } = useModal();

  const state: InteractiveComponentsState = {
    isCollapsed,
    toggleSidebar,
    selectedIndex,
    selectIndex,
    isModalOpened,
    closeModal,
    openModal,

    // assignResponsibleModal
    isAssignResponsibleModalOpened,
    openAssignResponsibleModal,
    closeAssignResponsibleModal,
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
