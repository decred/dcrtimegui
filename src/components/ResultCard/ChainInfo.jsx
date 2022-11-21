import React from "react";
import PropTypes from "prop-types";
import styles from "./ResultCard.module.css";

const ChainInfo = ({ chainInfo }) => (
  <div className={styles.paddingBottom20}>
    <p className={styles.fontSize13}>
      Timestamp:
      <span color="gray" className={styles.fontSize13}>
        {" " + chainInfo.chaintimestamp}
      </span>
    </p>
    <p className={styles.fontSize13}>
      Merkle root:
      <span color="gray" className={styles.fontSize13}>
        {" " + chainInfo.merkleroot}
      </span>
    </p>
    <p className={styles.fontSize13}>
      Transaction:
      <span color="gray" className={styles.fontSize13}>
        {" " + chainInfo.transaction}
      </span>
    </p>
  </div>
);

ChainInfo.propTypes = {
  chainInfo: PropTypes.object
};

export default ChainInfo;
