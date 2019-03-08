import { DCRDATA_URL } from "../constants";

export const formatDigestToDownload = ({ name, transaction, date, result }) => {
  return JSON.stringify({
    file: name,
    transaction: `${DCRDATA_URL}/tx/${transaction}`,
    achoredDate: date,
    fullResult: result
  });
};
