import React from "react";
import styles from "./InputText.module.css";

const InputText = ({placeholder}) => {
    return (
        <input type="text" placeholder={placeholder} className={styles.inputText} />
    );
};

export default InputText;