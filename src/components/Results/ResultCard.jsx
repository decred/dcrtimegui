import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Text, Tooltip } from "pi-ui";
import CopyIcon from "src/assets/copy_icon.svg";
import FileIcon from "src/assets/file_icon.svg";
import DownloadIcon from "src/assets/download_icon.svg";
import styles from "./Results.module.css";

const ResultCard = ({
  name,
  digest,
  chaininfo,
  isDigestAnchored,
  children
}) => {
  const [copied, setCopied] = useState(false);

  const copyDigestToClipboard = () => {
    navigator.clipboard.writeText(digest);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const dataForDownload = JSON.stringify({
    name: name,
    digest: digest,
    transaction: chaininfo.transaction,
    merkleRoot: chaininfo.merkleroot,
    merklePath: chaininfo.merklepath
  });

  return (
    <Card className={styles.card}>
      <div className={styles.content}>
        {/* Name */}
        <div className={styles.resultCardHeader}>
          <img alt="file" src={FileIcon} className={styles.fileIcon} />
          <Text id={`n-${name}`} truncate className={styles.headerName}>
            {name}
          </Text>
          {/* Status Tag */}
          {children}
        </div>

        {/* Digest */}
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

        {isDigestAnchored ? (
          <>
            {/* Chain Info */}
            <div className={styles.paddingBottom20}>
              <p className={styles.fontSize13}>
                Timestamp:
                <Text color="gray" className={styles.fontSize13}>
                  {" " + chaininfo.chaintimestamp}
                </Text>
              </p>
              <p className={styles.fontSize13}>
                Merkle root:
                <Text color="gray" className={styles.fontSize13}>
                  {" " + chaininfo.merkleroot}
                </Text>
              </p>
              <p className={styles.fontSize13}>
                Transaction:
                <Text color="gray" className={styles.fontSize13}>
                  {" " + chaininfo.transaction}
                </Text>
              </p>
            </div>

            {/* Download Proof  */}
            <div className={styles.paddingBottom20}>
              <a
                href={`data:text/plain;charset=utf-8, ${encodeURIComponent(
                  dataForDownload
                )}`}
                download={`${name}.json`}
                className={styles.downloadWrapper}
              >
                <img
                  alt="download"
                  src={DownloadIcon}
                  className={styles.downloadIcon}
                />
                <Text color="primary" className={styles.fontSize13}>
                  Download Proof (json)
                </Text>
              </a>
            </div>
          </>
        ) : null}
      </div>
    </Card>
  );
};

ResultCard.propTypes = {
  name: PropTypes.string,
  digest: PropTypes.string,
  chaininfo: PropTypes.object,
  isDigestAnchored: PropTypes.bool,
  children: PropTypes.node
};

export default ResultCard;
