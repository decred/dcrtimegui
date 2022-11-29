import React from "react";
import styles from "./InputText.module.css";
import cls from "src/helpers/cls";

const InputText = ({placeholder, className, Icon}) => {
    return (
        <>
            <input type="text" placeholder={placeholder} className={cls(className, styles.inputText)} />
            {Icon ? <button className={styles.iconWrapper}><Icon /></button> : null}
        </>
    );
};

export default InputText;