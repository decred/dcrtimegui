import React from "react";
import PropTypes from "prop-types";
import styles from "./ResultCard.module.css";

const Name = ({ name, statusTag }) => (
  <div className={styles.resultCardHeader}>
    <span id={`n-${name}`} truncate className={styles.headerName}>
      {name}
    </span>
    {statusTag}
  </div>
);

Name.propTypes = {
  name: PropTypes.string,
  statusTag: PropTypes.node,
  hasFileName: PropTypes.bool
};

export default Name;
