import React from "react";
import { TextInput, Button, Text } from "pi-ui";
import styles from "./timestampform.module.css";
import HashIcon from "src/assets/hash_icon.svg";
import DeleteIcon from "src/assets/delete_icon.svg";

const HashInputWrapper = () => {
  return (
    <div className={styles.hashInputWrapper}>
      <HashInput />
      <HashInput />
      <HashInput />
      <div className={styles.addbuttonWrapper}>
        <Button size="sm" icon>
          +
        </Button>
        <Text className={styles.addButtonText}>Add another</Text>
      </div>
    </div>
  );
};

const HashInput = () => (
  <div className={styles.hashInput}>
    <img src={HashIcon} alt="hash" />
    <TextInput style={{ paddingLeft: "10px" }} id="hash" label="hash" />
    <img
      className={styles.deleteIcon}
      src={DeleteIcon}
      // onClick={() => onRemoveFile(i)}
      alt="deleteicon"
    />
  </div>
);

export default HashInputWrapper;
