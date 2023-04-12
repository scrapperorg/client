import React, { useContext, useState } from 'react';
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
  SelectChangeEvent,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ClearIcon from '@mui/icons-material/Clear';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { UserDto } from 'services/api/dtos';
import { Dayjs } from 'dayjs';
import { ModalNames } from 'constants/modals';
import FormHelperText from '@mui/material/FormHelperText';
import { Status } from 'services/api/dtos/document';

interface AssignResponsibleModalProps {
  assignableResponsibles: UserDto[];
  responsible: UserDto | undefined;
  deadline: Date | undefined;
  documentStatus: string | undefined;
  assignResponsible: (userId: string) => void;
  setDeadline: (date: string | undefined) => void;
  setStatus: (status: string) => void;
}

const isOutOfRange = (date: Dayjs) => {
  const futureDate = new Date();
  futureDate.setFullYear(futureDate.getFullYear() + 1);
  return date.toDate() < new Date() || date.toDate() > futureDate;
}

export const AssignResponsibleModal = (props: AssignResponsibleModalProps) => {
  const { modalName, closeModal } = useContext(InteractiveComponentsContext);
  const { assignableResponsibles, responsible, deadline, documentStatus, assignResponsible, setDeadline, setStatus } = props;
  const [responsibleId, setResponsibleId] = useState(responsible?.id ?? '');
  const [duedate, setDuedate] = useState<string | undefined>(deadline?.toString() ?? undefined);
  const [docStatus, setDocStatus] = useState(documentStatus ?? '');
  const [errorMessage, setErrorMessage] = useState('');

  const onReponsibleChange = (event: SelectChangeEvent) => {
    setResponsibleId(event.target.value as string);
  };

  const onDeadlineChange = (newDate: Dayjs | null) => {
    setDuedate(newDate?.toString());
  };

  const onStatusChange = (event: SelectChangeEvent) => {
    setDocStatus(event.target.value as string);
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault();
  };

  const saveChanges = () => {
    if (!responsibleId) {
      setErrorMessage('Selecteaza un responsabil');
      return;
    } else {
      setErrorMessage('');
      closeModal();
      assignResponsible(responsibleId as string);
      setDeadline(duedate);
      setStatus(docStatus);
    }
  }

  return (
    <Modal
      isModalOpened={modalName === ModalNames.ASSIGN_RESP}
      closeModal={() => {
        closeModal();
        setErrorMessage('');
      }}
    >
      <StyledModalCloseButton
        aria-label="close"
        onClick={() => {
          closeModal();
          setErrorMessage('');
        }}
      >
        <CloseIcon />
      </StyledModalCloseButton>
      <StyledModalContainer>
        <form>

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
              value={responsibleId}
              label='Responsabil'
              onChange={onReponsibleChange}
            //   endAdornment={
            //     (responsibleId && !responsible?.id) && <IconButton
            //       onClick={() => {
            //         setResponsibleId('');
            //       }}
            //       size="small"
            //       sx={{marginRight: 5}}
            //     >
            //       <ClearIcon />
            //     </IconButton>
            // }
            >
              {assignableResponsibles.map((user: UserDto) => (
                <MenuItem key={user.id} value={user.id}>{`${user.surname} ${user.name}`}</MenuItem>
              ))}
            </Select>
            <FormHelperText error={!!errorMessage}>{errorMessage}</FormHelperText>
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
              value={docStatus}
              label='Status'
              onChange={onStatusChange}
            //   endAdornment={
            //     (docStatus) && <IconButton
            //       onClick={() => {
            //         setDocStatus('');
            //       }}
            //       size="small"
            //       sx={{marginRight: 5}}
            //     >
            //       <ClearIcon />
            //     </IconButton>
            // }
            >
               {Object.values(Status).map((statusValue) => (
                <MenuItem key={statusValue} value={statusValue}>
                  {statusValue}
                </MenuItem>
                ))}
            </Select>
            {/* <FormHelperText error={!!errorMessage}>{errorMessage}</FormHelperText> */}
          </FormControl>

          <Typography variant='h3' sx={{ mt: 8 }}>
            Actualizeaza termen:
          </Typography>

          <FormControl fullWidth sx={{ mt: 4 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Termen:'
                shouldDisableDate={isOutOfRange}
                value={duedate ?? null}
                onChange={onDeadlineChange}
                renderInput={(params) => <TextField onKeyDown={onKeyDown} {...params} fullWidth />}
                componentsProps={{
                  actionBar: {
                    actions: ['clear'],
                  },
                }}
              />
            </LocalizationProvider>
          </FormControl>
        </form>
      </StyledModalContainer>
      <Grid container justifyContent='center' spacing={10}>
        <Grid item>
        <Button
          variant='contained'
          onClick={() => {
            saveChanges();
          }}
        >
          Salveaza
        </Button>
        </Grid>
        <Grid item>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => {
            closeModal();
            setErrorMessage('');
          }}
        >
          Anulare
        </Button>
        </Grid>
      </Grid>
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
