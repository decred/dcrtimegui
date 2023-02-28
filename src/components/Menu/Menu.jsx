import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import styles from "./Menu.module.css";
import ToggleTheme from "src/components/ToggleTheme";
import LangDropdown from "src/components/LangDropdown";
import ToggleMenu from "src/components/ToggleMenu";
import cls from "src/helpers/cls";
import { useTranslation } from "react-i18next";

function Menu({showMenu, setShowMenu, location: {pathname}}) {
    const {t} = useTranslation();
    const generateActive = pathname === "/generate" || pathname === "/timestamp" || pathname === "/";
    const verifyActive = pathname === "/verify";
    const documentationActive = pathname === "/documentation";
    return (
        <nav className={styles.menu}>
            <div className={styles.nav} style={showMenu ? {display: "block"} : {}}>
                <NavLink className={cls(styles.menuLink, generateActive && styles.menuLinkActive)} to="/">{t("header.nav.generate")}</NavLink>
                <NavLink className={cls(styles.menuLink, verifyActive && styles.menuLinkActive)} to="/verify">{t("header.nav.verify")}</NavLink>
                <a className={cls(styles.menuLink, documentationActive && styles.documentationActive)} href="https://docs.decred.org/advanced/dcrtime/" target="_blank" rel="noopener noreferrer" aria-label="Dcrtime docs">{t("header.nav.doc")}</a>
            </div>
            <LangDropdown className={styles.langDropdown}/>
            <ToggleTheme />
            <ToggleMenu showMenu={showMenu} handleClick={() => setShowMenu(!showMenu)}/>
        </nav>
    );
}

export default withRouter(Menu);