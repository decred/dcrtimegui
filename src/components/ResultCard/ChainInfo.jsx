import React from "react";
import PropTypes from "prop-types";
import { Text } from "pi-ui";
import styles from "./ResultCard.module.css";

const ChainInfo = ({ chainInfo }) => (
  <div className={styles.paddingBottom20}>
    <p className={styles.fontSize13}>
      Timestamp:
      <Text color="gray" className={styles.fontSize13}>
        {" " + chainInfo.chaintimestamp}
      </Text>
    </p>
    <p className={styles.fontSize13}>
      Merkle root:
      <Text color="gray" className={styles.fontSize13}>
        {" " + chainInfo.merkleroot}
      </Text>
    </p>
    <p className={styles.fontSize13}>
      Transaction:
      <Text color="gray" className={styles.fontSize13}>
        {" " + chainInfo.transaction}
      </Text>
    </p>
  </div>
);

ChainInfo.propTypes = {
  chainInfo: PropTypes.object
};

export default ChainInfo;
