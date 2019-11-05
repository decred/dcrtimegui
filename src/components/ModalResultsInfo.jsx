import React from "react";
import { Modal, H1, StatusTag, P, Icon } from "pi-ui";
import styles from "./components.module.css";

const ModalResultsInfo = ({ show, onClose }) => (
  <Modal show={show} contentStyle={{ padding: "1rem" }} onClose={onClose}>
    <div className={styles.container}>
      <div className={styles.iconRow}>
        <Icon type="info" size="xlg" />
      </div>
      <div>
        <H1>Files sent to dcrtime can be either</H1>
        <div className={styles.infoText}>
          <StatusTag text="Anchored" type="greenCheck" />
          <P style={{ marginTop: "5px" }}>
            The digest of the file and other files digests sent in the same hour
            range were compiled into a merkle root which is already stored in
            the chain.
          </P>
          <StatusTag text="Pending" type="bluePending" />
          <P style={{ marginTop: "5px" }}>
            The digest of the file is stored in the dcrtime server and it should
            be anchored within the next hour.
          </P>
          <StatusTag text="Not Anchored" type="orangeNegativeCircled" />
          <P style={{ marginTop: "5px" }}>
            The digest of the file is not stored in the dcrtime server.
          </P>
        </div>
      </div>
    </div>
  </Modal>
);

export default ModalResultsInfo;
