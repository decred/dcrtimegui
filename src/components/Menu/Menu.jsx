import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import styles from "./Menu.module.css";
import useTheme from "src/theme/useTheme";
import ToggleTheme from "src/components/ToggleTheme";
import LangDropdown from "src/components/LangDropdown";
import ToggleMenu from "src/components/ToggleMenu";
import cls from "src/helpers/cls";

function Menu({showMenu, setShowMenu, location: {pathname}}) {
    const {theme} = useTheme();
    const isDarkTheme = theme === "dark";
    const menuLinkClass = isDarkTheme ? styles.menuLinkDark : styles.menuLinkLight;
    const activeMenuLinkClass = isDarkTheme ? styles.menuLinkDarkActive : styles.menuLinkLightActive;
    const generateActive = pathname === "/generate" || pathname === "/timestamp" || pathname === "/";
    const verifyActive = pathname === "/verify";
    const documentationActive = pathname === "/documentation";
    return (
        <nav className={styles.menu}>
            <div className={styles.nav} style={showMenu ? {display: "block"} : {}}>
                <NavLink className={cls(menuLinkClass, generateActive && activeMenuLinkClass)} to="/">Generate</NavLink>
                <NavLink className={cls(menuLinkClass, verifyActive && activeMenuLinkClass)} to="/verify">Verify</NavLink>
                <a className={cls(menuLinkClass, documentationActive && activeMenuLinkClass)} href="https://docs.decred.org/advanced/dcrtime/" target="_blank" rel="noopener noreferrer" aria-label="Dcrtime docs">Documentation</a>
            </div>
            <LangDropdown className={styles.langDropdown}/>
            <ToggleTheme />
            <ToggleMenu showMenu={showMenu} handleClick={() => setShowMenu(!showMenu)}/>
        </nav>
    );
}

export default withRouter(Menu);