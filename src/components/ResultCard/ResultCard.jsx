import React from "react";
import PropTypes from "prop-types";
import Digest from "./Digest";
import ChainInfo from "./ChainInfo";
import DownloadProof from "./DownloadProof";
import styles from "./ResultCard.module.css";
import {ReactComponent as TimestampedDark} from "../../assets/icons/timestamped-dark.svg";
import {ReactComponent as TimestampedLight} from "../../assets/icons/timestamped-light.svg";
import {ReactComponent as PendingLight} from "../../assets/icons/pending-light.svg";
import {ReactComponent as PendingDark} from "../../assets/icons/pending-dark.svg";
import {ReactComponent as WaitingLight} from "../../assets/icons/waiting-for-anchoring-light.svg";
import {ReactComponent as WaitingDark} from "../../assets/icons/waiting-for-anchoring-dark.svg";
import {ReactComponent as NotFoundLight} from "../../assets/icons/not-found-light.svg";
import {ReactComponent as NotFoundDark} from "../../assets/icons/not-found-dark.svg";
import {ReactComponent as GoBack} from "../../assets/icons/goback-button-arrow.svg";
import useTheme from "src/theme/useTheme";
import Button from "src/components/Button";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ResultCard = ({
    digest,
    status,
    history
}) => {
    const {t} = useTranslation();
    const {theme} = useTheme();
    const isDarkTheme = theme === "dark";
    let StatusComponent = null;
    let statusText = "";
    switch (status) {
    case "Timestamped":
        if (isDarkTheme) StatusComponent = TimestampedDark;
        else StatusComponent = TimestampedLight;
        statusText = t("hashView.timestamped");
        break;
    case "Pending":
        if (isDarkTheme) StatusComponent = PendingDark;
        else StatusComponent = PendingLight;
        statusText = t("hashView.pending");
        break;
    case "Awaiting anchoring time":
        if (isDarkTheme) StatusComponent = WaitingDark;
        else StatusComponent = WaitingLight;
        statusText = t("hashView.awaiting");
        break;
    default:
        if (isDarkTheme) StatusComponent = NotFoundDark;
        else StatusComponent = NotFoundLight;
        statusText = t("hashView.notFound");
    };
    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <h3 className={styles.heading}>Hash status</h3>
                <div className={styles.statusDigestWrapper}>
                    <Digest digest={digest.digest} />
                    <div className={styles.statusWrapper}>
                        <span className={styles.statusText}>{statusText}</span>
                        <StatusComponent />
                    </div>
                </div>
                {status === "Timestamped" || status === "Pending" ? (
                    <>
                        <h3 className={styles.heading}>{t("hashView.details")}</h3>
                        <ChainInfo chainInfo={digest.chaininformation} />
                    </>
                ) : null}
                <div className={styles.actionButtons}>
                    <Button kind="secondary" text={t("hashView.goBack")} Icon={GoBack} handleClick={() => history.goBack()}/>
                    <DownloadProof
                        data={{
                            digests: [
                                {...digest}
                            ]
                        }}
                        name={digest.name}
                    />
                </div>
            </div>
        </div>
    );
};

ResultCard.propTypes = {
    digest: PropTypes.object,
    status: PropTypes.string
};

export default withRouter(ResultCard);
