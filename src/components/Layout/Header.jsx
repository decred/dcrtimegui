import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import useTheme from "src/theme/useTheme";
import LogoLight from "src/assets/icons/logo-light.svg";
import LogoDark from "src/assets/icons/logo-dark.svg";
import Menu from "src/components/Menu";
import styles from "./Header.module.css";

const Header = ({ history }) => {
    const {theme} = useTheme();
    const isDarkTheme = theme === "dark";
    const logo = isDarkTheme ? LogoDark : LogoLight;
    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <NavLink to="/">
                    <img src={logo} alt="timestamply logo" />
                </NavLink>
                <Menu />
            </div>
        </div>
    );
};

export default withRouter(Header);
