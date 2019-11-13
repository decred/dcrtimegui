import React, { useState } from "react";
import { Header as HeaderUI, BoxTextInput } from "pi-ui";
import { NavLink, withRouter } from "react-router-dom";
import Logo from "src/assets/logo.svg";
import styles from "./Layout.module.css";

const Header = ({ history }) => {
  const [query, setQuery] = useState("");
  return (
    <HeaderUI className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.spacerLeft}>
          <NavLink to="/">
            <img src={Logo} alt="presentation" />
          </NavLink>
        </div>
        <BoxTextInput
          className={styles.searchBox}
          inputClassName={styles.searchInput}
          searchInput={true}
          rounded={true}
          placeholder="Search for digest"
          name="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onSubmit={() => history.push(`results?digests=${query}`)}
        />
        <div className={styles.spacerRight}>&nbsp</div>
      </div>
    </HeaderUI>
  );
};

export default withRouter(Header);
