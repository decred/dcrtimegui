import qs from "query-string";

export const updateDigests = (digests, newDigests) =>
    digests.map(d => {
        const newDigest = newDigests.filter(nd => nd.digest === d.digest)[0];
        return newDigest || d;
    });

export const processQueryData = locationHash => {
    const {
        hashes: strHashes,
        timestamp: strTimestamp
    } = qs.parse(locationHash);
    const hashes = strHashes.split(",");
    const shouldTimestamp = strTimestamp === "true";

    const data = hashes.map(d => ({
        digest: d
    }));

    return { data, shouldTimestamp };
};
