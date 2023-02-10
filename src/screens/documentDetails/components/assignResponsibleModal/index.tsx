import React, { useContext } from "react"
import { InteractiveComponentsContext } from "contexts/interactiveComponentsContext"
import { Modal } from "components/modal";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { UserDto } from "services/api/dtos";
import { Dayjs } from "dayjs";
import { ModalNames } from 'constants/modals';

interface AssignResponsibleModalProps {
  assignableResponsibles: UserDto[];
  responsible: UserDto | undefined;
  deadline: Date | undefined;
  assignResponsible: (userId: string) => void;
  setDeadline: (date: string | undefined) => void;
}

const isInThePast = (date: Dayjs) => date.toDate() < new Date();

export const AssignResponsibleModal = (props: AssignResponsibleModalProps) => {
  const { modalName, closeModal } = useContext(InteractiveComponentsContext);

  const {
    assignableResponsibles,
    responsible,
    deadline,
    assignResponsible,
    setDeadline
  } = props;

  const onReponsibleChange = (event: SelectChangeEvent) => {
    assignResponsible(event.target.value as string)
  }

  const onDeadlineChange = (newDate: Dayjs | null) => {
    setDeadline(newDate?.toString())
  }

  return (
    <Modal
      isModalOpened={modalName === ModalNames.ASSIGN_RESP}
      closeModal={closeModal}
    >
      <StyledModalCloseButton
        aria-label="close"
        onClick={closeModal}
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
              labelId="responsabil"
              id="responsabil"
              value={responsible?.id}
              label="Responsabil"
              onChange={onReponsibleChange}
            >
              { assignableResponsibles.map((user: UserDto) => <MenuItem key={user.id} value={user.id}>{`${user.surname} ${user.name}` }</MenuItem>) }
            </Select>
          </FormControl>

          <Typography variant="h3" sx={{ mt: 8 }}>
            Actualizeaza termen:
          </Typography>

          <FormControl fullWidth sx={{ mt: 4 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Termen:"
                shouldDisableDate={isInThePast}
                value={deadline ?? null}
                onChange={onDeadlineChange}
                renderInput={(params) => <TextField { ...params} fullWidth/>}
              />
            </LocalizationProvider>
          </FormControl>
          
        </form>
      </StyledModalContainer>
    </Modal>
  )
}

const StyledModalContainer = styled(Box)`
  width: 400px;
  padding: 24px 8px 8px;
`

const StyledModalCloseButton = styled(IconButton)`
  position: absolute;
  right: 8px;
  top: 8px;
`