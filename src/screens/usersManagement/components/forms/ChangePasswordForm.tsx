import React from 'react';
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { UseFormReturn } from "react-hook-form";
import { ChangePasswordFormValues } from "screens/usersManagement/hooks/useChangePasswordForm";
import styled from "styled-components";
import { useTranslation } from 'react-i18next'

interface ChangePasswordFormProps {
  form: UseFormReturn<ChangePasswordFormValues, any>,
  handleSubmit: (props: ChangePasswordFormValues) => Promise<void>,
  successMessage: string | undefined,
}

export const ChangePasswordForm = (props: ChangePasswordFormProps) => {
  const { form, handleSubmit, successMessage } = props;
  const { t } = useTranslation();

  const SuccessMessage = () => (
    <ColoredSuccessMessage variant="h4" sx={{ mb: 8 }}>
      {successMessage}
    </ColoredSuccessMessage>
  )

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <Typography variant="h2" sx={{ mb: 8 }}>
          {t('usersManagement.changePassword')}
      </Typography>

      {successMessage && <SuccessMessage />}

      <Box>
        <Grid container>
          <Grid item md={6}>
            <TextField
              fullWidth
              label={t('usersManagement.password')}
              type='password'
              variant='outlined'
              error={Boolean(form.formState.errors.password)}
              helperText={form.formState.errors.password?.message}
              {...form.register('password')}
            />
          </Grid>
          <Grid item md={6} sx={{ pl: 4 }}>
            <TextField
              fullWidth
              label={t('usersManagement.confirmPassword')}
              type='password'
              variant='outlined'
              error={Boolean(form.formState.errors.confirmPassword)}
              helperText={form.formState.errors.confirmPassword?.message}
              {...form.register('confirmPassword')}
            />
          </Grid>
        </Grid>
      </Box>

      <ButtonBox>
        <Button type='submit' variant='contained'>{t('usersManagement.changePasswordConfirmation')}</Button>
      </ButtonBox>

    </form>

  )
}

const ButtonBox = styled(Box)`
  display: flex;
  justify-content: end;
  padding: 15px 0;
`;

const ColoredSuccessMessage = styled(Typography)`
  color: green;
`;