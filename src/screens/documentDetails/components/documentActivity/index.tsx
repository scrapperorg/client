import Grid from '@mui/material/Grid';
import { Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { FormattedDate } from '../../../../components/formatedDate';
import React from 'react';
import { DocumentDto, UserDto } from '../../../../services/api/dtos';
import { AssignResponsibleModal } from '../assignResponsibleModal';

interface DocumentActivityProps {
  document: DocumentDto;
  isModalOpened: boolean;
  assignableResponsibles: UserDto[];
  assignResponsible: (userId: string) => void;
  setDeadline: (date: string | undefined) => void;
  openModal: (modalName: string) => void;
}

function DocumentActivity(props: DocumentActivityProps) {
  const { document, openModal, assignableResponsibles, assignResponsible, setDeadline } = props;

  const assignedUser = document.assignedUser
    ? `${document.assignedUser.surname} ${document.assignedUser.name}`
    : 'Nu exista un responsabil asignat';

  return (
    <>
      <Grid container spacing={4}>
        <Grid item md={10}>
          <Card>
            <CardContent>
              <Chip label='Activitate' color='primary' size='medium' sx={{ mb: 3 }} />
              <Grid container spacing={4}>
                <Grid item md={4}>
                  <Typography variant='h4' sx={{ mb: 3 }}>
                    Stare:
                  </Typography>
                  <Typography variant='h4' sx={{ mb: 3 }}>
                    Responsabil:
                  </Typography>
                  <Typography variant='h4' sx={{ mb: 3 }}>
                    Termen Predare:
                  </Typography>
                </Grid>
                <Grid item md={8}>
                  <Typography variant='h5' sx={{ mb: 3 }}>
                    {document.status}
                  </Typography>
                  <Typography variant='h5' sx={{ mb: 3 }}>
                    {assignedUser}
                  </Typography>
                  <Typography variant='h5' sx={{ mb: 3 }}>
                    {document.deadline && <FormattedDate date={document.deadline} />}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={2}>
          <Stack gap={4}>
            <Button
              variant='contained'
              onClick={() => {
                openModal('assign-responsible-modal');
              }}
            >
              Actualizeaza responsabil/termen
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <AssignResponsibleModal
        assignableResponsibles={assignableResponsibles}
        assignResponsible={assignResponsible}
        responsible={document.assignedUser}
        deadline={document.deadline}
        setDeadline={setDeadline}
      />
    </>
  );
}

export default React.memo(DocumentActivity);
