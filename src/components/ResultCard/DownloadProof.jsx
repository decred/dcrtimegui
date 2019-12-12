import React from "react";
import PropTypes from "prop-types";
import { Text } from "pi-ui";
import DownloadIcon from "src/assets/download_icon.svg";
import styles from "./ResultCard.module.css";

const DownloadProof = ({ data, name }) => (
  <div className={styles.paddingBottom20}>
    <a
      href={`data:text/plain;charset=utf-8, ${encodeURIComponent(data)}`}
      download={`${name}.json`}
      className={styles.downloadWrapper}
    >
      <img alt="download" src={DownloadIcon} className={styles.downloadIcon} />
      <Text color="primary" className={styles.fontSize13}>
        Download Proof (json)
      </Text>
    </a>
  </div>
);

DownloadProof.propTypes = {
  data: PropTypes.object,
  name: PropTypes.string
};

export default DownloadProof;
