import React from "react";
import { withRouter } from "react-router-dom";
import ResultCard from "src/components/ResultCard";
import { isDigestAnchored, isDigestAnchorPending, isDigestWaitingAnchoring } from "src/helpers/dcrtime";
import Spinner from "src/components/Spinner";
import useProcessDigests from "./hooks";
import styles from "./Results.module.css";
import { useTranslation } from "react-i18next";

const getStatus = digest => {
    if (isDigestAnchored(digest)) {
        return "Timestamped";
    }
    if (isDigestWaitingAnchoring(digest)) {
        return "Awaiting anchoring time";
    }
    if (isDigestAnchorPending(digest)) {
        return "Pending";
    }
    return "Not Found";
};

const Results = ({ location }) => {
    const { digests, loading, error } = useProcessDigests(location.hash);
    const { t } = useTranslation();

    return loading && !error ? (
        <div className={styles.spinnerWrapper}>
            <Spinner />
        </div>
    ) : error ? (
        <div className={styles.error}>
            {t("error.malformed")}
        </div>
    ): (
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
