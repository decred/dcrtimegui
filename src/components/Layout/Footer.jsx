import React from "react";
import styles from "./Footer.module.css";

const Footer = () => (
  <div className={styles.footer}>
    <div className={styles.textWrapper}>
      <span>Decred developers | 2016 - {new Date().getFullYear()}</span>
      <span>
        The source code is available at{" "}
        <a
          href="https://github.com/decred/dcrtimegui"
          className={styles.ghLink}
        >
          GitHub
        </a>
      </span>
    </div>
  </div>
);

export default Footer;
