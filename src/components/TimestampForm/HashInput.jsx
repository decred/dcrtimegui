import React from "react";
import { Button, Text } from "pi-ui";
import styles from "./timestampform.module.css";
import TextInput from "src/components/TextInput";
import HashIcon from "src/assets/hash_icon.svg";
import DeleteIcon from "src/assets/delete_icon.svg";

const HashInputWrapper = ({ hashes, setHashes }) => {
  // Initialize first hash input
  if (!hashes.length) {
    setHashes([{ id: 0, hash: "" }]);
  }

  const onAddHash = () => {
    const lastID = hashes[hashes.length - 1].id + 1;
    return setHashes([...hashes, { id: lastID, hash: "" }]);
  };

  const onRemoveHash = id => setHashes(hashes.filter(hash => hash.id !== id));

  const onChangeHash = id => e =>
    setHashes(
      hashes.map(h => {
        if (h.id === id) {
          h.hash = e.target.value;
        }
        return h;
      })
    );

  return (
    <div className={styles.hashInputWrapper}>
      {hashes.map((hash, i) => (
        <HashInput
          id={hash.id}
          key={`hash-${i}`}
          value={hash.hash}
          onChange={onChangeHash}
          onRemove={onRemoveHash}
        />
      ))}
      <div className={styles.addbuttonWrapper}>
        <Button type="button" icon size="sm" onClick={onAddHash}>
          +
        </Button>
        <Text className={styles.addButtonText}>Add another</Text>
      </div>
    </div>
  );
};

const HashInput = ({ id, value, onChange, onRemove }) => (
  <div className={styles.hashInput}>
    <img alt="hash" src={HashIcon} className={styles.hashIcon} />
    <TextInput
      id={`hash-${id}`}
      value={value}
      placeholder="8c6c497073f395ca8ecd9ba6644e371c"
      onChange={onChange(id)}
    />
    <img
      alt="icon"
      src={DeleteIcon}
      className={styles.deleteIcon}
      onClick={() => onRemove(id)}
    />
  </div>
);

export default HashInputWrapper;
