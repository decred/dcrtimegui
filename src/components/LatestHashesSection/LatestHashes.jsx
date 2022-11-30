import React from "react";
import styles from "./LatestHashes.module.css";
import InputText from "src/components/InputText";
import {ReactComponent as SearchLight} from "../../assets/icons/hash-search-light.svg";
import {ReactComponent as SearchDark} from "../../assets/icons/hash-search-dark.svg";
import useTheme from "src/theme/useTheme";

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
    const {theme} = useTheme();
    const isDarkTheme = theme === "dark";
    return (
        <div className={styles.latestHashes}>
            <div className={styles.content}>
                <div className={styles.title}>
                    <h2 className={styles.heading}>
                        Latest Hashes
                    </h2>
                    <div>
                        <InputText placeholder="Search by hash" className={styles.input} Icon={isDarkTheme ? SearchDark : SearchLight}/>
                    </div>
                </div>
                <ul className={styles.hashesList}>
                    {hashesMock.map(h => <li key={h.hash} className={styles.hashesListItem}>
                        <span className={styles.timeago}>{h.timeago}</span>
                        <span className={styles.hash}>{h.hash}</span>
                    </li>)}
                </ul>
            </div>
        </div>
    );
};

export default LatestHashes;