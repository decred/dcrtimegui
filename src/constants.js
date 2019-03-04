export const SUCCESS = 0;
export const FILE_ALREADY_EXISTS = 1;
export const FILE_DOES_NOT_EXIST = 2;
export const DISABLED = 3;
export const INVALID = 4;
export const EMPTY_DIGEST = "";

export const DCRDATA_URL =
  process.env.REACT_APP_NETWORK === "testnet"
    ? "https://testnet.dcrdata.org"
    : "https://explorer.dcrdata.org";
