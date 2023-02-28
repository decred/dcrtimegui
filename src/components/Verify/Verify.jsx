import React, {useState, useEffect} from "react";
import FileInput from "src/components/FileInput";
import Button from "src/components/Button";
import styles from "./Verify.module.css";
import HashConfList from "src/components/HashConfList";
import ErrorList from "src/components/ErrorList";
import InputText from "src/components/InputText";
import { ERROR_INVALID, ERROR_DUPLICATE } from "src/constants";
import {
    handleVerify,
    filesArrayToObj,
    isDigestAnchored
} from "src/helpers/dcrtime";
import { useTranslation } from "react-i18next";
import {setLocalStorage, getLocalStorage} from "src/helpers/localstorage";
import Toast from "src/components/Toast";

const Verify = () => {
    const {t} = useTranslation();
    const [files, setFiles] = useState(getLocalStorage("verifyFiles") || []);
    const [fileInputErrors, setFileInputErrors] = useState(null);
    const [hashValue, setHashValue] = useState("");
    const [verifyManuallyError, setVerifyManuallyError] = useState(null);
    const [showToastWithMsg, setShowToastWithMsg] = useState("");
    const [fetchedFirst, setFetchedFirst] = useState(false);

    useEffect(() => {
        setLocalStorage("verifyFiles", files);
    }, [files]);

    const clearLocalStorage = () => {
        setLocalStorage("verifyFiles", []);
    };

    const clearList = () => {
        setFiles([]);
        setFileInputErrors(null);
        setVerifyManuallyError(null);
        clearLocalStorage();
    };

    const handleDrop = async (procFiles) => {
        const {digests} = await handleVerify(procFiles);
        if (digests.length === 1) {
            setShowToastWithMsg("notice.hashVerified");
        }
        if (digests.length > 1) {
            setShowToastWithMsg("notice.hashesVerified");
        }
        setFiles([...files, ...digests]);
    };

    const handleInputChange = (e) => {
        setHashValue(e.target.value);
        setVerifyManuallyError(null);
    };

    const handleVerifyManually = async (e) => {
        e.preventDefault();
        const param = [{digest: hashValue}];
        try {
            const filesObj = filesArrayToObj(files);
            const file = filesObj[hashValue];
            if (file) {
                throw Error("duplicate");
            }
            const {digests} = await handleVerify(param);
            setShowToastWithMsg("notice.hashVerified");
            setFiles([...files, ...digests]);
        } catch (e) {
            if (e === "Invalid Digests array") {
                setVerifyManuallyError({key: ERROR_INVALID});
            } else {
                setVerifyManuallyError({key: ERROR_DUPLICATE, options: {hashes: hashValue}});
            }
        }
    };

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

    return (
        <div>
            <div>
                <FileInput filesObj={filesArrayToObj(files)} error={fileInputErrors} setError={setFileInputErrors} handleDrop={handleDrop} text={t("fileInput.verify.text")} isVerify={true} />
            </div>
            <h3 className={styles.doubleLineHeading}>{t("verify.manually.title")}</h3>
            <form className={styles.manuallyForm} onSubmit={handleVerifyManually}>
                <InputText value={hashValue} error={verifyManuallyError} onChange={handleInputChange} placeholder={t("verify.manually.placeholder")} />
                <Button type="submit" kind="primary" text={t("verify.button")} className={styles.verifyByHashButton} />
            </form>
            {fileInputErrors || verifyManuallyError ? (
                <>
                    <h3 className={styles.singleLineHeading}>Error log</h3>
                    <ErrorList errors={fileInputErrors && verifyManuallyError ? [...fileInputErrors, verifyManuallyError] : verifyManuallyError && !fileInputErrors ? [verifyManuallyError] : [...fileInputErrors]} />
                </>
            ) : null}
            {files.length ? (<h3 className={styles.singleLineHeading}>{t("verify.log")}</h3>): null}
            <HashConfList hashes={files} noCheck/>
            {files.length ? (
                <div className={styles.actionButtonsWrapper}>
                    <Button text={t("clearList")} className={styles.timestampActionButton} kind="tertiary" handleClick={() => clearList()} />
                </div>
            ) : null}
            <Toast textKey={showToastWithMsg} show={showToastWithMsg} onClose={() => setShowToastWithMsg("")}/>
        </div>
    );
};

export default Verify;