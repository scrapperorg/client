import React from 'react';
import { ProjectDto } from "services/api/dtos";
import { Box, Grid, Typography } from '@mui/material';
import StarsIcon from '@mui/icons-material/Stars';
import { useTranslation } from 'react-i18next';
import { Translations } from 'constants/translations';

interface ProjectHeaderProps {
  project: ProjectDto;
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  const { t } = useTranslation();

  return (
    <Box sx={{ mb: 4 }}>
      <Grid container>
        <Grid item md={10}>
          <Grid container justifyContent='space-between'>
            <Grid item>
                {project.source && 
                  <Typography variant='h2'>
                    { Translations[project.source] }
                  </Typography>
                }
                <Typography variant='h2'>
                  { project.title }
                </Typography>
            </Grid>
              {project.presentsInterest &&
                <Grid item>
                  <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <StarsIcon color="primary" fontSize="medium" sx={{mr: 2}}/>
                    <Typography>{t('projectView.projectHeader')}</Typography>
                  </Box>
                </Grid>
              }
            </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
