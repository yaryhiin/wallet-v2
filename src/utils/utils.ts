export const getFormattedLocalDateTime = (dateStr: string) => {
  const date = new Date(dateStr);

  // Create a small helper function that makes a string at least 2 characters long
  // otherwise add "0" before it
  const pad = (num: number) => num.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};
