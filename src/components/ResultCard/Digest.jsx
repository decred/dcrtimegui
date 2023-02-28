import React from "react";
import PropTypes from "prop-types";
import styles from "./ResultCard.module.css";
import Copy from "../Copy";

const Digest = ({ digest }) => {
    return (
        <div className={styles.digestWrapper}>
            <span id={`d-${digest}`} className={styles.digestText}>
                {digest}
            </span>
            <Copy text={digest} />
        </div>
    );
};

Digest.propTypes = {
    digest: PropTypes.string
};

export default Digest;
