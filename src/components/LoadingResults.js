import React from "react";
import { Card, Spinner } from "pi-ui";
import Icon from "src/assets/anchored_icon.svg";

import styles from "./components.module.css";

const Checkmark = () => (
  <img src={Icon} height="40" width="40" alt="checkmark" />
);

const LoadingItem = ({ message, loading }) => (
  <Card className={styles.loadingItemCard}>
    <span>{message}</span>
    {loading ? <Spinner invert /> : <Checkmark />}
  </Card>
);

const LoadingResults = ({
  verifyLoading,
  verified,
  timestampLoading,
  timestamped
}) => {
  return (
    <div className={styles.loadingResultsWrapper}>
      {verifyLoading || verified ? (
        <LoadingItem
          message={verified ? "Digests verified" : "Verifying digests"}
          loading={verifyLoading}
        />
      ) : null}
      {timestampLoading || timestamped ? (
        <LoadingItem
          message={
            timestamped ? "Uploaded new digests" : "Uploading new digests"
          }
          loading={timestampLoading}
        />
      ) : null}
    </div>
  );
};

export default LoadingResults;
