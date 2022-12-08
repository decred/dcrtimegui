import React from "react";
import styles from "./Spinner.module.css";

const Spinner = ({ width, height }) => {
    return (
        <div
            className={styles.spinner}
            style={{ width, height }}
        />
    );
};

export default Spinner;