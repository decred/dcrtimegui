import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import FileInput from "src/components/FileInput";
import styles from "./Timestamp.module.css";

const TimestampForm = ({ history }) => {
    const [files, setFiles] = useState([]);

    const handleSubmit = () => {
        const digests = files
            .map(file => file.digest);
        const names = files.map(file => file.name);
        history.push(
            `results#hashes=${digests.toString()}&names=${names.toString()}&timestamp=true`
        );
    };

    return (
        <>
            <div>
                <div className={styles.content}>
                    <FileInput files={files} setFiles={setFiles} />
                </div>
                <button
                    className={styles.submitButton}
                    onClick={handleSubmit}
                >
                  Submit
                </button>
            </div>
        </>
    );
};

export default withRouter(TimestampForm);
