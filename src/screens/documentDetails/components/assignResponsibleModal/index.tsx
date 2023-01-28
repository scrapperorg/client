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

interface AssignResponsibleModalProps {
  assignableResponsibles: UserDto[];
  responsible: UserDto | undefined;
  assignResponsible: (userId: string) => void;
}

export const AssignResponsibleModal = (props: AssignResponsibleModalProps) => {
  const {
    isAssignResponsibleModalOpened: isModalOpened,
    closeAssignResponsibleModal: closeModal,
  } = useContext(InteractiveComponentsContext);


  const {
    assignableResponsibles,
    responsible,
    assignResponsible
  } = props;

  const onReponsibleChange = (event: SelectChangeEvent) => {
    assignResponsible(event.target.value as string)
  }

  return (
    <Modal
      isModalOpened={isModalOpened}
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
                value={null}
                onChange={() => { /** */ }}
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