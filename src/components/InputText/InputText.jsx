import React from "react";
import styles from "./InputText.module.css";
import cls from "src/helpers/cls";

const InputText = ({placeholder, value, onChange, className, Icon, error}) => {
    return (
        <div className={cls(styles.inputWrapper, error && styles.error)}>
            <input type="text" placeholder={placeholder} className={cls(className, styles.inputText)} value={value} onChange={onChange}/>
            {Icon ? <button className={styles.iconWrapper}><Icon /></button> : null}
        </div>
    );
};

export default InputText;