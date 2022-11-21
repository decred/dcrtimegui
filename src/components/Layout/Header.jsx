import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import Logo from "src/assets/logo-light.svg";
import styles from "./Header.module.css";

const Header = ({ history }) => {
  return (
    <div className={styles.header}>
      <NavLink to="/">
        <img src={Logo} alt="presentation" />
      </NavLink>
    </div>
  );
};

export default withRouter(Header);
