import React from "react";
import { parseISO, format } from "date-fns";

interface FormattedDateProps {
  date: Date;
};

export const FormattedDate = (props: FormattedDateProps): JSX.Element => {
  const { date } = props;
  return (<>{format(parseISO(date.toString()), 'iii, d LLL yyyy')}</>)
};
