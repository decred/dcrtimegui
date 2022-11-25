import React from "react";
import styles from "./Dropdown.module.css";

export const DropdownToggle = ({text, handleClick}) => {
    return (
        <button className={styles.toggleButton} onClick={handleClick}>
            {text}
        </button>
    );
};