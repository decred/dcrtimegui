import React from "react";
import styles from "./LatestHashes.module.css";

const hashesMock = [
    {
        hash: "860ae0e32bdd396f5616eef7e328cbd65ee0f5ddddc30b2476564329db2d257a",
        timeago: "11 min"
    },
    {
        hash: "860ae0e32bdd396f5616eef7e328cbd65ee0f5ddddc30b2476564329db2d257a",
        timeago: "11 min"
    },
    {
        hash: "860ae0e32bdd396f5616eef7e328cbd65ee0f5ddddc30b2476564329db2d257a",
        timeago: "11 min"
    },
    {
        hash: "860ae0e32bdd396f5616eef7e328cbd65ee0f5ddddc30b2476564329db2d257a",
        timeago: "111 min"
    },
    {
        hash: "860ae0e32bdd396f5616eef7e328cbd65ee0f5ddddc30b2476564329db2d257a",
        timeago: "11 min"
    }
];

const LatestHashes = () => {
    return (
        <div className={styles.latestHashes}>
            <div className={styles.content}>
                <h2 className={styles.heading}>
                    Latest Hashes
                </h2>
                <ul className={styles.hashesList}>
                    {hashesMock.map(h => <li className={styles.hashesListItem}>
                        <span className={styles.timeago}>{h.timeago}</span>
                        <span className={styles.hash}>{h.hash}</span>
                    </li>)}
                </ul>
            </div>
        </div>
    );
};

export default LatestHashes;