import styled, { css } from 'styled-components';

export const SideMenuWrapper = styled.div<{ isCollapsed: boolean }>`
  height: inherit;
  max-width: 280px;
  min-width: 280px;
  padding: 96px 16px 24px;
  background-color: #111827;
  overflow-y: scroll;

  ${(props) =>
    props.isCollapsed &&
    css`
      color: #13dc99;
      min-width: 100px;
    `}
`;
