import React, {useState} from "react";
import { NavLink, withRouter } from "react-router-dom";
import useTheme from "src/theme/useTheme";
import LogoLight from "src/assets/icons/logo-light.svg";
import LogoDark from "src/assets/icons/logo-dark.svg";
import Menu from "src/components/Menu";
import styles from "./Header.module.css";

const Header = () => {
    const {theme} = useTheme();
    const isDarkTheme = theme === "dark";
    const logo = isDarkTheme ? LogoDark : LogoLight;
    const [showMenu, setShowMenu] = useState(false);
    return (
        <header className={styles.header} style={showMenu ? {background: "var(--header-bg-color)"} : {}}>
            <div className={styles.container}>
                <NavLink to="/">
                    <img src={logo} alt="timestamply logo" />
                </NavLink>
                <Menu showMenu={showMenu} setShowMenu={setShowMenu}/>
            </div>
        </header>
    );
};

export default withRouter(Header);
