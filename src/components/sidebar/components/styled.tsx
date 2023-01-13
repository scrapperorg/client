import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const SubMenuWrapper = styled.div`
  margin-bottom: 16px;
`;

export const SubMenuHeader = styled.div`
  text-transform: uppercase;
  color: #9ca3af;
  font-family: 'Inter', serif;
  font-size: 12px;
  font-weight: 700;
  margin-top: 16px;
  margin-bottom: 8px;
  padding: 0 16px;
`;

export const StyledSubMenuItem = styled.div<{ isActive?: boolean; isCollapsed?: boolean }>`
  display: flex;
  align-items: center;
  color: #d1d5db;
  font-family: 'Inter', serif;
  font-size: 14px;
  font-weight: 500;
  padding: 8px;
  border-radius: 6px;

  ${(props) =>
    props.isActive &&
    css`
      background: #242a38;
      color: #13dc99;
    `}

  ${(props) =>
    props.isCollapsed &&
    css`
      svg {
        padding: 0;
      }
    `}
`;

export const SubMenuItemInner = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
`;

export const SubMenuItemLink = styled(Link)`
  display: flex;
  align-items: center;
  color: inherit;
  text-decoration: none;
`;
