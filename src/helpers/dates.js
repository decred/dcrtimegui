export const convertTsToStringDate = (timestamp) => {
  if (!timestamp) {
    return;
  }
  const d = new Date(timestamp * 1000);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const year = d.getFullYear();
  const month = months[d.getMonth()];
  const date = d.getDate();
  const time = month + '/' + date + '/' + year;

  return time;
}
