import React from "react";
import { withRouter } from "react-router-dom";
import ResultCard from "src/components/ResultCard";
import { isDigestAnchored, isDigestAnchorPending,isDigestFound } from "src/helpers/dcrtime";
import Spinner from "src/components/Spinner";
import useProcessDigests from "./hooks";
import styles from "./Results.module.css";

const getStatus = digest => {
    if (isDigestAnchored(digest)) {
        return "Timestamped";
    }
    if (isDigestAnchorPending(digest)) {
        return "Pending";
    }
    if (isDigestFound(digest)) {
        return "Waiting anchoring time";
    }
    return "Not Found";
};

const Results = ({ location }) => {
    const { digests, loading, error } = useProcessDigests(location.hash);

    if (error) throw error;

    return loading && !error ? (
        <div className={styles.spinnerWrapper}>
            <Spinner />
        </div>
    ) : (
        digests.map(d => (
            <ResultCard
                key={`d-${d.digest}`}
                name={d.name}
                serverTimestamp={d.servertimestamp}
                digest={d.digest}
                chainInfo={d.chaininformation}
                status={getStatus(d)}
            />
        ))
    );
};

export default withRouter(Results);
