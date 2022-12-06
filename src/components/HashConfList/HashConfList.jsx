import React from "react";
import styles from "./HashConfList.module.css";
import Copy from "src/components/Copy";
import Checkbox from "src/components/Checkbox";
import { withRouter } from "react-router-dom";
import { isDigestAnchored } from "src/helpers/dcrtime";

const getProgressClass = (digest) => {
    if (isDigestAnchored(digest)) {
        return styles.hashWrapper6;
    }
    switch(digest.confirmations) {
    case 1:
        return styles.hashWrapper1;
    case 2:
        return styles.hashWrapper2;
    case 3:
        return styles.hashWrapper3;
    case 4:
        return styles.hashWrapper4;
    case 5:
        return styles.hashWrapper5;
    default:
        return styles.hashWrapper0;
    }
};

const HashConfList = ({hashes, handleCheckboxClick, checked, history, noCheck}) => {
    return (
        <ul className={styles.hashConfList}>
            {hashes.map(h => <li key={h.digest} className={styles.hashConfListItem}>
                <button className={getProgressClass(h)} onClick={() => history.push(`/results#hashes=${h.digest}`)}>
                    {h.digest}
                </button>
                <span className={styles.iconsWrapper}>
                    <Copy text={h.digest} />
                    {noCheck ? null : (
                        <Checkbox checked={checked[h.digest]} handleClick={handleCheckboxClick(h.digest)} />
                    )}
                </span>
            </li>)}
        </ul>
    );
};

export default withRouter(HashConfList);