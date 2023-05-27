import React from 'react';
import { GenericTable } from 'components/genericTable';
import { GenericTableRow } from 'components/genericTableRow';
import { Chip } from '@mui/material';
import { RobotStatusDto } from '../../context';
import { Error as ErrorIcon, Done as DoneIcon } from '@mui/icons-material';
import { FormattedDate } from '../../../../components';
import {Translations} from "../../../../constants/translations";

interface RobotsStatusTableProps {
  robots: RobotStatusDto[];
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void | undefined;
  onPageSizeChange?: (pageSize: number) => void | undefined;
}

const columns = ['Stare', 'Nume', 'Ultima Activare', 'Info'];

export const RobotsStatusTable = (props: RobotsStatusTableProps) => {
  const { robots } = props;

  const rows = robots.map((robot) => (
    <GenericTableRow
      id={robot.name}
      key={robot.name}
      values={[
        <Chip
          key={robot.name}
          label={Translations[robot.status]}
          color={robot.status === 'FUNCTIONAL' ? 'success' : 'error'}
          icon={robot.status === 'FUNCTIONAL' ? <DoneIcon /> : <ErrorIcon />}
        />,
        Translations[robot.name],
        <FormattedDate
          key={`date-for-${robot.name}`}
          formatType={'HH:mm EEE d MMMM'}
          date={robot.last_run}
        />,
        robot.info,
      ]}
    />
  ));

  return <GenericTable columns={columns} tableRows={rows} maxHeight='75vh' />;
};
