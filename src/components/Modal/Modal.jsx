import React from "react";
import PropTypes from "prop-types";
import { Modal as ModalPi, H1, Icon } from "pi-ui";
import styles from "./Modal.module.css";

const Modal = ({ title, content, show, onClose }) => (
  <ModalPi show={show} contentStyle={{ padding: "1rem" }} onClose={onClose}>
    <div className={styles.modalContainer}>
      <div className={styles.modalIconRow}>
        <Icon type="info" size="xlg" />
      </div>
      <div>
        <H1>{title}</H1>
        <div className={styles.modalContent}>{content}</div>
      </div>
    </div>
  </ModalPi>
);

Modal.propTypes = {
  title: PropTypes.string,
  content: PropTypes.node,
  show: PropTypes.bool,
  onClose: PropTypes.func
};

export default Modal;
