import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import FileInput from "src/components/FileInput";
import HashConfList from "src/components/HashConfList";
import Button from "src/components/Button";
import styles from "./Timestamp.module.css";

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

const minsToHour = () => 60 - Math.round(new Date() % 3.6e6 / 6e4);

const TimestampForm = ({ history }) => {
    const [files, setFiles] = useState([]);

    // const handleSubmit = () => {
    //     const digests = files
    //         .map(file => file.digest);
    //     const names = files.map(file => file.name);
    //     history.push(
    //         `results#hashes=${digests.toString()}&names=${names.toString()}&timestamp=true`
    //     );
    // };

    return (
        <div>
            <div>
                <FileInput files={files} setFiles={setFiles} text="Timestamp files by dropping them here" />
            </div>
            <h3 className={styles.heading}>Timestamping status</h3>
            <HashConfList hashes={hashesMock}/>
            <div className={styles.actionsSection}>
                <span className={styles.nextAnchorWrapper}>
                  Next anchoring in <span className={styles.nextAnchorTime}>{minsToHour()} minutes</span>
                </span>
                <div className={styles.actionButtonsWrapper}>
                    <Button text="Download Hashes" amount={2} kind="secondary" className={styles.timestampActionButton} />
                    <Button text="Download Proofs" kind="primary" className={styles.timestampActionButton} />
                </div>
            </div>
            {/* <button
                className={styles.submitButton}
                onClick={handleSubmit}
            >
              Submit
            </button> */}
        </div>
    );
};

export default withRouter(TimestampForm);
