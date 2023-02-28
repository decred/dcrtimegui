import React from "react";
import styles from "./CheckboxIcon.module.css";

const CheckboxIcon = ({checked}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
            <rect className={styles.checkboxWrapper} width="22" height="22" rx="5"/><g transform="translate(-1017 -408)">
                <g transform="translate(1865 -1752)">
                    <path className={checked ? styles.checkboxCheck : styles.checkboxCheckNone} d="M-838.5,2174a.5.5,0,0,1-.354-.146l-2-2,.708-.708,1.646,1.647,4.646-4.647.708.708-5,5A.5.5,0,0,1-838.5,2174Z"/>
                </g>
                <g className={styles.checkboxSquare} transform="translate(1021 412)">
                    <rect className={styles.checkboxFiller1} width="14" height="14" rx="1"/>
                    <rect className={styles.checkboxFiller2} x="0.5" y="0.5" width="13" height="13" rx="0.5"/>
                </g>
            </g>
        </svg>
    );
};

export default CheckboxIcon;

