import React from "react";
import styles from "./Menu.module.css";

function Menu() {
    return (
        <div className={styles.menu}>
            <span>Generate</span>
            <span>Verify</span>
            <span>Verify</span>
            <span>Theme stuff</span>
        </div>
    );
}

export default Menu;