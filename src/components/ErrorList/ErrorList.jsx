import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./ErrorList.module.css";

const ErrorList = ({errors}) => {
    const { t } = useTranslation();

    return (
        <ul className={styles.list}>
            {errors.map(error => <li className={styles.listItem} key={error}>{t(error.key, error.options)}</li>)}
        </ul>
    );
};

export default ErrorList;