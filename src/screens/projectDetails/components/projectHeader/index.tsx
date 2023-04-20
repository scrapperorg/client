import React from 'react';
import { ProjectDto } from "services/api/dtos";
import { Box, Grid, Typography } from '@mui/material';
import StarsIcon from '@mui/icons-material/Stars';

interface ProjectHeaderProps {
  project: ProjectDto;
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Grid container>
        <Grid item md={10}>
          <Grid container justifyContent='space-between'>
            <Grid item>
                <Typography variant='h2'>
                  { project.title }
                </Typography>
            </Grid>
              {project.presentsInterest &&
                <Grid item>
                  <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <StarsIcon color="primary" fontSize="medium" sx={{mr: 2}}/>
                    <Typography>Proiect legislativ de interes/cu impact</Typography>
                  </Box>
                </Grid>
              }
            </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
