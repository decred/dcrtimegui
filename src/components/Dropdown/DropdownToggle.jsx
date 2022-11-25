import React from "react";
import styles from "./Dropdown.module.css";

export const DropdownToggle = ({text, handleClick, ariaLabel, ariaExpanded}) => {
    return (
        <button className={styles.toggleButton} onClick={handleClick} aria-label={ariaLabel} aria-expanded={ariaExpanded}>
            {text}
        </button>
    );
};