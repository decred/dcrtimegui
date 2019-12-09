import qs from "query-string";

export const updateDigests = (digests, newDigests) =>
  digests.map(d => {
    const newDigest = newDigests.filter(nd => nd.digest === d.digest)[0];
    return newDigest || d;
  });

export const processQueryData = locationHash => {
  const {
    digests: strDigests,
    names: strNames,
    timestamp: strTimestamp
  } = qs.parse(locationHash);

  const digests = strDigests.split(",");
  const names = strNames ? strNames.split(",") : [];
  const shouldTimestamp = strTimestamp === "true";

  // file names are set from the query param if existent otherwise the
  // digest is used as the name
  const data = digests.map((d, i) => ({
    name: names[i] || d,
    digest: d
  }));

  return { data, shouldTimestamp };
};
