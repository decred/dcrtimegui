import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./ResultCard.module.css";

const Digest = ({ digest }) => {
    const [copied, setCopied] = useState(false);

    const copyDigestToClipboard = () => {
        navigator.clipboard.writeText(digest);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    };

    return (
        <div className={styles.digestWrapper}>
            <span id={`d-${digest}`} className={styles.digestText}>
                {digest}
            </span>
        </div>
    );
};

Digest.propTypes = {
    digest: PropTypes.string
};

export default Digest;
