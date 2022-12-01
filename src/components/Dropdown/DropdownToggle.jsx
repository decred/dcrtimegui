import React from "react";
import styles from "./Dropdown.module.css";
import cls from "src/helpers/cls";

export const DropdownToggle = ({text, handleClick, ariaLabel, ariaExpanded, className}) => {
    return (
        <button className={cls(styles.toggleButton, className)} onClick={handleClick} aria-label={ariaLabel} aria-expanded={ariaExpanded}>
            {text}
        </button>
    );
};