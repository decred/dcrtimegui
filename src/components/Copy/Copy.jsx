import React from "react";
import Tooltip from "src/components/Tooltip";
import ButtonIcon from "src/components/ButtonIcon";
import {ReactComponent as CopyIcon} from "../../assets/icons/copy-to-clipboard.svg";

const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
};

const Copy = ({text}) => {
    return (
        <Tooltip tooltipTrigger={<ButtonIcon Icon={<CopyIcon />} handleClick={() => copyToClipboard(text)} color={"var(--copy-to-clipboard-color)"}/>} tooltipText="Copied!" tooltipHover={false} tooltipTextStyle={{width: "52px", left: "calc(50% - 26px)"}} />
    );
};

export default Copy;