import React from "react";
import PropTypes from "prop-types";
import styles from "./Title.module.css";

const Title = ({ title }) => {
  return (
    <div className={styles.title}>
      <h1>{title}</h1>
    </div>
  );
};

Title.propTypes = {
  title: PropTypes.string
};

export default Title;
