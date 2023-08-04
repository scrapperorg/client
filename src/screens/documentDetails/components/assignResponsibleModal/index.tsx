import React, { useContext } from 'react';
import { InteractiveComponentsContext } from 'contexts/interactiveComponentsContext';
import { Modal } from 'components/modal';
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { UserDto } from 'services/api/dtos';
import { Dayjs } from 'dayjs';
import { ModalNames } from 'constants/modals';
import FormHelperText from '@mui/material/FormHelperText';
import { Decision, Status } from 'services/api/dtos/document';
import { Translations } from 'constants/translations';
import { UseFormReturn, Controller } from 'react-hook-form';
import { AssignResponsibleModalFormValues } from 'screens/documentDetails/hooks/useDocumentDetails';
import { useTranslation } from 'react-i18next';

interface AssignResponsibleModalProps {
  assignableResponsibles: UserDto[];
  responsible: UserDto | undefined;
  deadline: Date | undefined;
  documentStatus: string | undefined;
  documentDecision: string | undefined;
  assignResponsible: (userId: string) => void;
  setDeadline: (date: string | undefined) => void;
  setStatus: (status: string) => void;
  setDecision: (status: string) => void;
  form: UseFormReturn<AssignResponsibleModalFormValues, any>;
  handleSubmitDocumentAnalysis: (props: AssignResponsibleModalFormValues) => Promise<void>;
}

const isOutOfRange = (date: Dayjs) => {
  const futureDate = new Date();
  futureDate.setFullYear(futureDate.getFullYear() + 1);
  return date.toDate().getTime() < new Date().setHours(0, 0, 0, 0) || date.toDate() > futureDate;
}

export const AssignResponsibleModal = (props: AssignResponsibleModalProps) => {
  const { modalName, closeModal } = useContext(InteractiveComponentsContext);
  const { assignableResponsibles,
    responsible,
    deadline,
    documentStatus,
    documentDecision,
    form,
    handleSubmitDocumentAnalysis
  } = props;
  const { t } = useTranslation();

  const onKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault();
  };

  return (
    <Modal
      isModalOpened={modalName === ModalNames.ASSIGN_RESP}
      closeModal={() => {
        closeModal();
        form.reset();
      }}
    >
      <StyledModalCloseButton
        aria-label="close"
        onClick={() => {
          closeModal();
          form.reset();
        }}
      >
        <CloseIcon />
      </StyledModalCloseButton>
      <StyledModalContainer>
        <form onSubmit={form.handleSubmit((data) => {
          handleSubmitDocumentAnalysis(data);
          closeModal();
        })}>

          <Typography variant="h3" sx={{ mt: 3 }}>
            {t('updateAnalysis.assignResponsible')}
          </Typography>

          <FormControl fullWidth sx={{ mt: 4 }}>
            <InputLabel id="sursa-document-label">
              {t('updateAnalysis.user')}
            </InputLabel>
            <Select
              labelId='responsabil'
              id='responsabil'
              value={form.watch('assignedUser') || (responsible?.id || '')}
              label={t('updateAnalysis.user')}
              {...form.register('assignedUser')}
            >
              {assignableResponsibles.map((user: UserDto) => (
                <MenuItem key={user.id} value={user.id}>{`${user.surname} ${user.name}`}</MenuItem>
              ))}
            </Select>
            <FormHelperText error={!!form.formState.errors}>
              {form.formState.errors.assignedUser && <span>{form.formState.errors.assignedUser.message}</span>}
            </FormHelperText>
          </FormControl>

          <Typography variant="h3" sx={{ mt: 3 }}>
            {t('updateAnalysis.updateStatus')}
          </Typography>

          <FormControl fullWidth sx={{ mt: 4 }}>
            <InputLabel id="status-document-label">
              {t('updateAnalysis.status')}
            </InputLabel>
            <Select
              labelId='status'
              id='status'
              value={form.watch('status') || documentStatus}
              label={t('updateAnalysis.status')}
              {...form.register('status')}
            >
               {Object.values(Status).map((statusValue) => (
                <MenuItem key={statusValue} value={statusValue}>
                  {Translations[statusValue]}
                </MenuItem>
                ))}
            </Select>
          </FormControl>

          <Typography variant='h3' sx={{ mt: 8 }}>
            {t('updateAnalysis.updateDeadline')}
          </Typography>

          <FormControl fullWidth sx={{ mt: 4 }}>
            <Controller
              name="deadline"
              control={form.control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    {...field}
                    label={t('updateAnalysis.deadline')}
                    renderInput={
                      (params) => (
                        <TextField
                          {...params}
                          fullWidth
                          onKeyDown={onKeyDown}
                          error={Boolean(form.formState.errors.deadline)}
                          helperText={form.formState.errors.deadline?.message}
                        />
                      )
                    }
                    value={field.value ?? deadline ?? null}
                    shouldDisableDate={isOutOfRange}
                    onChange={(newDate: Dayjs | null) => field.onChange(newDate?.toString())}
                    componentsProps={{
                      actionBar: {
                        actions: ['cancel', 'accept'],
                      },
                    }}
                    closeOnSelect={false}
                  />
                </LocalizationProvider>
              )}
              />
            <FormHelperText error={!!form.formState.errors}>
              {form.formState.errors.deadline && <span>{form.formState.errors.deadline.message}</span>}
            </FormHelperText>
          </FormControl>

          <Typography variant="h3" sx={{ mt: 3 }}>
            {t('updateAnalysis.updateDecision')}
          </Typography>

          <FormControl fullWidth sx={{ mt: 4, mb: 7 }}>
            <InputLabel id="status-document-label">
              {t('updateAnalysis.decision')}
            </InputLabel>
            <Select
              labelId='concluzie'
              id='concluzie'
              value={form.watch('decision') || documentDecision}
              label={t('updateAnalysis.decision')}
              {...form.register('decision')}
            >
               {Object.values(Decision).map((decisionValue) => (
                <MenuItem key={decisionValue} value={decisionValue}>
                  {Translations[decisionValue]}
                </MenuItem>
                ))}
            </Select>
          </FormControl>

          <Grid container justifyContent='center' spacing={10}>
            <Grid item>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => {
                closeModal();
                form.reset();
              }}
            >
              {t('generic.cancel')}
            </Button>
            </Grid>
            <Grid item>
            <Button
              variant='contained'
              type='submit'
            >
              {t('generic.save')}
            </Button>
            </Grid>
          </Grid>
        </form>
      </StyledModalContainer>
    </Modal>
  );
};

const StyledModalContainer = styled(Box)`
  width: 400px;
  padding: 24px 8px 8px;
`;

const StyledModalCloseButton = styled(IconButton)`
  position: absolute;
  right: 8px;
  top: 8px;
`;
