import React from "react";
import styles from "./LatestHashes.module.css";
import InputText from "src/components/InputText";
import Copy from "src/components/Copy";
import {ReactComponent as SearchLight} from "../../assets/icons/hash-search-light.svg";
import {ReactComponent as SearchDark} from "../../assets/icons/hash-search-dark.svg";
import useTheme from "src/theme/useTheme";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";

const hashesMock = [
    {
        hash: "860ae0e32bdd396f5616eef7e328cbd65ee0f5ddddc30b2476564329db2d257a",
        timeago: "11 min"
    },
    {
        hash: "860ae0e32bdd396f5616eef7e328cbd65ee0f5ddddc30b2476564329db2d257c",
        timeago: "11 min"
    },
    {
        hash: "860ae0e32bdd396f5616eef7e328cbd65ee0f5ddddc30b2476564329db2d257b",
        timeago: "11 min"
    },
    {
        hash: "860ae0e32bdd396f5616eef7e328cbd65ee0f5ddddc30b2476564329db2d257d",
        timeago: "111 min"
    },
    {
        hash: "860ae0e32bdd396f5616eef7e328cbd65ee0f5ddddc30b2476564329db2d257e",
        timeago: "11 min"
    }
];

const LatestHashes = ({history}) => {
    const {theme} = useTheme();
    const isDarkTheme = theme === "dark";
    const {t} = useTranslation();
    return (
        <div className={styles.latestHashes}>
            <div className={styles.content}>
                <div className={styles.title}>
                    <h2 className={styles.heading}>
                        {t("latestHashes.title")}
                    </h2>
                    <div className={styles.searchWrapper}>
                        <InputText placeholder={t("searchByHash.placeholder")} className={styles.input} Icon={isDarkTheme ? SearchDark : SearchLight}/>
                    </div>
                </div>
                <ul className={styles.hashesList}>
                    {hashesMock.map(h => <li key={h.hash} className={styles.hashesListItem}>
                        <div className={styles.hashTimeWrapper} onClick={() => history.push(`/results#hashes=${h.hash}`)}>
                            <span className={styles.timeago}>{h.timeago}</span>
                            <span className={styles.hash}>{h.hash}</span>
                        </div>
                        <Copy text={h.hash} />
                    </li>)}
                </ul>
            </div>
        </div>
    );
};

export default withRouter(LatestHashes);