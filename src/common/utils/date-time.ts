export const parseDateTime = (date: string) => {
  const timestamp = Date.parse(date);
  return isNaN(timestamp) ? null : new Date(timestamp);
};
