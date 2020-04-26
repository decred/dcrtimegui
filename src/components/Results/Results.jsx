import React, { useCallback } from "react";
import { Spinner, StatusTag } from "pi-ui";
import { withRouter } from "react-router-dom";
import ResultCard from "src/components/ResultCard";
import { isDigestAnchored, isDigestAnchorPending } from "src/helpers/dcrtime";
import useProcessDigests from "./hooks";
import styles from "./Results.module.css";

const Results = ({ location }) => {
  const { digests, loading, error } = useProcessDigests(location);

  if (error) throw error;

  const getStatusTag = useCallback(digest => {
    function renderStatusTag(text, type) {
      return <StatusTag text={text} type={type} className={styles.resultTag} />;
    }

    if (isDigestAnchored(digest)) {
      return renderStatusTag("Anchored", "greenCheck");
    }
    if (isDigestAnchorPending(digest)) {
      return renderStatusTag("Pending", "bluePending");
    }
    return renderStatusTag("Not Anchored", "orangeNegativeCircled");
  }, []);

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
        chainInfo={d.chaininformation}
        statusTag={getStatusTag(d)}
        isDigestAnchored={isDigestAnchored(d)}
      />
    ))
  );
};

export default withRouter(Results);
