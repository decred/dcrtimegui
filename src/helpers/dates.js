export const convertTsToStringDate = timestamp => {
  if (!timestamp) {
    return;
  }
  const d = new Date(timestamp * 1000);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const year = d.getFullYear();
  const month = months[d.getMonth()];
  const date = d.getDate();
  const time = month + "/" + date + "/" + year;

  return time;
};

export const formatDate = date => {
  const twoChars = v => (v < 10 ? `0${v}` : v);
  const d = new Date(date * 1000);
  const year = d.getUTCFullYear();
  const month = twoChars(d.getUTCMonth());
  const day = twoChars(d.getUTCDate());
  const hours = twoChars(d.getUTCHours());
  const minutes = twoChars(d.getUTCMinutes());
  const seconds = twoChars(d.getUTCSeconds());
  return `${year}-${month}-${day}-${hours}:${minutes}:${seconds}`;
};
