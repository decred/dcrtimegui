import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Card, Button, classNames } from "pi-ui";
import Expandable from "./Expandable";
import FileInput from "./FileInput";

import styles from "./components.module.css";

const TimestampForm = ({ history }) => {
  const [files, setFiles] = useState([]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const handleSubmit = e => {
    e.preventDefault();
    const digests = files.map(file => file.digest);
    const names = files.map(file => file.name);
    history.push(
      `results?digests=${digests.toString()}&names=${names.toString()}&timestamp=true`
    );
  };
  const handleExpandDetails = () => {
    setDetailsOpen(!detailsOpen);
  };
  return (
    <Card>
      <form className={styles.tmpForm}>
        <p className={styles.description}>
          This free service uses the Decred blockchain to time-anchor arbitrary
          files, which demonstrates a particular file existed at or before the
          time it was anchored. A hash of each submitted file is calculated and
          sent to a dcrtime server, which aggregates these hashes, organizes
          them into a merkle tree, hashes that tree down to a merkle root, and
          anchors that merkle root in the Decred blockchain once an hour.
        </p>
        <Expandable
          className={styles.tmpFormExpandable}
          expanded={detailsOpen}
          triggerComponent={
            <span
              className={styles.technicalDetailsButton}
              onClick={handleExpandDetails}
            >
              {detailsOpen ? "Hide" : "Show"} Technical Details{" "}
            </span>
          }
        >
          <p className={classNames(styles.description, styles.padded)}>
            This service, dcrtime and Decred use the sha256 hash function.
            Submitted files have their hashes checked against
            previously-submitted files, and if the file hash has already been
            submitted, you will see information about that file. The state of
            each anchored file can be either “Pending”, indicating the file hash
            has been submitted to dcrtime and is waiting to be anchored, or
            “Anchored”, indicating the file hash has been anchored in the Decred
            blockchain, or "Not anchored", indicating the file hash has not been
            submitted to dcrtime yet. Anchored hashes have a corresponding
            inclusion proof, which is a merkle path from the file hash to the
            anchored merkle root, and this proof can be downloaded and
            independently verified using a copy of the Decred blockchain or a
            blockchain explorer.
          </p>
        </Expandable>
        <FileInput files={files} setFiles={setFiles} />
        {files && files.length ? (
          <div class={styles.submitWrapper}>
            <Button onClick={handleSubmit} type="submit">
              Timestamp files
            </Button>
          </div>
        ) : null}
      </form>
    </Card>
  );
};

export default withRouter(TimestampForm);
