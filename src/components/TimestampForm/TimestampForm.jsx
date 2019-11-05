import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Card, Button, classNames } from "pi-ui";
import FileInput from "./FileInput";
import HashInput from "./HashInput";
import styles from "./timestampform.module.css";

const TimestampForm = ({ history }) => {
  const [files, setFiles] = useState([]);
  const [activeTab, setActiveTab] = useState(HashTab);
  const hasFiles = files && files.length;

  const handleSubmit = e => {
    e.preventDefault();
    const digests = files.map(file => file.digest);
    const names = files.map(file => file.name);
    history.push(
      `results?digests=${digests.toString()}&names=${names.toString()}&timestamp=true`
    );
  };

  return (
    <>
      <Tabs active={activeTab} set={setActiveTab} />
      <Card className={styles.card}>
        <form
          className={styles.formWrapper}
          style={hasFiles ? { paddingTop: "30px" } : { paddingTop: "5px" }}
        >
          {activeTab === FileTab ? (
            <FileInput files={files} setFiles={setFiles} />
          ) : (
            <HashInput />
          )}
        </form>
      </Card>
      <div className={styles.submitButtonWrapper}>
        <Button
          kind={hasFiles ? "primary" : "disabled"}
          className={styles.submitButton}
          onSubmit={handleSubmit}
          type="submit"
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
