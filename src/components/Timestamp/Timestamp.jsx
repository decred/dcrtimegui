import React, { useState, useEffect, useCallback } from "react";
import { withRouter } from "react-router-dom";
import Tooltip from "src/components/Tooltip";
import fileDownload from "js-file-download";
import FileInput from "src/components/FileInput";
import HashConfList from "src/components/HashConfList";
import ErrorList from "src/components/ErrorList";
import Button from "src/components/Button";
import styles from "./Timestamp.module.css";
import {ReactComponent as TooltipIcon} from "../../assets/icons/tooltip.svg";
import {
    handleTimestamp,
    handleVerify,
    isDigestAnchored,
    nextAnchoringDate,
    isDigestFound,
    filesArrayToObj
} from "src/helpers/dcrtime";
import debounce from "src/helpers/debounce";
import { useTranslation } from "react-i18next";
import {setLocalStorage, getLocalStorage} from "src/helpers/localstorage";
import Toast from "src/components/Toast";

const minsToHour = () => 60 - Math.round(new Date() % 3.6e6 / 6e4);

const prepareHashesDownload = (files, checked) => {
    return files.filter(file => checked[file.digest]).map(file => file.digest);
};

const prepareProofsDownload = (files, checked) => {
    return files.filter(file => checked[file.digest]).filter(isDigestAnchored).map(file => ({digest: file.digest, ...file.chaininformation}));
};

const downloadArrayOfProofs = (proofs) => {
    for (const proof of proofs) {
        fileDownload(JSON.stringify(proof, null, 2), `${proof?.digest}.json`);
    }
};

const downloadHashes = (hashes) => {
    fileDownload(JSON.stringify(hashes, null, 2), "hashes.json");
};

const TimestampForm = ({handleFetchLast}) => {
    const { t } = useTranslation();
    const [files, setFiles] = useState(getLocalStorage("timestampFiles") || []);
    const [fileInputErrors, setFileInputErrors] = useState(null);
    const [minsToNextHour, setMinsToNextHour] = useState(minsToHour());
    const [fetchedFirst, setFetchedFirst] = useState(false);
    const [checked, setChecked] = useState(getLocalStorage("timestampChecked") || {});
    const [showToastWithMsg, setShowToastWithMsg] = useState("");

    useEffect(() => {
        setLocalStorage("timestampFiles", files);
    }, [files]);

    useEffect(() => {
        setLocalStorage("timestampChecked", checked);
    }, [checked]);

    const clearLocalStorage = () => {
        setLocalStorage("timestampFiles", []);
        setLocalStorage("timestampChecked", {});
    };

    const clearList = () => {
        setFiles([]);
        setFileInputErrors(null);
        setChecked({});
        clearLocalStorage();
    };

    const handleDrop = async (procFiles) => {
        const {digests} = await handleTimestamp(procFiles);
        const digestsInServer = digests.filter(isDigestFound);
        // fetch verify of digests already in server
        let verifyRes;
        if (digestsInServer?.length > 0) {
            verifyRes = await handleVerify(digestsInServer);
        }
        let digestsRes = digests;
        if (verifyRes) {
            digestsRes = digests.map(d => {
                const found = verifyRes.digests.find(v => {
                    return (v.digest === d.digest);
                });
                return found ? found : d;
            });
        }
        setFiles([...files, ...digestsRes]);
        if (digestsRes.length === 1) {
            setShowToastWithMsg("notice.hashGenerated");
        }
        if (digestsRes.length > 1) {
            setShowToastWithMsg("notice.hashesGenerated");
        }
        if (digestsRes.length > 0) {
            handleFetchLast();
        }
        const checkNew = digestsRes.reduce((acc, cur) => {
            return ({
                ...acc,
                [cur.digest]: true
            });
        }, {});
        setChecked({
            ...checked,
            ...checkNew
        });
    };

    const handleCheckboxClick = (hash) => () => {
        setChecked({
            ...checked,
            [hash]: !checked?.[hash]
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setMinsToNextHour(minsToHour());
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetch = async () => {
            const digestsToFetch = files.filter(file => !isDigestAnchored(file));
            if (digestsToFetch.length > 0) {
                const verifyRes = await handleVerify(digestsToFetch);
                let filesRes = files;
                if (verifyRes) {
                    filesRes = files.map(d => {
                        const found = verifyRes.digests.find(v => {
                            return (v.digest === d.digest);
                        });
                        return found ? found : d;
                    });
                }
                setFiles(filesRes);
            }
        };
        if (!fetchedFirst) {
            fetch();
            setFetchedFirst(true);
        }
        const timeout = setTimeout(async () => {
            await fetch();
        }, 60000);
        return () => clearTimeout(timeout);
    }, [fetchedFirst, files, setFiles]);

    const hashesToDownload = prepareHashesDownload(files, checked);
    const amountOfHashesToDownload = hashesToDownload.length;
    const proofsToDownload = prepareProofsDownload(files, checked);
    const amountOfProofsToDownload = proofsToDownload.length;

    const debouncedHandleDownloadHashes = useCallback(debounce(() => downloadHashes(hashesToDownload)), []);
    const debouncedHandleDownloadProofs = useCallback(debounce(() => downloadArrayOfProofs(proofsToDownload)), []);

    return (
        <div>
            <div>
                <FileInput filesObj={filesArrayToObj(files)} error={fileInputErrors} setError={setFileInputErrors} handleDrop={handleDrop} text={t("fileInput.timestamp.text")} />
            </div>
            {fileInputErrors ? (
                <>
                    <h3 className={styles.singleLineHeading}>Error log</h3>
                    <ErrorList errors={[...fileInputErrors]} />
                </>
            ) : null}
            {files.length > 0 ? (
                <>
                    <h3 className={styles.singleLineHeading}>Timestamping status</h3>
                    <HashConfList hashes={files} checked={checked} handleCheckboxClick={handleCheckboxClick} />
                </>
            ) : null}
            <div className={styles.actionsSection}>
                <div className={styles.nextAnchorWrapper}>
                    <span className={styles.nextAnchor}>
                        {t("nextAnchoring")} <span className={styles.nextAnchorTime}>{minsToNextHour} {minsToNextHour < 2 ? t("minute") : t("minutes")}</span>
                        <Tooltip tooltipTrigger={<TooltipIcon/>} tooltipText={t("nextAnchoring.tooltip", {date: nextAnchoringDate().toUTCString(), minsToHour: minsToNextHour})} tooltipHover withHoverStyle />
                    </span>
                </div>
                <div className={styles.actionButtonsWrapper}>
                    {files.length ? (
                        <Button text={t("clearList")} className={styles.timestampActionButton} kind="tertiary" handleClick={() => clearList()} />
                    ) : null}
                    <Button text={amountOfHashesToDownload > 1 ? "Download Hashes" : "Download Hash"} amount={amountOfHashesToDownload} kind={amountOfHashesToDownload > 0 ? "secondary" : "disabled"} className={styles.timestampActionButton} handleClick={debouncedHandleDownloadHashes} />
                    <Button text={amountOfProofsToDownload > 1 ? t("downloadProof.plural") : t("downloadProof.singular")} amount={amountOfProofsToDownload} kind={amountOfProofsToDownload > 0 ? "primary" : "disabled"} className={styles.timestampActionButton} handleClick={debouncedHandleDownloadProofs} />
                </div>
            </div>
            <Toast textKey={showToastWithMsg} show={showToastWithMsg} onClose={() => setShowToastWithMsg("")}/>
        </div>
    );
};

export default withRouter(TimestampForm);
