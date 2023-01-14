import styled from 'styled-components';
import Container from '@mui/material/Container';

export const StyledContainer = styled(Container)`
  width: 100%;
  &.MuiContainer-root {
    justify-content: space-between;
    flex-direction: row;
    display: flex;
    max-width: inherit;
  }
`;

export const RightSide = styled.div`
  display: flex;
`;

export const LeftSide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TopBarWrapper = styled.div`
  height: 48px;
  box-shadow: 0 1px 1px rgba(100, 116, 139, 0.06), 0 1px 2px rgba(100, 116, 139, 0.1);
`;
