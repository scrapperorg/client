import React, {ReactNode} from 'react';
import styled from 'styled-components';

export interface SidebarTitleProps {
  title: string;
  icon?: ReactNode;
  isCollapsed?: boolean;
}

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 102px;
  justify-content: center;
`;

const TitleIcon = styled.i`
  color: #d1d5db;
  & svg {
    width: 32px;
    height: 32px;
  }
`;

const TitleText = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: #d1d5db;
  margin-left: 10px;
  text-transform: uppercase;
`;

export const SidebarTitle: React.FC<SidebarTitleProps> = ({ title, icon, isCollapsed }) => {
  return (
    <TitleWrapper>
      {icon && <TitleIcon className="material-icons">{icon}</TitleIcon>}
      {!isCollapsed && <TitleText>{title}</TitleText>}
    </TitleWrapper>
  );
};