import React from "react";
import HashIcon from "src/assets/hash_icon.svg";
import DeleteIcon from "src/assets/delete_icon.svg";
import styles from "./HashInputLine.module.css";

const HashInputLine = ({ value, onChange, onRemove }) => (
  <div className={styles.hashInputLine}>
    <img alt="hash" src={HashIcon} className={styles.hashIcon} />
    <div className={styles.textInputWrapper}>
      <input
        type="text"
        value={value}
        placeholder="8c6c497073f395ca8ecd9ba6644e371c"
        className={styles.textInput}
        onChange={onChange}
      />
    </div>
    <img
      alt="icon"
      src={DeleteIcon}
      className={styles.deleteIcon}
      onClick={onRemove}
    />
  </div>
);

export default HashInputLine;
