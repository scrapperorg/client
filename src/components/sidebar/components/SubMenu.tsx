import React, { Fragment } from 'react';
import { SubMenuHeader, SubMenuWrapper } from './styled';
import { SubMenuItemProps, SubMenuItem } from './SubMenuItem';

export interface SubMenuProps {
  header: string;
  items: SubMenuItemProps[];
  currentPath?: string;
  isCollapsed?: boolean;
}

export const SubMenu: React.FC<SubMenuProps> = ({ header, currentPath, items, isCollapsed }) => {
  return (
    <SubMenuWrapper>
      <Fragment>
        {!isCollapsed && <SubMenuHeader>{header}</SubMenuHeader>}
        {items.map((subMenuItem: SubMenuItemProps) => (
          <SubMenuItem
            key={subMenuItem.href}
            href={subMenuItem.href}
            currentPath={currentPath}
            icon={subMenuItem.icon}
            text={subMenuItem.text}
            isCollapsed={isCollapsed}
          />
        ))}
      </Fragment>
    </SubMenuWrapper>
  );
};
