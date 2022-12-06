import React from "react";
import styles from "./ButtonIcon.module.css";

const ButtonIcon = ({Icon, handleClick, color}) => {
    return (
        <button className={styles.buttonIcon} onClick={handleClick} style={{color}}>
            {Icon}
        </button>
    );
};

export default ButtonIcon;