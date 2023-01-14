import { SvgIconComponent } from '@mui/icons-material';
import React from 'react';
import { StyledSubMenuItem, SubMenuItemInner, SubMenuItemLink } from './styled';

export interface SubMenuItemProps {
  href: string;
  icon: SvgIconComponent;
  text: string;
  currentPath?: string;
  isCollapsed?: boolean;
}

export const SubMenuItem: React.FC<SubMenuItemProps> = ({
  href,
  icon: Icon,
  text,
  currentPath,
  isCollapsed,
}) => {
  const iconFontSize = isCollapsed ? 'large' : 'medium';

  return (
    <StyledSubMenuItem key={href} isActive={currentPath?.includes(href)} isCollapsed={isCollapsed}>
      <SubMenuItemInner>
        <SubMenuItemLink to={href}>
          <Icon fontSize={iconFontSize} sx={{ pr: 2 }} />
          {!isCollapsed && <span>{text}</span>}
        </SubMenuItemLink>
      </SubMenuItemInner>
    </StyledSubMenuItem>
  );
};
