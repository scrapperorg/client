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
