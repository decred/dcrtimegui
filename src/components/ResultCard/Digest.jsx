import React, { useState } from "react";
import PropTypes from "prop-types";
import { Text, Tooltip } from "pi-ui";
import CopyIcon from "src/assets/copy_icon.svg";
import styles from "./ResultCard.module.css";

const Digest = ({ digest }) => {
  const [copied, setCopied] = useState(false);

  const copyDigestToClipboard = () => {
    navigator.clipboard.writeText(digest);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className={styles.paddingBottom20}>
      <Text className={styles.fontSize13}>Digest</Text>
      <div className={styles.digestWrapper}>
        <Text id={`d-${digest}`} truncate className={styles.digestText}>
          {digest}
        </Text>
        <Tooltip
          content={copied ? "Copied!" : "Copy"}
          placement="right"
          className={styles.copyIconTooltip}
        >
          <img
            alt="copy"
            src={CopyIcon}
            className={styles.copyIcon}
            onClick={copyDigestToClipboard}
          />
        </Tooltip>
      </div>
    </div>
  );
};

Digest.propTypes = {
  digest: PropTypes.string
};

export default Digest;
