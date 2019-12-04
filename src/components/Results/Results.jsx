import React from "react";
import { Spinner, StatusTag } from "pi-ui";
import { withRouter } from "react-router-dom";
import ResultCard from "./ResultCard";
import { isDigestAnchored, isDigestAnchorPending } from "src/helpers/dcrtime";
import useProcessDigests from "./hooks";
import styles from "./Results.module.css";

const Results = ({ location }) => {
  const { digests, loading, error } = useProcessDigests(location);

  if (error) throw error;

  const getStatusTag = digest => {
    if (isDigestAnchored(digest)) {
      return <StatusTag text="Anchored" type="greenCheck" />;
    }
    if (isDigestAnchorPending(digest)) {
      return <StatusTag text="Pending" type="bluePending" />;
    }
    return <StatusTag text="Not Anchored" type="orangeNegativeCircled" />;
  };

  return loading && !error ? (
    <div className={styles.spinner}>
      <Spinner invert />
    </div>
  ) : (
    digests.map(d => (
      <ResultCard
        key={`d-${d.digest}`}
        name={d.name}
        digest={d.digest}
        chaininfo={d.chaininformation}
        statusTag={getStatusTag(d)}
        isDigestAnchored={isDigestAnchored(d)}
      />
    ))
  );
};

export default withRouter(Results);
