export const DCRDATA_URL =
  process.env.REACT_APP_NETWORK === "testnet"
  	? "https://testnet.dcrdata.org"
  	: "https://explorer.dcrdata.org";

// Dcrtime error to formatted UI error
export const ERROR_MAP = {
    "Invalid Digests array": "Invalid hashes, please check your search inputs"
};
