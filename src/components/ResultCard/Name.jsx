import React from "react";
import PropTypes from "prop-types";
import FileIcon from "src/assets/file_icon.svg";
import HashIcon from "src/assets/hash_icon.svg";
import styles from "./ResultCard.module.css";

const Name = ({ name, statusTag, hasFileName }) => (
  <div className={styles.resultCardHeader}>
    <img
      alt="file"
      src={hasFileName ? FileIcon : HashIcon}
      className={styles.fileIcon}
    />
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
