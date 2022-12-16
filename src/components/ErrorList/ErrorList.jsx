import React from "react";
import styles from "./ErrorList.module.css";

const ErrorList = ({errors}) => {
    return (
        <ul className={styles.list}>
            {errors.map(error => <li className={styles.listItem} key={error}>{error?.toString()}</li>)}
        </ul>
    );
};

export default ErrorList;