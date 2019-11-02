import React, { useState } from "react";
import { H1, Button } from "pi-ui";
import styles from "./pages.module.css";
import Icon from "src/assets/info20px.svg";

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
        <img src={Icon} alt="info" />
      </Button>
      <Modal show={show} onClose={() => setShow(false)} />
    </div>
  );
};

export default Title;
