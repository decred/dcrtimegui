import React from "react";
import PropTypes from "prop-types";
import styles from "./ResultCard.module.css";
import { DCRDATA_URL } from "src/constants";

const ChainInfo = ({ chainInfo }) => {
    const date = new Date(chainInfo.chaintimestamp).toUTCString();
    return (
        <table className={styles.chainInfoTable}>
            <tbody>
                <tr className={styles.chainInfoLine}>
                    <td>Timestamp:</td>
                    <td className={styles.chainInfo}>
                        {chainInfo.chaintimestamp} ({date})
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
                        <a className={styles.chainInfoLink} href={`${DCRDATA_URL}/tx/${chainInfo.transaction}`} target="_blank" rel="noopener noreferrer" aria-label="Open transaction info on dcrdata">{chainInfo.transaction}</a>
                    </td>
                </tr>
            </tbody>
        </table>
    );};

ChainInfo.propTypes = {
    chainInfo: PropTypes.object
};

export default ChainInfo;
