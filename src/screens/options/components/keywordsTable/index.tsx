import React from 'react';
import { ScrollableTable } from 'components/scrollableTable/table';
import { GenericTableRow } from 'components/genericTableRow';
import { KeywordDto } from '../../../../services/api/dtos/keyword';
import { ActionButtons } from './actionButtons';

interface OptionsTableProps {
  keywords: KeywordDto[];
  onDeleteKeyword: (id: string) => void;
}

const columns = ['Termen', 'Actiuni'];

export const OptionsTable = ({ keywords, onDeleteKeyword }: OptionsTableProps) => {
  const rows = keywords.map((keyword) => (
    <GenericTableRow
      id={keyword.id}
      key={keyword.id}
      values={[
        keyword.name,
        <ActionButtons key={'abc1'} keyword={keyword} onDeleteKeyword={onDeleteKeyword} />,
      ]}
    />
  ));

  return <ScrollableTable columns={columns} tableRows={rows} maxHeight='75vh' />;
};
