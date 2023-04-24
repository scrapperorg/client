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
  return date.toDate() < new Date() || date.toDate() > futureDate;
}

export const AssignResponsibleModal = (props: AssignResponsibleModalProps) => {
  const { modalName, closeModal } = useContext(InteractiveComponentsContext);
  const { assignableResponsibles, responsible, deadline, documentStatus, documentDecision, form, handleSubmitDocumentAnalysis } = props;

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
            Asigneaza responsabil:
          </Typography>

          <FormControl fullWidth sx={{ mt: 4 }}>
            <InputLabel id="sursa-document-label">
              Utilizator
            </InputLabel>
            <Select
              labelId='responsabil'
              id='responsabil'
              value={form.watch('assignedUser') || (responsible?.id || '')}
              label='Responsabil'
              {...form.register('assignedUser')}
            >
              {assignableResponsibles.map((user: UserDto) => (
                <MenuItem key={user.id} value={user.id}>{`${user.surname} ${user.name}`}</MenuItem>
              ))}
            </Select>
            <FormHelperText error={!!form.formState.errors}>{form.formState.errors.assignedUser && <span>{form.formState.errors.assignedUser.message}</span>}</FormHelperText>
          </FormControl>

          <Typography variant="h3" sx={{ mt: 3 }}>
            Concluzia analizei legislative:
          </Typography>

          <FormControl fullWidth sx={{ mt: 4 }}>
            <InputLabel id="status-document-label">
              Concluzie
            </InputLabel>
            <Select
              labelId='concluzie'
              id='concluzie'
              value={form.watch('decision') || documentDecision}
              label='Concluzie'
              {...form.register('decision')}
            >
               {Object.values(Decision).map((decisionValue) => (
                <MenuItem key={decisionValue} value={decisionValue}>
                  {Translations[decisionValue]}
                </MenuItem>
                ))}
            </Select>
          </FormControl>

          <Typography variant="h3" sx={{ mt: 3 }}>
            Actualizeaza status:
          </Typography>

          <FormControl fullWidth sx={{ mt: 4 }}>
            <InputLabel id="status-document-label">
              Status
            </InputLabel>
            <Select
              labelId='status'
              id='status'
              value={form.watch('status') || documentStatus}
              label='Status'
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
            Actualizeaza termen:
          </Typography>

          <FormControl fullWidth sx={{ mt: 4 }}>
            <Controller
              name="deadline"
              control={form.control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    {...field}
                    label="Termen"
                    renderInput={(params) => <TextField {...params} fullWidth onKeyDown={onKeyDown} />}
                    value={field.value || deadline}
                    shouldDisableDate={isOutOfRange}
                    onChange={(newDate: Dayjs | null) => field.onChange(newDate?.toString())}
                    componentsProps={{
                      actionBar: {
                        actions: ['clear'],
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
              />
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
              Anuleaza
            </Button>
            </Grid>
            <Grid item>
            <Button
              variant='contained'
              type='submit'
            >
              Salveaza
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
