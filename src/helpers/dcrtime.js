import dcrtime from "dcrtimejs";

dcrtime.setNetwork(process.env.REACT_APP_NETWORK);

export const digestPayload = dcrtime.getSHA256fromBase64;

export const timestamp = dcrtime.timestamp;

export const verify = dcrtime.verify;

export const mergeFilesAndResult = (files, res) =>
  files.map(f => {
    const result = res.digests.find(d => f.digest === d.digest);
    return {
      ...f,
      ...result
    };
  });

export const getDigests = data => data.map(d => d.digest);

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
