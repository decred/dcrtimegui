import React from "react";
import styles from "./Button.module.css";
import cls from "src/helpers/cls";

const Button = ({type = "button", text, amount, handleClick, className, Icon, kind = "primary"}) => {
    let buttonClass = null;
    switch(kind) {
    case "primary":
        buttonClass = styles.buttonPrimary;
        break;
    case "secondary":
        buttonClass = styles.buttonSecondary;
        break;
    case "tertiary":
        buttonClass = styles.buttonTertiary;
        break;
    case "disabled":
        buttonClass = styles.buttonDisabled;
        break;
    default:
        throw new Error("Invalid kind");
    }
    return (
        <button type={type} onClick={handleClick} className={cls(buttonClass, Icon && styles.buttonWithIcon, className)} disabled={kind === "disabled"}>
            {Icon ? <Icon style={{marginRight: "0.8rem", fill: "var(--go-back-color)"}}/> : null}{`${text}${amount ? ` (${amount})` : ""}`}
        </button>
    );
};

export default Button;