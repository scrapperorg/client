import { Box } from '@mui/system';
import React, { useContext } from 'react';
import { RobotsStatusContext } from '../../context';
import { RobotsStatusTable } from '../robotsStatusTable';

export default function RobotsStatusContent() {
  const { robotsStatus } = useContext(RobotsStatusContext);

  return (
    <>
      <Box>
        <RobotsStatusTable
          robots={robotsStatus}
          page={1}
          pageSize={50}
          onPageChange={() => console.log('to be implemented')}
          onPageSizeChange={() => console.log('to be implemented')}
        />
      </Box>
    </>
  );
}
