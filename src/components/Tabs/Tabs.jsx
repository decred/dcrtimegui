import React from "react";
import PropTypes from "prop-types";
import { classNames } from "pi-ui";
import { FileTab, HashTab } from "src/constants";
import styles from "./Tabs.module.css";

const Tabs = ({ active, set }) => {
  return (
    <div className={styles.tabsWrapper}>
      <div className={styles.tabs}>
        <div
          className={classNames(
            styles.tabFiles,
            active === FileTab
              ? styles.tabBackgroundWhite
              : styles.tabBackgroundGrey
          )}
          onClick={() => set(FileTab)}
        >
          Upload file
        </div>
        <div
          className={classNames(
            styles.tabHash,
            active === HashTab
              ? styles.tabBackgroundWhite
              : styles.tabBackgroundGrey
          )}
          onClick={() => set(HashTab)}
        >
          Input hash
        </div>
      </div>
    </div>
  );
};

Tabs.propTypes = {
  active: PropTypes.oneOf([FileTab, HashTab]),
  set: PropTypes.func
};

export default Tabs;
