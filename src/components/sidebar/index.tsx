import React from 'react';
import { SideMenuWrapper } from './styled';
import { SubMenu, SubMenuProps } from './components/SubMenu';

export interface SideMenuProps {
  items: SubMenuProps[];
  currentPath: string;
  isCollapsed: boolean;
}

export const SideMenu: React.FC<SideMenuProps> = ({ items, currentPath, isCollapsed }) => {
  return (
    <SideMenuWrapper isCollapsed={isCollapsed}>
      {items.map((subMenu: SubMenuProps) => (
        <SubMenu
          key={subMenu.header}
          header={subMenu.header}
          items={subMenu.items}
          currentPath={currentPath}
          isCollapsed={isCollapsed}
        />
      ))}
    </SideMenuWrapper>
  );
};
