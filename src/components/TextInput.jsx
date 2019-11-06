import React from "react";
import styles from "./components.module.css";

const TextInput = ({ type, placeholder, id, error, ...props }) => (
  <div className={styles.textInputWrapper}>
    <input
      id={id}
      placeholder={placeholder}
      className={styles.textInput}
      type="text"
      {...props}
    />
  </div>
);

export default TextInput;
