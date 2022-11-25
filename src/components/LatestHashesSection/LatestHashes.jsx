import React from "react";
import styles from "./LatestHashes.module.css";

const LatestHashes = ({children}) => {
    return (
        <div className={styles.latestHashes}>
            {children}
        </div>
    );
};

export default LatestHashes;