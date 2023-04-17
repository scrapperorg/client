import React from 'react';
import { FormattedDate, GenericTableRow } from "components";
import { UserDto } from "services/api/dtos";
import { ActionButtons } from './actionsButttons';
import { Translations } from 'constants/translations';
import { ScrollableTable } from 'components/scrollableTable/table';

interface UsersTableProps {
  users: UserDto[];
}

const columns = ["Nume", "Email", "Rol", "Data crearii", "Status", "Actiuni"];

export const UsersTable = (props: UsersTableProps) => {
  const { users } = props;

  const userRows = users.map((user) => (
    <GenericTableRow
      id={user.id}
      key={user.id}
      values={[
        <span key={`${user.id}-name`}>{`${user.name} ${user.surname}`}</span>,
        <span key={`${user.id}-email`}>{user.email}</span>,
        <span key={`${user.id}-role`}>{user.role}</span>,
        <FormattedDate key={`${user.id}-created`} date={user.createdAt} />,
        <span key={`${user.id}-status`}>{Translations[user.status]}</span>,
        <ActionButtons status={user.status} key={`${user.id}-actions`}/>
      ]}
    />
  ));

  return (
    <ScrollableTable
      columns={columns}
      tableRows={userRows}    
      maxHeight='60vh'
    />
  )
}