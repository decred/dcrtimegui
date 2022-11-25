import React from "react";
import styles from "./ToggleMenu.module.css";
import {ReactComponent as MenuOpenLight} from "src/assets/icons/open-menu-light.svg";
import {ReactComponent as MenuOpenDark} from "src/assets/icons/open-menu-dark.svg";
import {ReactComponent as MenuCloseLight} from "src/assets/icons/close-menu-light.svg";
import {ReactComponent as MenuCloseDark} from "src/assets/icons/close-menu-dark.svg";
import useTheme from "src/theme/useTheme";

const ToggleMenu = ({showMenu, handleClick}) => {
    const {theme} = useTheme();
    const isDarkTheme = theme === "dark";
    let ToggleComponent = null;
    if (isDarkTheme) {
        if (showMenu) {
            ToggleComponent = MenuCloseDark;
        } else {
            ToggleComponent = MenuOpenDark;
        }
    } else {
        if (showMenu) {
            ToggleComponent = MenuCloseLight;
        } else {
            ToggleComponent = MenuOpenLight;
        }
    }
    const toggleButtonClass = isDarkTheme ? styles.toggleButtonDark : styles.toggleButtonLight;
    return (
        <button className={toggleButtonClass} onClick={() => handleClick()} aria-label="Click to toggle navigation links" aria-expanded={showMenu}>
            <ToggleComponent />
        </button>
    );
};

export default ToggleMenu;