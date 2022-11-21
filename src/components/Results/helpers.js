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
  console.log(locationHash);

  const hashes = strHashes.split(",");
  const shouldTimestamp = strTimestamp === "true";

  // file names are set from the query param if existent otherwise the
  // digest is used as the name
  const data = hashes.map(d => ({
    digest: d
  }));

  return { data, shouldTimestamp };
};
