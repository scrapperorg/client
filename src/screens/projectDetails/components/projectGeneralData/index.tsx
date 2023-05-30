import React, {useEffect} from 'react';
import {ProjectDto} from "services/api/dtos";
import {Box, Button, Card, CardContent, Chip, Grid, Stack, Typography} from '@mui/material';
import styled from 'styled-components';
import useProjectLink from "../../hooks/useProjectLink";
import {Loading} from "../../../../components/loading";
import {Link} from "react-router-dom";

interface ProjectGeneralDataProps {
  project: ProjectDto;
}

export function ProjectGeneralData({project}: ProjectGeneralDataProps) {
  const {project: linkProject, loading, fetchProjectLink} = useProjectLink();

  useEffect(() => {
    fetchProjectLink(project);
  }, []);

  if (loading) {
    return <Loading/>;
  }

  const renderProjectLinkSenat = () => {
    if (!project.numarInregistrareSenat) {
      return null;
    }
    if (linkProject?.id && project.source === 'camera_deputatilor_pl') {
      return (<Link to={`/project/${linkProject.id}`}><Typography variant="h5"
                                                                  sx={{mb: 3}}>{project?.numarInregistrareSenat}</Typography></Link>)
    }
    return <Typography variant="h5" sx={{mb: 3}}>{project?.numarInregistrareSenat || '-'}</Typography>
  }

  const renderProjectLinkCdep = () => {
    if (!project.numarInregistrareCDep) {
      return null;
    }
    if (project.numarInregistrareCDep && linkProject?.id && project.source === 'senat_pl') {
      return (<Link to={`/project/${linkProject.id}`}><Typography variant="h5"
                                                                  sx={{mb: 3}}>{project?.numarInregistrareCDep}</Typography></Link>)
    }
    return <Typography variant="h5" sx={{mb: 3}}>{project?.numarInregistrareCDep || '-'}</Typography>
  }


  return (
    <Box sx={{mb: 4}}>
      <Grid container>

        <Grid item md={6}>
          <Card>
            <GeneralDataCardContent>
              <Grid container spacing={4}>
                <PropertiesGrid item md={4}>
                  {project.url &&
                      <Typography variant="h5" sx={{mb: 3, fontWeight: 500}}>URL proiect:</Typography>}
                  {project.publicationDate &&
                      <Typography variant="h5" sx={{mb: 3, fontWeight: 500}}>Data publicarii:</Typography>}
                  {project.numarInregistrareSenat &&
                      <Typography variant="h5" sx={{mb: 3, fontWeight: 500}}>Nr. inregistrare Senat:</Typography>}
                  {project.numarInregistrareCDep &&
                      <Typography variant="h5" sx={{mb: 3, fontWeight: 500}}>Nr. inregistrare Camera
                          Deputatilor:</Typography>}
                  {project.numarInregistrareGuvern &&
                      <Typography variant="h5" sx={{mb: 3, fontWeight: 500}}>Nr. inregistrare Guvern:</Typography>}
                  {project.proceduraLegislativa &&
                      <Typography variant="h5" sx={{mb: 3, fontWeight: 500}}>Procedura Legislativa:</Typography>}
                  {project.cameraDecizionala &&
                      <Typography variant="h5" sx={{mb: 3, fontWeight: 500}}>Camera decizionala:</Typography>}
                  {project.termenAdoptare &&
                      <Typography variant="h5" sx={{mb: 3, fontWeight: 500}}>Termen adoptare:</Typography>}
                  {project.tipInitiativa &&
                      <Typography variant="h5" sx={{mb: 3, fontWeight: 500}}>Tip initiativa:</Typography>}
                  {project.caracter && <Typography variant="h5" sx={{mb: 3, fontWeight: 500}}>Caracter:</Typography>}
                  {project.esteProceduraDeUrgenta &&
                      <Typography variant="h5" sx={{mb: 3, fontWeight: 500}}>Procedura de urgenta:</Typography>}
                  {project.stadiu && <Typography variant="h5" sx={{mb: 3, fontWeight: 500}}>Stadiu:</Typography>}
                  {project.initiator && <Typography variant="h5" sx={{mb: 3, fontWeight: 500}}>Initiator:</Typography>}
                  {project.consultati &&
                      <Typography variant="h5" sx={{mb: 3, fontWeight: 500}}>Consultati:</Typography>}
                </PropertiesGrid>

                <Grid item md={8}>
                  {project.url &&
                      <Typography variant="h5" sx={{mb: 3}}><a href={project?.url}
                                                               target='_blank' rel="noreferrer" >{project?.url}</a></Typography>}
                  {project.publicationDate &&
                      <Typography variant="h5" sx={{mb: 3}}>{project?.publicationDate || '-'}</Typography>}
                  {renderProjectLinkSenat()}
                  {renderProjectLinkCdep()}
                  {project.numarInregistrareGuvern &&
                      <Typography variant="h5" sx={{mb: 3}}>{project?.numarInregistrareGuvern || '-'}</Typography>}
                  {project.proceduraLegislativa &&
                      <Typography variant="h5" sx={{mb: 3}}>{project?.proceduraLegislativa || '-'}</Typography>}
                  {project.cameraDecizionala &&
                      <Typography variant="h5" sx={{mb: 3}}>{project?.cameraDecizionala || '-'}</Typography>}
                  {project.termenAdoptare &&
                      <Typography variant="h5" sx={{mb: 3}}>{project?.termenAdoptare || '-'}</Typography>}
                  {project.tipInitiativa &&
                      <Typography variant="h5" sx={{mb: 3}}>{project?.tipInitiativa || '-'}</Typography>}
                  {project.caracter && <Typography variant="h5" sx={{mb: 3}}>{project?.caracter || '-'}</Typography>}
                  {project.esteProceduraDeUrgenta &&
                      <Typography variant="h5" sx={{mb: 3}}>{project.esteProceduraDeUrgenta ? 'da' : 'nu'}</Typography>}
                  {project.stadiu && <Typography variant="h5" sx={{mb: 3}}>{project?.stadiu || '-'}</Typography>}
                  {project.initiator && <Typography variant="h5" sx={{mb: 3}}>{project?.initiator || '-'}</Typography>}
                  {project.consultati &&
                      <Typography variant="h5" sx={{mb: 3}}>{project?.consultati || '-'}</Typography>}
                </Grid>
              </Grid>
            </GeneralDataCardContent>
          </Card>
        </Grid>

        <Grid item md={4} sx={{pl: 4, display: 'flex'}}>
          <Card>
            <CardContent>
              <Chip label="Atasamente" color="primary" size="medium" sx={{mb: 3}}/>

            </CardContent>
          </Card>
        </Grid>

        <Grid item md={2} sx={{pl: 4}}>
          <Stack gap={4}>
            <Button variant='contained'>Ataseaza document</Button>
          </Stack>
        </Grid>

      </Grid>
    </Box>
  )
}

const PropertiesGrid = styled(Grid)(({theme}) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.text.secondary,
}));

const GeneralDataCardContent = styled(CardContent)`
  padding-bottom: 0 !important;
`