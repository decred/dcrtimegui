import React, {useState} from "react";
import FileInput from "src/components/FileInput";
import Button from "src/components/Button";
import styles from "./Verify.module.css";
import HashConfList from "src/components/HashConfList";
import InputText from "src/components/InputText";
import {
    handleVerify
} from "src/helpers/dcrtime";
import { useTranslation } from "react-i18next";

const Verify = () => {
    const {t} = useTranslation();
    const [files, setFiles] = useState([]);
    const [hashValue, setHashValue] = useState("");
    const [error, setError] = useState(null);

    const handleDrop = async (procFiles) => {
        const {digests} = await handleVerify(procFiles);
        setFiles([...files, ...digests]);
    };

    const handleInputChange = (e) => {
        setHashValue(e.target.value);
        setError(null);
    };

    const handleVerifyManually = async (e) => {
        e.preventDefault();
        const param = [{digest: hashValue}];
        try {
            const {digests} = await handleVerify(param);
            setFiles([...files, ...digests]);
        } catch (e) {
            setError(e);
        }
    };

    return (
        <div>
            <div>
                <FileInput files={files} setFiles={setFiles} text={t("fileInput.verify.text")} handleDrop={handleDrop} />
            </div>
            <h3 className={styles.doubleLineHeading}>{t("verify.manually.title")}</h3>
            <form className={styles.manuallyForm} onSubmit={handleVerifyManually}>
                <InputText value={hashValue} error={error} onChange={handleInputChange} placeholder={t("verify.manually.placeholder")} />
                <Button type="submit" kind="primary" text={t("verify.button")} className={styles.verifyByHashButton} />
            </form>
            {files.length ? (<h3 className={styles.singleLineHeading}>{t("verify.log")}</h3>): null}
            <HashConfList hashes={files} noCheck/>
        </div>
    );
};

export default Verify;