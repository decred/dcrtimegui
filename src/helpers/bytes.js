import CryptoJS from "crypto-js";
import { INVALID, EMPTY_DIGEST } from "../constants";

// Copied from https://stackoverflow.com/a/21797381
export const base64ToArrayBuffer = base64 => {
  const binary_string = window.atob(base64);
  const len = binary_string.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
};

// Copied from https://stackoverflow.com/a/33918579
export const arrayBufferToWordArray = ab => {
  const i8a = new Uint8Array(ab);
  const a = [];
  for (let i = 0; i < i8a.length; i += 4) {
    // eslint-disable-next-line
    a.push(
      (i8a[i] << 24) | (i8a[i + 1] << 16) | (i8a[i + 2] << 8) | i8a[i + 3]
    );
  }
  return CryptoJS.lib.WordArray.create(a, i8a.length);
};

export const digestPayload = payload =>
  CryptoJS.SHA256(
    arrayBufferToWordArray(base64ToArrayBuffer(payload))
  ).toString(CryptoJS.enc.Hex);

export const mergeFilesAndVerifyResult = (files, res) =>
  files.map((f, i) => ({
    ...f,
    ...(res.digests[i] || {})
  }));

export const mergeFilesAndAuthResult = (files, res) =>
  files.map((f, i) => ({
    ...f,
    digest: res && res.digests ? res.digests[i] : EMPTY_DIGEST,
    result: res && res.results ? res.results[i] : INVALID
  }));

const resultIsTwo = n => n === 2;
const fileVerified = ({ result }) => !resultIsTwo(result);
const fileNotVerified = ({ result }) => resultIsTwo(result);

export const filterFilesByVerifiedStatus = filesAndResult => ({
  newFiles: filesAndResult.filter(fileNotVerified),
  verifiedFiles: filesAndResult.filter(fileVerified)
});

export const getFilesDigests = files => files.map(f => f.digest);
