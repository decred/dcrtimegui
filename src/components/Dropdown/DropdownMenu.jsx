import React, {useState} from "react";
import useOutsideClick from "src/helpers/useOutsideClick";
import styles from "./Dropdown.module.css";

export const DropdownMenu = ({options, handleClickOutside, handleClickOption}) => {
    const [dropdownMenuEl, setdropdownMenuEl] = useState(null);
    useOutsideClick(dropdownMenuEl, handleClickOutside);
    return (
        <ul ref={setdropdownMenuEl} className={styles.dropdownMenu}>
            {options.map(op => (
                <li key={op}>
                    <button className={styles.dropdownMenuItem} onClick={() => handleClickOption(op)}>{op}</button>
                </li>
            ))}
        </ul>
    );
};