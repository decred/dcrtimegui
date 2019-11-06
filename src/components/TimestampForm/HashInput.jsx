import React from "react";
import { Button, Text } from "pi-ui";
import styles from "./timestampform.module.css";
import TextInput from "src/components/TextInput";
import HashIcon from "src/assets/hash_icon.svg";
import DeleteIcon from "src/assets/delete_icon.svg";

const HashInputWrapper = ({ hashes, setHashes }) => {
  if (!hashes.length) {
    setHashes([{ id: 0, hash: null }]);
  }
  const addHash = e => {
    e.preventDefault();
    const lastID = hashes[hashes.length - 1].id + 1;
    return setHashes([...hashes, { id: lastID, hash: null }]);
  };
  console.log(hashes);
  const removeHash = id => {
    console.log(id);
    console.log(hashes);
    return setHashes(hashes.filter(hash => hash.id !== id));
  };

  return (
    <div className={styles.hashInputWrapper}>
      {/* {Array(numberOfHashes).fill(
        <HashInput count={numberOfHashes} onRemove={removeHash} />
      )} */}
      {hashes.map((hash, i) => {
        return <HashInput id={hash.id} onRemove={removeHash} />;
      })}

      <div className={styles.addbuttonWrapper}>
        <Button size="sm" onClick={addHash} icon>
          +
        </Button>
        <Text className={styles.addButtonText}>Add another</Text>
      </div>
    </div>
  );
};

const HashInput = ({ id, onRemove }) => (
  <div className={styles.hashInput}>
    <img style={{ paddingRight: "5px" }} src={HashIcon} alt="hash" />
    <TextInput
      id={`hash-${id}`}
      name={`hash-${id}`}
      placeholder="8c6c497073f395ca8ecd9ba6644e371c"
    />
    <img
      className={styles.deleteIcon}
      src={DeleteIcon}
      onClick={() => onRemove(id)}
      alt="deleteicon"
    />
  </div>
);

export default HashInputWrapper;
