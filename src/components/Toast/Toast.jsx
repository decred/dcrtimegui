import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import cls from "src/helpers/cls";
import {ReactComponent as Close} from "../../assets/icons/notice-close-dark.svg";

import styles from "./Toast.module.css";

const Toast = ({textKey, show, onClose}) => {
    const {t} = useTranslation();
    useEffect(() => {
        if (show) {
            setTimeout(() => {
                onClose();
            }, 3500);
        }
    }, [onClose, show]);
    return (
        <div className={cls(styles.toast, show && styles.toastShow)}>
            {t(textKey)}
            <button className={styles.closeButton} onClick={onClose} aria-label="Close toast"><Close /></button>
        </div>
    );
};

export default Toast;