import React from "react";
import styles from "./HashConfList.module.css";

const HashConfList = ({hashes}) => {
    return (
        <ul className={styles.hashConfList}>
            {hashes.map(h => <li className={styles.hashConfListItem}>{h.hash}</li>)}
        </ul>
    );
};

export default HashConfList;