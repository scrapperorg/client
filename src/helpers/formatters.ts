export const capitalizeString = (str: string | undefined) => {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : null;
};

export const isDateOverdue = (due: Date | undefined) => {
  const dueDate = due ? new Date(due) : undefined;
  const currentDate = new Date();

  return dueDate ? dueDate < currentDate : false;
};
