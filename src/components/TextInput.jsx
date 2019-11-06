import React from "react";
import styles from "./components.module.css";

const TextInput = ({ type, placeholder, id, error, ...props }) => {
  return (
    <>
      <div className={styles.textinputWrapper}>
        <input
          className={styles.textInput}
          id={id}
          placeholder={placeholder}
          // className={classNames(styles.textinput, error && styles.textinputError)}
          type="text"
          {...props}
        />
        {/* <Icon
        type="alert"
        backgroundColor="#ed6d47"
        iconColor="#feb8a5"
        className={classNames(
          styles.errorIcon,
          error && styles.errorIconActive
        )}
      />
      <p
        className={classNames(styles.errorMsg, error && styles.errorMsgActive)}>
        {error}
      </p> */}
      </div>
    </>
  );
};

export default TextInput;
