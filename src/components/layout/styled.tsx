import styled from 'styled-components';

export const StyledLayout = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
`;
export const MainWrapper = styled.main`
  height: calc(100vh - 40px);
  padding: 24px 24px 0 24px;
  overflow-y: scroll;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  height: inherit;
  overflow: hidden;
`;
