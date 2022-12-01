import React from "react";
import Dropdown from "src/components/Dropdown";
import styles from "./LangDropdown.module.css";

const LangDropdown = ({className}) => {
    const allLangOptions = ["ENG", "PT", "SPA"];
    const selectedLang = "ENG";
    const menuOptions = allLangOptions.filter(l => l !== selectedLang);
    return (
        <Dropdown toggleText={selectedLang} menuOptions={menuOptions} className={className} ariaLabel="Click to open language options" toggleClassName={styles.toggleButton}/>
    );
};

export default LangDropdown;