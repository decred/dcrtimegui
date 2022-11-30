import React from "react";
import PropTypes from "prop-types";
import styles from "./ResultCard.module.css";

const ChainInfo = ({ chainInfo }) => (
    <table className={styles.chainInfoTable}>
        <tr className={styles.chainInfoLine}>
            <td>Timestamp:</td>
            <td className={styles.chainInfo}>
                {chainInfo.chaintimestamp}
            </td>
        </tr>
        <tr className={styles.chainInfoLine}>
            <td>Merkle root:</td>
            <td className={styles.chainInfo}>
                {chainInfo.merkleroot}
            </td>
        </tr>
        <tr className={styles.chainInfoLine}>
            <td>Transaction:</td>
            <td className={styles.chainInfo}>
                {chainInfo.transaction}
            </td>
        </tr>
        {/* <tr className={styles.chainInfoLine}>
            <td>Transactioneeeeeeeeeeeeeeee:</td>
            <td className={styles.chainInfo}>
                {chainInfo.transaction}
            </td>
        </tr> */}
    </table>
);

ChainInfo.propTypes = {
    chainInfo: PropTypes.object
};

export default ChainInfo;
