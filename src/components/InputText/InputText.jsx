import React from "react";
import styles from "./InputText.module.css";
import cls from "src/helpers/cls";

const InputText = ({placeholder, value, onChange, className, Icon, error}) => {
    return (
        <>
            <input type="text" placeholder={placeholder} className={cls(className, styles.inputText, error && styles.error)} value={value} onChange={onChange}/>
            {Icon ? <button className={styles.iconWrapper}><Icon /></button> : null}
        </>
    );
};

export default InputText;