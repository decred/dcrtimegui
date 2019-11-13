import React, { useState } from "react";
import { H1, Button, Icon } from "pi-ui";
import styles from "./Title.module.css";

const Title = ({ title, modal }) => {
  const Modal = modal;
  const [show, setShow] = useState(false);
  return (
    <div className={styles.title}>
      <H1>{title}</H1>
      <Button
        className={styles.iconButton}
        onClick={() => setShow(true)}
        kind="secondary"
        size="sm"
        icon
      >
        <Icon type="info" size="lg" />
      </Button>
      <Modal show={show} onClose={() => setShow(false)} />
    </div>
  );
};

export default Title;
