import { Typography } from '@mui/material';
import PATHS from 'constants/paths';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DocumentDetailsContext } from 'screens/documentDetails/context';

export default function DocumentDetailsContent () {

  const { document } = useContext(DocumentDetailsContext);

  if (!document) return null

  return (
    <>
    <Link to={PATHS.MONITOR}>inapoi</Link>
    <Typography>{document.title}</Typography>
    </>
  );
}