import React from "react";
import { Text } from "pi-ui";
import FileIcon from "src/assets/file_icon.svg";
import DeleteIcon from "src/assets/delete_icon.svg";
import styles from "./FileInputLine.module.css";

const FileInputLine = ({ file, onRemove }) => (
  <div className={styles.fileInputLine}>
    <img src={FileIcon} alt="fileicon" />
    <Text className={styles.textFileName} truncate>
      {file.name}
    </Text>
    <img
      className={styles.deleteIcon}
      src={DeleteIcon}
      onClick={onRemove}
      alt="deleteicon"
    />
  </div>
);

export default FileInputLine;
