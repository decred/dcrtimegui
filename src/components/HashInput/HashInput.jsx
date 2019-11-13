import React from "react";
import { Button, Text } from "pi-ui";
import HashInputLine from "./HashInputLine";
import styles from "./HashInput.module.css";

const HashInput = ({ hashes, setHashes }) => {
  // Initialize first hash input
  if (!hashes.length) {
    setHashes([{ id: 0, digest: "" }]);
  }

  const onAddHash = () => {
    const lastID = hashes[hashes.length - 1].id + 1;
    return setHashes([...hashes, { id: lastID, digest: "" }]);
  };

  const onRemoveHash = id => () =>
    setHashes(hashes.filter(hash => hash.id !== id));

  const onChangeHash = id => e =>
    setHashes(
      hashes.map(h => {
        if (h.id === id) {
          h.digest = e.target.value;
        }
        return h;
      })
    );

  return (
    <div className={styles.hashInputWrapper}>
      {hashes.map((hash, i) => (
        <HashInputLine
          value={hash.digest}
          onChange={onChangeHash(hash.id)}
          onRemove={onRemoveHash(hash.id)}
        />
      ))}
      <Button type="button" icon size="sm" onClick={onAddHash}>
        +
      </Button>
      <Text className={styles.addButtonText}>Add another</Text>
    </div>
  );
};

export default HashInput;
