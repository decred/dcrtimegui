import React from "react";
import styles from "./MainSection.module.css";

const MainSection = ({children}) => {
    return (
        <div className={styles.mainCardWrapper}>
            <div className={styles.mainCard}>
                {children}
            </div>
        </div>
    );
};

export default MainSection;