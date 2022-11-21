import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import Logo from "src/assets/logo.svg";
import styles from "./Header.module.css";

const Header = ({ history }) => {
  const [query, setQuery] = useState("");
  return (
    <div className={styles.header}>
      <NavLink to="/">
        <img src={Logo} alt="presentation" />
      </NavLink>
      <div className={styles.headerContainer}>
        <input
          name="search"
          value={query}
          placeholder="Search for hashes"
          searchInput={true}
          rounded={true}
          inputClassName={styles.searchInput}
          className={styles.searchBox}
          onChange={e => setQuery(e.target.value)}
          onSubmit={() => {
            history.push(`results#hashes=${query}`);
            window.location.reload();
          }}
        />
      </div>
    </div>
  );
};

export default withRouter(Header);
