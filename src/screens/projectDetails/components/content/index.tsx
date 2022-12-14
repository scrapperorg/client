import { Typography } from '@mui/material';
import PATHS from 'constants/paths';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProjectDetailsContext } from 'screens/projectDetails/context';

export default function ProjectDetailsContent () {

  const { project } = useContext(ProjectDetailsContext);

  if (!project) return null

  return (
    <>
    <Link to={PATHS.MONITOR}>inapoi</Link>
    <Typography>{project.title}</Typography>
    </>
  );
}