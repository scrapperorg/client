export const capitalizeString = (str: string | undefined) => {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : null;
};

export const isDateOverdue = (due: Date | undefined) => {
  if(due === undefined) return false;
  const dueDate = new Date(due);
  const currentDate = new Date();
  return dueDate < currentDate;
};

export const removeNullishEntries = (obj: any) => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => !!v));
}