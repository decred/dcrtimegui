import React from "react";
import PropTypes from "prop-types";
import { Text } from "pi-ui";
import DownloadIcon from "src/assets/download_icon.svg";
import fileDownload from "js-file-download";
import styles from "./ResultCard.module.css";

const DownloadProof = ({ data }) => {
  const handleDownload = () =>
    fileDownload(JSON.stringify(data, null, 2), `${data?.digest}.json`);

  return (
    <div className={styles.paddingBottom20}>
      <span className={styles.downloadWrapper} onClick={handleDownload}>
        <img
          alt="download"
          src={DownloadIcon}
          className={styles.downloadIcon}
        />
        <Text color="primary" className={styles.fontSize13}>
          Download Proof (json)
        </Text>
      </span>
    </div>
  );
};

DownloadProof.propTypes = {
  data: PropTypes.object,
  name: PropTypes.string
};

export default DownloadProof;
