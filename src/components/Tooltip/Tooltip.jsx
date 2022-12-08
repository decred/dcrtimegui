import React, { useState } from "react";
import cls from "src/helpers/cls";
import styles from "./Tooltip.module.css";

const Tooltip = ({tooltipTrigger, tooltipText, tooltipHover, tooltipTextStyle}) => {
    const [show, setShow] = useState(false);
    const handleTooltipClick = () => {
        setShow(true);
        setTimeout(() => {
            setShow(false);
        }, 1000);
    };
    return (
        <div className={cls(styles.tooltip, tooltipHover && styles.tooltipHover)} onClick={tooltipHover ? null : handleTooltipClick}>
            {tooltipTrigger}
            <span className={cls(styles.tooltipText, show && styles.tooltipShow)} style={tooltipTextStyle}>
                {tooltipText}
            </span>
        </div>
    );
};

export default Tooltip;