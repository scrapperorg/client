import React from 'react';
import styled from 'styled-components';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const StyledLoading = styled(Box)`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export function NotAllowedRole() {
  const { t } = useTranslation();

  return (
    <StyledLoading>
      <Typography>{t('notAllowed')}</Typography>
    </StyledLoading>
  );
}
