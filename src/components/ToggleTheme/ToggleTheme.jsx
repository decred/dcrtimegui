import React, {useState} from "react";
import styles from "./ToggleTheme.module.css";
import {ReactComponent as ThemeToggleLight} from "src/assets/icons/color-mode-light.svg";
import {ReactComponent as ThemeToggleDark} from "src/assets/icons/color-mode-dark.svg";
import useTheme from "src/theme/useTheme";

const ToggleTheme = () => {
    const {theme, setTheme} = useTheme();
    const isDarkTheme = theme === "dark";
    const ToggleComponent = isDarkTheme ? ThemeToggleDark : ThemeToggleLight;
    const toggleButtonClass = isDarkTheme ? styles.toggleButtonDark : styles.toggleButtonLight;
    return (
        <button className={toggleButtonClass} onClick={() => setTheme(isDarkTheme ? "light" : "dark")}>
            <ToggleComponent />
        </button>
    );
};

export default ToggleTheme;