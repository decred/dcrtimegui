import React from "react";
import ButtonIcon from "src/components/ButtonIcon";
import CheckboxIcon from "src/components/CheckboxIcon";

const Checkbox = ({checked, handleClick}) => {
    return (
        <ButtonIcon Icon={<CheckboxIcon checked={checked} />} handleClick={handleClick} color={"var(--checkbox-color)"}/>
    );
};

export default Checkbox;