import dcrtime from "dcrtimejs";
import { HASH_IN_SERVER } from "../constants";

dcrtime.setNetwork(process.env.REACT_APP_NETWORK);

export const digestPayload = dcrtime.getSHA256fromBase64;

export const timestamp = dcrtime.timestamp;

export const verify = dcrtime.verify;

export const getLastDigests = dcrtime.getLastDigests;

// Handlers for API calls
export const handleVerify = async data => {
    const digests = getDigests(data);
    const res = await verify(digests);
    if (res.error) throw res.error;
    return res;
};

export const handleTimestamp = async data => {
    const digests = getDigests(data);
    const res = await timestamp(digests, "data");
    if (res.error) throw res.error;
    return res;
};

export const handleGetLastDigests = async n => {
    const res = await getLastDigests(n);
    if (res.error) throw res.error;
    return res;
};

// Helper functions
export const mergeDigestsAndResult = (digests, res) =>
    digests.map(ds => {
        const result = res.digests?.find(d => ds.digest === d.digest);
        return {
            ...ds,
            ...result
        };
    });

export const getDigests = data => data.map(d => d.digest);

export const isDigestAnchored = digest =>
    !!(digest.chaininformation && digest.chaininformation.chaintimestamp);

export const getLastHourBucketTimestamp = () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 60);
    date.setMinutes(0, 0, 0);
    const roundedTs = date.getTime();
    // convert to seconds timestamp
    return roundedTs/1000;
};

export const nextAnchoringDate = () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() + 60);
    date.setMinutes(0, 0, 0);
    return date;
};

export const isDigestFound = digest => digest.result === HASH_IN_SERVER;

export const isDigestAnchorPending = digest =>
    !isDigestAnchored(digest) && digest.chaininformation && digest.chaininformation.transaction !== "0000000000000000000000000000000000000000000000000000000000000000";

export const isDigestWaitingAnchoring = digest => digest.result === 1 && !isDigestAnchored(digest) && ((digest.chaininformation && digest.chaininformation.transaction === "0000000000000000000000000000000000000000000000000000000000000000") || !digest.chaininformation);

export const isDigestNotAnchored = digest => !isDigestFound(digest);

export const getAnchoredDigests = digests => digests.filter(isDigestAnchored);

export const getPendingDigests = digests =>
    digests.filter(isDigestAnchorPending);

export const getNotAnchoredDigests = data => data.filter(isDigestNotAnchored);

export const filesArrayToObj = (files) => {
    return files.reduce((acc, cur) => {
        return {
            ...acc,
            [cur.digest]: {
                ...cur
            }
        };
    }, {});
};