import styled from 'styled-components';

export const StyledLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  && {
    width: calc(100% - 20px);
    padding-top: 30px;
    padding-bottom: 30px;
  }
`;
