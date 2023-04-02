import React from 'react';
import { GenericTable } from 'components/genericTable';
import { GenericTableRow } from 'components/genericTableRow';
import { Link } from 'react-router-dom';
import { Chip, useTheme } from '@mui/material';
import styled from 'styled-components';
import { Status } from 'services/api/dtos/document';
import { DocumentMarks } from 'components/documentsTableDocumentMarks';
import { ActionButtons } from 'components/documentsTableActionButtons';
import { RobotStatusDto } from '../../context';
import { Error as ErrorIcon, Done as DoneIcon } from '@mui/icons-material';
import { FormattedDate } from '../../../../components';

interface RobotsStatusTableProps {
  robots: RobotStatusDto[];
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void | undefined;
  onPageSizeChange?: (pageSize: number) => void | undefined;
}

const columns = ['Stare', 'Nume', 'Ultima Activare', 'Info'];

export const RobotsStatusTable = (props: RobotsStatusTableProps) => {
  const { robots, page, onPageChange, pageSize, onPageSizeChange } = props;

  const rows = robots.map((robot) => (
    <GenericTableRow
      id={robot.name}
      key={robot.name}
      values={[
        <Chip
          key={robot.name}
          label={robot.status}
          color={robot.status === 'FUNCTIONAL' ? 'success' : 'error'}
          icon={robot.status === 'FUNCTIONAL' ? <DoneIcon /> : <ErrorIcon />}
        />,
        robot.name,
        <FormattedDate
          key={`date-for-${robot.name}`}
          formatType={'HH:mm EEE d MMMM'}
          date={robot.lastActivation}
        />,
        robot.info,
      ]}
    />
  ));

  return <GenericTable columns={columns} tableRows={rows} />;
};

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
  ['&:focus, &:visited, &:active, &:active']: {
    color: theme.palette.text.primary,
  },
  ['&:hover']: {
    color: theme.palette.text.secondary,
  },
}));
