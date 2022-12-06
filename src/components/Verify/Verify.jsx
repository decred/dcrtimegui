import React, {useState} from "react";
import FileInput from "src/components/FileInput";
import Button from "src/components/Button";
import styles from "./Verify.module.css";
import HashConfList from "src/components/HashConfList";
import InputText from "src/components/InputText";
import {
    handleVerify
} from "src/helpers/dcrtime";

const Verify = () => {
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
                <FileInput files={files} setFiles={setFiles} text="Verify by dropping proof or original file here" handleDrop={handleDrop} />
            </div>
            <h3 className={styles.doubleLineHeading}>Or manually</h3>
            <form className={styles.manuallyForm} onSubmit={handleVerifyManually}>
                <InputText value={hashValue} error={error} onChange={handleInputChange} placeholder="Type or paste here a 32-byte hash" />
                <Button type="submit" kind="primary" text="Verify by Hash" className={styles.verifyByHashButton} />
            </form>
            {files.length ? (<h3 className={styles.singleLineHeading}>Verify log</h3>): null}
            <HashConfList hashes={files} noCheck/>
        </div>
    );
};

export default Verify;