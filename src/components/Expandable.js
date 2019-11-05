import React from "react";
import propTypes from "prop-types";
import styles from "./components.module.css";
import { classNames } from "pi-ui";

const Exapandable = ({ expanded, triggerComponent, children, className }) => (
  <div className={className}>
    {triggerComponent}
    <div
      className={classNames(
        styles.exapandableContent,
        expanded && styles.ecExpanded
      )}
    >
      {children}
    </div>
  </div>
);

Exapandable.propTypes = {
  style: propTypes.object,
  expanded: propTypes.bool.isRequired,
  triggerComponent: propTypes.node.isRequired,
  children: propTypes.oneOfType([propTypes.node, propTypes.string])
};

export default Exapandable;
