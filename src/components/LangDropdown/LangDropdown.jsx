import React from "react";
import Dropdown from "src/components/Dropdown";

const LangDropdown = ({className}) => {
    const allLangOptions = ["ENG", "PT", "SPA"];
    const selectedLang = "ENG";
    const menuOptions = allLangOptions.filter(l => l !== selectedLang);
    return (
        <Dropdown toggleText={selectedLang} menuOptions={menuOptions} className={className} />
    );
};

export default LangDropdown;