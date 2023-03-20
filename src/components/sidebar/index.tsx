import React from 'react';
import { SideMenuWrapper } from './styled';
import { SubMenu, SubMenuProps } from './components/SubMenu';
import { SidebarTitle, SidebarTitleProps } from './components/SidebarTitle';

export interface SideMenuProps {
  title: SidebarTitleProps;
  items: SubMenuProps[];
  currentPath: string;
  isCollapsed: boolean;
}

export const SideMenu: React.FC<SideMenuProps> = ({ title, items, currentPath, isCollapsed }) => {
  return (
    <SideMenuWrapper isCollapsed={isCollapsed}>
      <SidebarTitle {...title} isCollapsed={isCollapsed} />
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