import React from "react";
import { Modal, H1 } from "pi-ui";
import Icon from "src/assets/info30px.svg";
import styles from "./components.module.css";

const ModalNewDigestInfo = ({ show, onClose }) => (
  <Modal show={show} contentStyle={{ padding: "1rem" }} onClose={onClose}>
    <div className={styles.container}>
      <div className={styles.iconRow}>
        <img style={{}} src={Icon} alt="info" />
      </div>
      <div>
        <H1>Create new digest</H1>
        <div className={styles.infoText}>
          The timestamp service allows you to create a Proof-of-Existence of a
          given file. A digital signature (digest) of each file is calculated
          and sent to the Dcrtime server which hourly will calculate the merkle
          root for all digests collected in the previous 60 minutes and store
          its value in the blockchain.
          <br />
          The files you submit below will be verified against Dcrtime to find
          out if their digests are already in there or not. If the digest is not
          in Dcrtime, it will be uploaded and should be anchored within the next
          hour.
        </div>
      </div>
    </div>
  </Modal>
);

export default ModalNewDigestInfo;
