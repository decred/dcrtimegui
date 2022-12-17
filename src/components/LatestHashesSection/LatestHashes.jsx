import React, { useState } from "react";
import styles from "./LatestHashes.module.css";
import InputText from "src/components/InputText";
import Copy from "src/components/Copy";
import {ReactComponent as SearchLight} from "../../assets/icons/hash-search-light.svg";
import {ReactComponent as SearchDark} from "../../assets/icons/hash-search-dark.svg";
import useTheme from "src/theme/useTheme";
import {
    handleVerify
} from "src/helpers/dcrtime";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";

const hashesMock = [
    {
        digest: "860ae0e32bdd396f5616eef7e328cbd65ee0f5ddddc30b2476564329db2d257a",
        timeago: "11 min"
    },
    {
        digest: "860ae0e32bdd396f5616eef7e328cbd65ee0f5ddddc30b2476564329db2d257c",
        timeago: "11 min"
    },
    {
        digest: "860ae0e32bdd396f5616eef7e328cbd65ee0f5ddddc30b2476564329db2d257b",
        timeago: "11 min"
    },
    {
        digest: "860ae0e32bdd396f5616eef7e328cbd65ee0f5ddddc30b2476564329db2d257d",
        timeago: "111 min"
    },
    {
        digest: "860ae0e32bdd396f5616eef7e328cbd65ee0f5ddddc30b2476564329db2d257e",
        timeago: "11 min"
    }
];

const LatestHashes = ({history}) => {
    const {theme} = useTheme();
    const isDarkTheme = theme === "dark";
    const {t} = useTranslation();
    const [searchByHash, setSearchByHash] = useState("");
    const [searchByHashError, setSearchByHashError] = useState(null);
    const [hashes, setHashes] = useState(hashesMock);

    const handleInputChange = (e) => {
        setSearchByHash(e.target.value);
        setSearchByHashError(null);
    };

    const filesArrayToObj = (files) => {
        return files.reduce((acc, cur) => {
            return {
                ...acc,
                [cur.digest]: {
                    ...cur
                }
            };
        }, {});
    };

    const handleSubmitSearch = async (e) => {
        e.preventDefault();
        const param = [{digest: searchByHash}];
        try {
            const {digests} = await handleVerify(param);
            setHashes([...digests]);
        } catch (e) {
            if (e === "Invalid Digests array") {
                setSearchByHashError(Error(t("error.invalid")));
            }
        }
    };

    return (
        <div className={styles.latestHashes}>
            <div className={styles.content}>
                <div className={styles.title}>
                    <h2 className={styles.heading}>
                        {t("latestHashes.title")}
                    </h2>
                    <form className={styles.searchWrapper} onSubmit={handleSubmitSearch}>
                        <InputText placeholder={t("searchByHash.placeholder")} className={styles.input} Icon={isDarkTheme ? SearchDark : SearchLight} onChange={handleInputChange} />
                    </form>
                </div>
                <ul className={styles.hashesList}>
                    {hashes.map(h => <li key={h.digest} className={styles.hashesListItem}>
                        <div className={styles.hashTimeWrapper} onClick={() => history.push(`/results#hashes=${h.digest}`)}>
                            <span className={styles.timeago}>{h.timeago}</span>
                            <span className={styles.hash}>{h.digest}</span>
                        </div>
                        <div>
                            <Copy text={h.digest} />
                        </div>
                    </li>)}
                </ul>
            </div>
        </div>
    );
};

export default withRouter(LatestHashes);