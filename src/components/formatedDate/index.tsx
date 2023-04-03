import React from 'react';
import { parseISO, format } from 'date-fns';

interface FormattedDateProps {
  date: Date;
  formatType?: string;
}

export const FormattedDate = (props: FormattedDateProps): JSX.Element => {
  const { date, formatType } = props;
  return <>{format(parseISO(date.toString()), formatType || 'iii, d LLL yyyy')}</>;
};
