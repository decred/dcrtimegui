import { useState, useEffect } from "react";
import { updateDigests, processQueryData } from "./helpers";
import {
    mergeDigestsAndResult,
    getNotAnchoredDigests,
    handleVerify,
    handleTimestamp
} from "src/helpers/dcrtime";

const useProcessDigests = hash => {
    const [digests, setDigests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function handleProcessDigests(digests, shouldTimestamp) {
            try {
                setLoading(true);
                const verifyRes = await handleVerify(digests);
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
                    setDigests(updateDigests(digests, tsDigests));
                }
                setLoading(false);
                setError(false);
            } catch (e) {
                setError(e);
            }
        }

        const { data, shouldTimestamp } = processQueryData(hash);
        handleProcessDigests(data, shouldTimestamp);
    }, [hash]);

    return { digests, loading, error };
};

export default useProcessDigests;
