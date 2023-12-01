import React, {useEffect, useState} from "react";
import Dropdown from "src/components/Dropdown";
import styles from "./LangDropdown.module.css";
import { useTranslation } from "react-i18next";

const LangDropdown = ({className}) => {
    const { i18n } = useTranslation();
    const allLangOptions = ["ENG", "العَرَبِيَّة"];
    const [selectedLang, setSelectedLang] = useState(localStorage.getItem("lang") || "ENG");
    useEffect(() => {
        if (selectedLang === "ENG") i18n.changeLanguage("en");
        if (selectedLang === "PT") i18n.changeLanguage("العَرَبِيَّة");
        localStorage.setItem("lang", selectedLang);
    }, [selectedLang, setSelectedLang, i18n]);
    const handleClickOption = (op) => setSelectedLang(op);
    const menuOptions = allLangOptions.filter(l => l !== selectedLang);
    return (
        <Dropdown toggleText={selectedLang} menuOptions={menuOptions} className={className} ariaLabel="Click to open language options" toggleClassName={styles.toggleButton} handleClickOption={handleClickOption} />
    );
};

export default LangDropdown;
