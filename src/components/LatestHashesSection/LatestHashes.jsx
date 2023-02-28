import React, { useEffect, useState } from "react";
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
import { handleGetLastDigests } from "src/helpers/dcrtime";
import { timeago } from "src/helpers/timeago";
import { ERROR_SEARCH_INVALID } from "src/constants";
import Spinner from "src/components/Spinner";
import ErrorList from "src/components/ErrorList";
import cls from "src/helpers/cls";

const Timeago = ({timeago}) => {
    const {t} = useTranslation();
    return t(timeago.key, timeago.options);
};

const LatestHashes = ({history, fetchLast, setFetchLast}) => {
    const {theme} = useTheme();
    const isDarkTheme = theme === "dark";
    const {t} = useTranslation();
    const [searchByHash, setSearchByHash] = useState("");
    const [searchByHashError, setSearchByHashError] = useState(null);
    const [lastDigests, setLastDigests] = useState([]);
    const [digests, setDigests] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchLastDigests = async () => {
            const lastD = await handleGetLastDigests();
            setLastDigests(lastD.digests);
            setDigests(lastD.digests);
            setLoading(false);
        };
        setLoading(true);
        setTimeout(() => fetchLastDigests(), 700);
    }, []);

    useEffect(() => {
        const fetchLastDigests = async () => {
            const lastD = await handleGetLastDigests();
            setLastDigests(lastD.digests);
            setDigests(lastD.digests);
            setLoading(false);
        };
        if (fetchLast) {
            setLoading(true);
            setFetchLast(false);
            fetchLastDigests();
        }
    }, [fetchLast, setFetchLast]);

    const handleInputChange = (e) => {
        setSearchByHash(e.target.value);
        setSearchByHashError(null);
        if (e.target.value === "") {
            setDigests(lastDigests);
        }
    };

    const handleSubmitSearch = async (e) => {
        e.preventDefault();
        const param = [{digest: searchByHash}];
        try {
            const {digests} = await handleVerify(param);
            setDigests([...digests]);
        } catch (e) {
            if (e === "Invalid Digests array") {
                setSearchByHashError({key: ERROR_SEARCH_INVALID});
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
                    <form className={cls(styles.searchWrapper, searchByHashError && styles.error)} onSubmit={handleSubmitSearch}>
                        <InputText placeholder={t("searchByHash.placeholder")} className={styles.input} Icon={isDarkTheme ? SearchDark : SearchLight} onChange={handleInputChange} />
                    </form>
                </div>
                {loading ? <div className={styles.spinnerWrapper}><Spinner /></div> :
                    (
                        <>
                            {searchByHashError && (
                                <>
                                    <h3 className={styles.singleLineHeading}>Error log</h3>
                                    <ErrorList errors={[searchByHashError]} />
                                    <div className={styles.singleLineHeading}></div>
                                </>
                            )}
                            <ul className={styles.hashesList}>
                                {digests.map(h => <li key={h.digest} className={styles.hashesListItem}>
                                    <div className={styles.hashTimeWrapper} onClick={() => history.push(`/results#hashes=${h.digest}`)}>
                                        <span className={styles.timeago}><Timeago timeago={timeago(h.servertimestamp*1000)} /></span>
                                        <span className={styles.hash}>{h.digest}</span>
                                    </div>
                                    <div>
                                        <Copy text={h.digest} />
                                    </div>
                                </li>)}
                            </ul>
                        </>
                    )}
            </div>
        </div>
    );
};

export default withRouter(LatestHashes);