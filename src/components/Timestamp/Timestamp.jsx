import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import fileDownload from "js-file-download";
import FileInput from "src/components/FileInput";
import HashConfList from "src/components/HashConfList";
import Button from "src/components/Button";
import styles from "./Timestamp.module.css";
import {ReactComponent as Tooltip} from "../../assets/icons/tooltip.svg";
import {
    handleTimestamp,
    handleVerify,
    isDigestAnchored,
    nextAnchoringDate,
    isDigestFound
} from "src/helpers/dcrtime";
import { useTranslation } from "react-i18next";

const minsToHour = () => 60 - Math.round(new Date() % 3.6e6 / 6e4);
const convertMinsToMs = (mins) => mins * 60000;

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

// const filesArrayToObj = (files) => {
//     return files.reduce((acc, cur) => {
//         return {
//             ...acc,
//             [cur.digest]: {
//                 ...cur
//             }
//         };
//     }, {});
// };

const TimestampForm = ({ history }) => {
    const { t } = useTranslation();
    const [files, setFiles] = useState([]);
    const [minsToNextHour, setMinsToNextHour] = useState(minsToHour());
    // const [startPolling, setStartPolling] = useState(false);
    const [checked, setChecked] = useState({});

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
        //const res = digestsRes.filter(d => !filesArrayToObj(files)[d.digest])
        setFiles([...files, ...digestsRes]);
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

    // useEffect(() => {
    //     let interval;
    //     // filter out digestsAnchored and digests without txs
    //     const digestsToPoll = files.filter(file => !isDigestAnchored(file)).filter(file => file.chaininformation && file.chaininformation.transaction !== "0000000000000000000000000000000000000000000000000000000000000000");
    //     const txs = digestsToPoll.map(file => file.chaininformation.transaction);
    //     let filesRes = files;
    //     if (txs.length > 0) {
    //         interval = setInterval(async () => {
    //             const txsRes = await getTxsInfo(txs);
    //             if (txsRes) {
    //                 filesRes = files.map(d => {
    //                     const found = txsRes.find(tx => {
    //                         return (tx.txid === d.chaininformation?.transaction);
    //                     });
    //                     return found ? {
    //                         ...d,
    //                         confirmations: found.confirmations
    //                     } : d;
    //                 });
    //                 setFiles(filesRes);
    //             }
    //         }, 60000);
    //     } else {
    //         clearInterval(interval);
    //     }
    //     return () => clearInterval(interval);
    // }, [startPolling, files, setFiles]);

    useEffect(() => {
        const timeout = setTimeout(async () => {
            const digestsToFetch = files.filter(file => !isDigestAnchored(file));
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
            // setStartPolling(true);
        }, convertMinsToMs(minsToHour()) + 30000);
        // }, 10000);
        return () => clearTimeout(timeout);
    }, [files, setFiles]);

    const hashesToDownload = prepareHashesDownload(files, checked);
    const amountOfHashesToDownload = hashesToDownload.length;
    const proofsToDownload = prepareProofsDownload(files, checked);
    const amountOfProofsToDownload = proofsToDownload.length;
    return (
        <div>
            <div>
                <FileInput files={files} setFiles={setFiles} handleDrop={handleDrop} text={t("fileInput.timestamp.text")} />
            </div>
            {files.length > 0 ? (<h3 className={styles.heading}>Timestamping status</h3>) : null}
            <HashConfList hashes={files} checked={checked} handleCheckboxClick={handleCheckboxClick} />
            <div className={styles.actionsSection}>
                <div className={styles.nextAnchorWrapper}>
                    <span className={styles.nextAnchor}>
                        {t("nextAnchoring")} <span className={styles.nextAnchorTime}>{minsToNextHour} {minsToNextHour < 2 ? t("minute") : t("minutes")}</span>
                        <div className={styles.tooltip}>
                            <Tooltip/>
                            <span className={styles.tooltipText}>
                                {t("nextAnchoring.tooltip", {date: nextAnchoringDate().toUTCString(), minsToHour: minsToNextHour})}
                            </span>
                        </div>
                    </span>
                </div>
                <div className={styles.actionButtonsWrapper}>
                    <Button text={amountOfHashesToDownload > 1 ? "Download Hashes" : "Download Hash"} amount={amountOfHashesToDownload} kind={amountOfHashesToDownload > 0 ? "secondary" : "disabled"} className={styles.timestampActionButton} handleClick={() => downloadHashes(hashesToDownload)} />
                    <Button text={amountOfProofsToDownload > 1 ? t("downloadProof.plural") : t("downloadProof.singular")} amount={amountOfProofsToDownload} kind={amountOfProofsToDownload > 0 ? "primary" : "disabled"} className={styles.timestampActionButton} handleClick={() => downloadArrayOfProofs(proofsToDownload)} />
                </div>
            </div>
        </div>
    );
};

export default withRouter(TimestampForm);
