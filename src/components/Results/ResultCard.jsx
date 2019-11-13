import React, { useState } from "react";
import { Card, Text, StatusTag, Tooltip } from "pi-ui";
import CopyIcon from "src/assets/copy_icon.svg";
import FileIcon from "src/assets/file_icon.svg";
import DownloadIcon from "src/assets/download_icon.svg";
import { isDigestAnchored, isDigestAnchorPending } from "src/helpers/dcrtime";
import styles from "./Results.module.css";

const ResultCard = ({ digest }) => {
  const [copied, setCopied] = useState(false);

  const dataForDownload = JSON.stringify({
    name: digest.name,
    digest: digest.digest,
    transaction: digest.chaininformation.transaction,
    merkleRoot: digest.chaininformation.merkleroot,
    merklePath: digest.chaininformation.merklepath
  });

  const copyDigestToClipboard = () => {
    navigator.clipboard.writeText(digest.digest);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const renderStatusTag = () => {
    if (isDigestAnchored(digest)) {
      return <StatusTag text="Anchored" type="greenCheck" />;
    }
    if (isDigestAnchorPending(digest)) {
      return <StatusTag text="Pending" type="bluePending" />;
    }
    return <StatusTag text="Not Anchored" type="orangeNegativeCircled" />;
  };

  return (
    <Card className={styles.card}>
      <div className={styles.content}>
        {/* Name */}
        <div className={styles.resultCardHeader}>
          <img alt="file" src={FileIcon} className={styles.fileIcon} />
          <Text id={`n-${digest.name}`} truncate className={styles.headerName}>
            {digest.name}
          </Text>
          {renderStatusTag()}
        </div>

        {/* Digest */}
        <div className={styles.paddingBottom20}>
          <Text className={styles.fontSize13}>Digest</Text>
          <div className={styles.digestWrapper}>
            <Text
              id={`d-${digest.digest}`}
              truncate
              className={styles.digestText}
            >
              {digest.digest}
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

        {isDigestAnchored(digest) ? (
          <>
            {/* Chain Info */}
            <div className={styles.paddingBottom20}>
              <p className={styles.fontSize13}>
                Timestamp:
                <Text color="gray" className={styles.fontSize13}>
                  {" " + digest.chaininformation.chaintimestamp}
                </Text>
              </p>
              <p className={styles.fontSize13}>
                Merkle root:
                <Text color="gray" className={styles.fontSize13}>
                  {" " + digest.chaininformation.merkleroot}
                </Text>
              </p>
              <p className={styles.fontSize13}>
                Transaction:
                <Text color="gray" className={styles.fontSize13}>
                  {" " + digest.chaininformation.transaction}
                </Text>
              </p>
            </div>

            {/* Download Proof  */}
            <div className={styles.paddingBottom20}>
              <a
                href={`data:text/plain;charset=utf-8, ${encodeURIComponent(
                  dataForDownload
                )}`}
                download={`${digest.name}.json`}
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

export default ResultCard;
