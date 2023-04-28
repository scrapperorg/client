import * as React from 'react';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface CircularProgressionIndicatorProps {
  percentage: number;
}

function CircularProgressWithLabel(props: CircularProgressProps & { value: number, color: "primary" | "secondary" | "error" | "info" | "success" | "warning" | "inherit" | undefined }) {
  const { color, ...otherProps } = props;
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant='determinate' {...otherProps} color={color} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant='caption' component='div' color='text.secondary' fontSize={13}>{`${
          props.value
        }%`}</Typography>
      </Box>
    </Box>
  );
}

export default function CircularProgressIndicator(props: CircularProgressionIndicatorProps) {
  const { percentage } = props;
  const WEAK_PRECISION_LIMIT = 30;
  const MEDIUM_PRECISION_LIMIT = 70;

  let color: "primary" | "secondary" | "error" | "info" | "success" | "warning" | "inherit" | undefined = undefined;
  if (percentage !== undefined && percentage !== null) {
    if (percentage < WEAK_PRECISION_LIMIT) {
      color = 'error';
    } else if (percentage < MEDIUM_PRECISION_LIMIT) {
      color = 'warning';
    } else {
      color = 'success';
    }
  }

  return <CircularProgressWithLabel value={percentage} color={color} />;
}
