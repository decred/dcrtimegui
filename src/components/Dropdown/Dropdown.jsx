import React, {useState} from "react";
import { DropdownMenu } from "./DropdownMenu";
import { DropdownToggle } from "./DropdownToggle";
import styles from "./Dropdown.module.css";
import cls from "src/helpers/cls";

const Dropdown = ({toggleText, menuOptions, className}) => {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <div className={cls(styles.dropdown, className)}>
            <DropdownToggle text={toggleText} handleClick={() => setShowMenu(true)}/>
            {showMenu ? <DropdownMenu options={menuOptions} handleClickOutside={() => setShowMenu(false)}/> : null}
        </div>
    );
};

export default Dropdown;