import { SvgIconComponent } from '@mui/icons-material';
import React from 'react';
import { StyledSubMenuItem, SubMenuItemInner, SubMenuItemLink } from './styled';
import { ProtectedByRole } from 'components/protectedByRole';
import { Role } from 'constants/roles';

export interface SubMenuItemProps {
  href: string;
  icon: SvgIconComponent;
  text: string;
  currentPath?: string;
  isCollapsed?: boolean;
  atLeastRole?: Role;
  exactRole?: Role;
}

export const SubMenuItem: React.FC<SubMenuItemProps> = ({
  href,
  icon: Icon,
  text,
  currentPath,
  isCollapsed,
  atLeastRole,
  exactRole
}) => {
  const iconFontSize = isCollapsed ? 'large' : 'medium';

  return (
    <ProtectedByRole atLeastRole={atLeastRole} exactRole={exactRole}>
      <StyledSubMenuItem key={href} isActive={currentPath?.includes(href)} isCollapsed={isCollapsed}>
        <SubMenuItemInner>
          <SubMenuItemLink to={href}>
            <Icon fontSize={iconFontSize} sx={{ pr: 2 }} />
            {!isCollapsed && <span>{text}</span>}
          </SubMenuItemLink>
        </SubMenuItemInner>
      </StyledSubMenuItem>
    </ProtectedByRole>
  );
};
