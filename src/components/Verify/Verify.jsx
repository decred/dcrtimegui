import React, {useState} from "react";
import FileInput from "src/components/FileInput";
import Button from "src/components/Button";
import styles from "./Verify.module.css";
import HashConfList from "src/components/HashConfList";
import InputText from "src/components/InputText";

const hashesMock = [
    {
        hash: "860ae0e32bdd396f5616eef7e328cbd65ee0f5ddddc30b2476564329db2d257a",
        confirmations: 1,
        minConfirmations: 6
    },
    {
        hash: "860ae0e32bdd396f5616eef7e328cbd65ee0f5ddddc30b2476564329db2d257a",
        confirmations: 1,
        minConfirmations: 6
    },
    {
        hash: "860ae0e32bdd396f5616eef7e328cbd65ee0f5ddddc30b2476564329db2d257a",
        confirmations: 1,
        minConfirmations: 6
    },
    {
        hash: "860ae0e32bdd396f5616eef7e328cbd65ee0f5ddddc30b2476564329db2d257a",
        confirmations: 1,
        minConfirmations: 6
    },
    {
        hash: "860ae0e32bdd396f5616eef7e328cbd65ee0f5ddddc30b2476564329db2d257a",
        confirmations: 1,
        minConfirmations: 6
    },
    {
        hash: "860ae0e32bdd396f5616eef7e328cbd65ee0f5ddddc30b2476564329db2d257a",
        confirmations: 1,
        minConfirmations: 6
    }
];

const Verify = () => {
    const [files, setFiles] = useState([]);
    return (
        <div>
            <div>
                <FileInput files={files} setFiles={setFiles} text="Verify by dropping proof or original file here" />
            </div>
            <h3 className={styles.doubleLineHeading}>Or manually</h3>
            <form className={styles.manuallyForm}>
                <InputText placeholder="Type or paste here a 32-byte hash" />
                <Button type="submit" kind="primary" text="Verify by Hash" className={styles.verifyByHashButton} />
            </form>
            <h3 className={styles.singleLineHeading}>Verify log</h3>
            <HashConfList hashes={hashesMock}/>
        </div>
    );
};

export default Verify;