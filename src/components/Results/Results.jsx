import React from "react";
import { Spinner } from "pi-ui";
import { withRouter } from "react-router-dom";
import ResultCard from "./ResultCard";
import useProcessDigests from "./hooks";
import styles from "./Results.module.css";

const Results = ({ location }) => {
  const { digests, loading, error } = useProcessDigests(location);

  if (error) throw error;

  return loading && !error ? (
    <div className={styles.spinner}>
      <Spinner invert />
    </div>
  ) : (
    digests.map(d => <ResultCard key={`d-${d.digest}`} digest={d} />)
  );
};

export default withRouter(Results);
