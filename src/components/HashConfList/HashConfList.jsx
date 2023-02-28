import React from "react";
import styles from "./HashConfList.module.css";
import Copy from "src/components/Copy";
import Checkbox from "src/components/Checkbox";
import Tooltip from "src/components/Tooltip";
import { withRouter } from "react-router-dom";
import { isDigestAnchored, isDigestWaitingAnchoring, isDigestAnchorPending } from "src/helpers/dcrtime";
import {ReactComponent as TimestampedDark} from "../../assets/icons/timestamped-dark.svg";
import {ReactComponent as TimestampedLight} from "../../assets/icons/timestamped-light.svg";
import {ReactComponent as PendingLight} from "../../assets/icons/pending-light.svg";
import {ReactComponent as PendingDark} from "../../assets/icons/pending-dark.svg";
import {ReactComponent as WaitingLight} from "../../assets/icons/waiting-for-anchoring-light.svg";
import {ReactComponent as WaitingDark} from "../../assets/icons/waiting-for-anchoring-dark.svg";
import {ReactComponent as NotFoundLight} from "../../assets/icons/not-found-light.svg";
import {ReactComponent as NotFoundDark} from "../../assets/icons/not-found-dark.svg";
import useTheme from "src/theme/useTheme";
import { useTranslation } from "react-i18next";

const getProgressClass = (digest) => {
    if (isDigestAnchored(digest)) {
        return styles.hashWrapper6;
    }
    switch(digest.chaininformation?.confirmations) {
    case 1:
        return styles.hashWrapper1;
    case 2:
        return styles.hashWrapper2;
    case 3:
        return styles.hashWrapper3;
    case 4:
        return styles.hashWrapper4;
    case 5:
        return styles.hashWrapper5;
    default:
        return styles.hashWrapper0;
    }
};

const getStatus = digest => {
    if (isDigestAnchored(digest)) {
        return "Timestamped";
    }
    if (isDigestWaitingAnchoring(digest)) {
        return "Awaiting anchoring time";
    }
    if (isDigestAnchorPending(digest)) {
        return "Pending";
    }
    return "Not Found";
};

const getStatusComponent = (theme, hash) => {
    const isDarkTheme = theme === "dark";
    switch (getStatus(hash)) {
    case "Timestamped":
        if (isDarkTheme) return TimestampedDark;
        return TimestampedLight;
    case "Pending":
        if (isDarkTheme) return PendingDark;
        return PendingLight;
    case "Awaiting anchoring time":
        if (isDarkTheme) return WaitingDark;
        return WaitingLight;
    default:
        if (isDarkTheme) return NotFoundDark;
        return NotFoundLight;
    };
};

const getTooltipText = (hash, t) => {
    const st = getStatus(hash);
    switch (st) {
    case "Timestamped":
        return t("hashView.timestamped");
    case "Awaiting anchoring time":
        return t("hashView.awaiting");
    case "Pending":
        return t("hashView.pending");
    case "Not found":
        return t("hashView.notFound");
    default:
        return t("hashView.notFound");
    }
};

const StatusComponent = ({theme, hash}) => {
    const {t} = useTranslation();
    const Comp = getStatusComponent(theme, hash);
    const tooltipText = getTooltipText(hash, t);
    return (
        <Tooltip tooltipTrigger={<Comp width="2.2rem" height="2.2rem" style={{minWidth: "2.2rem", marginRight: "0.8rem"}} />} tooltipText={tooltipText} tooltipHover tooltipTextStyle={{width: "8.5rem", left: "calc(50% - 4.75rem)"}} />
    );
};


const HashConfList = ({hashes, handleCheckboxClick, checked, history, noCheck}) => {
    const {theme} = useTheme();
    return (
        <ul className={styles.hashConfList}>
            {hashes.map(h => <li key={h.digest} className={styles.hashConfListItem}>
                <StatusComponent hash={h} theme={theme} />
                <button className={getProgressClass(h)} onClick={() => history.push(`/results#hashes=${h.digest}`)}>
                    {h.digest}
                </button>
                <span className={styles.iconsWrapper}>
                    <Copy text={h.digest} />
                    {noCheck ? null : (
                        <Checkbox checked={checked[h.digest]} handleClick={handleCheckboxClick(h.digest)} />
                    )}
                </span>
            </li>)}
        </ul>
    );
};

export default withRouter(HashConfList);