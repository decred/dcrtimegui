import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import styles from "./Menu.module.css";
import useTheme from "src/theme/useTheme";
import ToggleTheme from "src/components/ToggleTheme";
import LangDropdown from "src/components/LangDropdown";

function Menu() {
    const {theme} = useTheme();
    const isDarkTheme = theme === "dark";
    const menuLinkClass = isDarkTheme ? styles.menuLinkDark : styles.menuLinkLight;
    return (
        <div className={styles.menu}>
            <NavLink className={menuLinkClass} to="/">Generate</NavLink>
            <NavLink className={menuLinkClass} to="/verify">Verify</NavLink>
            <NavLink className={menuLinkClass} to="/documentation">Documentation</NavLink>
            <LangDropdown className={styles.langDropdown}/>
            <ToggleTheme />
        </div>
    );
}

export default withRouter(Menu);