export const DCRDATA_URL =
  process.env.REACT_APP_NETWORK === "testnet"
  	? "https://testnet.dcrdata.org"
  	: "https://dcrdata.decred.org";

export const INVALID = 0;

// Timestamp Results
export const HASH_SENT = 1;
export const HASH_IN_SERVER = 2;

// Verify Results
export const HASH_FOUND_AND_VERIFIED = 1;
export const HASH_NOT_FOUND = 3;