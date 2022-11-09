import styled from 'styled-components';
import ListItem from '@mui/material/ListItem';

export const StyledListItem = styled(ListItem)`
  padding: 20px 5px 20px 5px;
  font-size: 10px;
  cursor: pointer;
  &:hover {
    background-color: #add8e6;
  }
`;

export const StyledListItemHeader = styled(ListItem)`
  padding: 20px 5px 20px 5px;
  font-size: 16px;
  color: white;
  display: flex;
  flex-direction: column;
  background-color: #1cb7ff;
  &.MuiListItem-root {
    width: 180px;
    margin-left: -10px;
    border-radius: 12px;
  }
`;
