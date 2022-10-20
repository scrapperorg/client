import styled from 'styled-components';
import Container from '@mui/material/Container';

export const StyledLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Content = styled(Container)`
  && {
    width: 100%;
    padding-top: 30px;
    padding-bottom: 30px;
  }
`;
