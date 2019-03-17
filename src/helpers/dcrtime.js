import { INVALID, EMPTY_DIGEST } from "../constants";

// const resultIsTwo = n => n === 2;
// const fileVerified = ({ result }) => !resultIsTwo(result);
// const fileNotVerified = ({ result }) => resultIsTwo(result)

// export const filterFilesByVerifiedStatus = filesAndResult => ({
//   notTimestampedFiles: filesAndResult.filter(fileNotVerified),
//   timestampedFiles: filesAndResult.filter(fileVerified)
// });

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

export const getFilesDigests = files => files.map(f => f.digest);

export const isFileDigestAnchored = file => {
  return file.chaininformation && file.chaininformation.chaintimestamp;
};

export const isFileDigestFound = file => file.result === 0;

export const isFileDigestAnchorPending = file =>
  isFileDigestFound(file) && !isFileDigestAnchored(file);

export const isFileDigestNotAnchored = file => !isFileDigestFound(file);

export const getAnchoredFiles = files => files.filter(isFileDigestAnchored);

export const getPendingFiles = files => files.filter(isFileDigestAnchorPending);

export const getNotAnchoredFiles = files =>
  files.filter(isFileDigestNotAnchored);
