import React from "react";
import PropTypes from "prop-types";
import { Text } from "pi-ui";
import HashIcon from "src/assets/hash_icon.svg";
import DeleteIcon from "src/assets/delete_icon.svg";
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
        <div key={`h-${i}`} className={styles.hashInputLine}>
          <img alt="hash" src={HashIcon} className={styles.hashIcon} />
          <div className={styles.textInputWrapper}>
            <input
              type="text"
              value={hash.digest}
              placeholder="8c6c497073f395ca8ecd9ba6644e371c"
              className={styles.textInput}
              onChange={onChangeHash(hash.id)}
            />
          </div>
          <img
            alt="icon"
            src={DeleteIcon}
            className={styles.deleteIcon}
            onClick={onRemoveHash(hash.id)}
          />
        </div>
      ))}
      <span className={styles.addButtonWrapper} onClick={onAddHash}>
        <button className={styles.addButton} type="button">
          +
        </button>
        <Text className={styles.addButtonText}>Add another</Text>
      </span>
    </div>
  );
};

HashInput.propTypes = {
  hashes: PropTypes.array,
  setHashes: PropTypes.func
};

export default HashInput;
