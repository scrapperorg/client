import React from 'react';
import { parseISO, format } from 'date-fns';
import { ro } from 'date-fns/locale';

interface FormattedDateProps {
  date: Date;
  formatType?: string;
}

export const FormattedDate = (props: FormattedDateProps): JSX.Element => {
  const { date, formatType } = props;
  const formattedDate = format(parseISO(date?.toString()), formatType || 'iii, d LLL yyyy', { locale: ro });
  const capitalizedDate = formattedDate
    .split(' ')
    .map((word) => word.charAt(0).toLocaleUpperCase('ro-RO') + word.slice(1))
    .join(' ');
  return <>{capitalizedDate}</>;
};
