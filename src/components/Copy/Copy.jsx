import React from "react";
import ButtonIcon from "src/components/ButtonIcon";
import {ReactComponent as CopyIcon} from "../../assets/icons/copy-to-clipboard.svg";

const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
};

const Copy = ({text}) => {
    return (
        <ButtonIcon Icon={<CopyIcon />} handleClick={() => copyToClipboard(text)} color={"var(--copy-to-clipboard-color)"}/>
    );
};

export default Copy;