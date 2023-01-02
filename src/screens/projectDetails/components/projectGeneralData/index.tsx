import React from 'react';
import { ProjectDto } from "services/api/dtos";
import { Box, Button, Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material';
import styled from 'styled-components';

interface ProjectGeneralDataProps {
  project: ProjectDto;
}

export function ProjectGeneralData({ project }: ProjectGeneralDataProps) {

  return (
    <Box sx={{ mb: 4 }}>
      <Grid container>

        <Grid item md={6}>
          <Card>
            <GeneralDataCardContent>
                <Grid container spacing={4}>
                  <PropertiesGrid item md={4}>
                    <Typography variant="h5" sx={{mb: 3, fontWeight: 500}}>Nr. inregistrare Senat:</Typography>
                    <Typography variant="h5" sx={{mb: 3, fontWeight: 500}}>Nr. inregistrare Guvern:</Typography>
                    <Typography variant="h5" sx={{mb: 3, fontWeight: 500}}>Procedura Legislativa:</Typography>
                    <Typography variant="h5" sx={{mb: 3, fontWeight: 500}}>Camera decizionala:</Typography>
                    <Typography variant="h5" sx={{mb: 3, fontWeight: 500}}>Termen adoptare:</Typography>
                    <Typography variant="h5" sx={{mb: 3, fontWeight: 500}}>Tip initiativa:</Typography>
                    <Typography variant="h5" sx={{mb: 3, fontWeight: 500}}>Caracter:</Typography>
                    <Typography variant="h5" sx={{mb: 3, fontWeight: 500}}>Procedura de urgenta:</Typography>
                    <Typography variant="h5" sx={{mb: 3, fontWeight: 500}}>Stadiu:</Typography>
                    <Typography variant="h5" sx={{mb: 3, fontWeight: 500}}>Initiator:</Typography>
                    <Typography variant="h5" sx={{mb: 3, fontWeight: 500}}>Consultati:</Typography>
                  </PropertiesGrid>
                
                  <Grid item md={8}>
                    <Typography variant="h5" sx={{mb: 3}}>{project?.numarInregistrareSenat || '-'}</Typography>
                    <Typography variant="h5" sx={{mb: 3}}>{project?.numarInregistrareGuvern || '-'}</Typography>
                    <Typography variant="h5" sx={{mb: 3}}>{project?.proceduraLegislativa || '-'}</Typography>
                    <Typography variant="h5" sx={{mb: 3}}>{project?.cameraDecizionala || '-'}</Typography>
                    <Typography variant="h5" sx={{mb: 3}}>{project?.termenAdoptare || '-'}</Typography>
                    <Typography variant="h5" sx={{mb: 3}}>{project?.tipInitiativa || '-'}</Typography>
                    <Typography variant="h5" sx={{mb: 3}}>{project?.caracter || '-'}</Typography>
                    <Typography variant="h5" sx={{mb: 3}}>{project.esteProceduraDeUrgenta ? 'da' : 'nu'}</Typography>
                    <Typography variant="h5" sx={{mb: 3}}>{project?.stadiu || '-'}</Typography>
                    <Typography variant="h5" sx={{mb: 3}}>{project?.initiator || '-'}</Typography>
                    <Typography variant="h5" sx={{mb: 3}}>{project?.consultati || '-'}</Typography>
                  </Grid> 
                </Grid>
              </GeneralDataCardContent>
            </Card>
          </Grid>

        <Grid item md={4} sx={{ pl: 4, display: 'flex' }}>
          <Card>
            <CardContent>
              <Chip label="Atasamente" color="primary" size="medium" sx={{mb: 3}}/>

            </CardContent>
          </Card>
        </Grid>

        <Grid item md={2} sx={{ pl: 4 }}>
          <Stack gap={4}>
            <Button variant='contained'>Descarca</Button>
            <Button variant='contained'>Ataseaza document</Button>
          </Stack>
        </Grid>

      </Grid>
    </Box>
  )
}

const PropertiesGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.text.secondary,
}));

const GeneralDataCardContent = styled(CardContent)`
  padding-bottom: 0 !important;
`