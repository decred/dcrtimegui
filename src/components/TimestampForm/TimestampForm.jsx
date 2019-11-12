import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Card, Button, classNames } from "pi-ui";
import FileInput from "./FileInput";
import HashInput from "./HashInput";
import styles from "./timestampform.module.css";

const TimestampForm = ({ history }) => {
  const [files, setFiles] = useState([]);
  const [hashes, setHashes] = useState([]);
  const [activeTab, setActiveTab] = useState(FileTab);
  const hasFiles = files && files.length;
  const hasHashes = hashes && hashes.length > 0 && hashes[0].digest !== "";

  const handleSubmit = () => {
    const hs = hashes.filter(h => h.digest !== "");
    const digests = files
      .map(file => file.digest)
      .concat(hs.map(hash => hash.digest));
    const names = files.map(file => file.name);
    history.push(
      `results?digests=${digests.toString()}&names=${names.toString()}&timestamp=true`
    );
  };

  return (
    <>
      <Tabs active={activeTab} set={setActiveTab} />
      <Card className={styles.card}>
        <div className={styles.content}>
          {activeTab === FileTab ? (
            <FileInput files={files} setFiles={setFiles} />
          ) : (
            <HashInput hashes={hashes} setHashes={setHashes} />
          )}
        </div>
      </Card>
      <div className={styles.submitButtonWrapper}>
        <Button
          type="button"
          kind={hasFiles || hasHashes ? "primary" : "disabled"}
          className={styles.submitButton}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </>
  );
};

const FileTab = 0;
const HashTab = 1;

const Tabs = ({ active, set }) => {
  return (
    <div className={styles.tabs}>
      <div
        className={classNames(
          styles.tabFiles,
          active === FileTab
            ? styles.tabBackgroundWhite
            : styles.tabBackgroundGrey
        )}
        onClick={() => set(FileTab)}
      >
        Upload file
      </div>
      <div
        className={classNames(
          styles.tabHash,
          active === HashTab
            ? styles.tabBackgroundWhite
            : styles.tabBackgroundGrey
        )}
        onClick={() => set(HashTab)}
      >
        Input hash
      </div>
    </div>
  );
};

export default withRouter(TimestampForm);
