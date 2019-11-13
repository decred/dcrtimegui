import { useState, useEffect } from "react";
import qs from "query-string";
import {
  mergeDigestsAndResult,
  getNotAnchoredDigests,
  getDigests,
  timestamp,
  verify
} from "src/helpers/dcrtime";

const useProcessDigests = location => {
  const [digests, setDigests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function handleProcessDigests(digests, shouldTimestamp) {
      try {
        setLoading(true);
        const verifyRes = await handleVerify(digests);
        if (verifyRes.error) setError(new Error("Invalid array of digests"));

        const verifiedDigests = mergeDigestsAndResult(digests, verifyRes);
        setDigests(verifiedDigests);

        // differentiate between digests already sent to the server and the
        // ones which were not sent yet
        const notTimestampedDigests = getNotAnchoredDigests(verifiedDigests);

        // apply the timestamp to the digests which were not found in the server
        // if 'shouldTimestamp' is true
        if (
          shouldTimestamp &&
          notTimestampedDigests &&
          notTimestampedDigests.length
        ) {
          const tsRes = await handleTimestamp(notTimestampedDigests);
          const tsDigests = mergeDigestsAndResult(notTimestampedDigests, tsRes);
          setDigests(digests => updateDigests(digests, tsDigests));
        }
        setLoading(false);
      } catch (e) {
        setError(e);
      }
    }

    // query string parameters
    const {
      digests: strDigests,
      names: strNames,
      timestamp: strTimestamp
    } = qs.parse(location.hash);

    const digests = strDigests.split(",");
    const names = strNames ? strNames.split(",") : [];
    const shouldTimestamp = strTimestamp === "true";

    // file names are set from the query param if existent otherwise the
    // digest is used as the name
    const data = digests.map((d, i) => ({
      name: names[i] || d,
      digest: d
    }));

    handleProcessDigests(data, shouldTimestamp);
  }, [location.hash]);

  // Handlers for API calls
  const handleVerify = async data => {
    const digests = getDigests(data);
    try {
      const res = await verify(digests);
      return res;
    } catch (e) {
      setError(e);
    }
  };

  const handleTimestamp = async data => {
    const digests = getDigests(data);
    try {
      const res = await timestamp(digests, "data");
      return res;
    } catch (e) {
      setError(e);
    }
  };

  return { digests, loading, error };
};

const updateDigests = (digests, newDigests) =>
  digests.map(d => {
    const newDigest = newDigests.filter(nd => nd.digest === d.digest)[0];
    return newDigest || d;
  });

export default useProcessDigests;
