import React from "react";
import styles from "./Footer.module.css";
import {ReactComponent as TwitterLogo} from "../../assets/icons/icon-frontpage-twitter.svg";
import {ReactComponent as MatrixLogo} from "../../assets/icons/icon-frontpage-matrix.svg";
import {ReactComponent as MediumLogo} from "../../assets/icons/icon-frontpage-medium.svg";
import {ReactComponent as RedditLogo} from "../../assets/icons/icon-frontpage-reddit.svg";
import {ReactComponent as YoutubeLogo} from "../../assets/icons/icon-frontpage-youtube.svg";
import {ReactComponent as DiscordLogo} from "../../assets/icons/icon-frontpage-discord.svg";
import {useTranslation} from "react-i18next";

const Footer = () => {
    const {t} = useTranslation();
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.decredDevs}>
                    <a href="https://github.com/decred" target="_blank" rel="noopener noreferrer" aria-label="Link to Decred Github">
                        {t("footer.decredDevs")}
                    </a>
                </div>
                <div className={styles.column}>
                    <a href="https://decred.org/brand/" target="_blank" rel="noopener noreferrer">
                        {t("footer.brandResources")}
                    </a>
                    <a href="https://decred.org/news/" target="_blank" rel="noopener noreferrer">
                        {t("footer.news")}
                    </a>
                    <a href="https://decred.org/vsp/" target="_blank" rel="noopener noreferrer">
                        {t("footer.vsp")}
                    </a>
                    <a href="https://docs.decred.org/contributing/overview/" target="_blank" rel="noopener noreferrer">
                        {t("footer.becomeContributor")}
                    </a>
                </div>
                <div className={styles.column}>
                    <a href="https://docs.decred.org/research/overview/" target="_blank" rel="noopener noreferrer">
                        {t("footer.technicalOverview")}
                    </a>
                    <a href="https://dcrdata.decred.org/" target="_blank" rel="noopener noreferrer">
                        {t("footer.blockExplorer")}
                    </a>
                    <a href="https://timestamp.decred.org/" target="_blank" rel="noopener noreferrer">
                        {t("footer.timestamping")}
                    </a>
                    <a href="https://bounty.decred.org/" target="_blank" rel="noopener noreferrer">
                        {t("footer.bugBounty")}
                    </a>
                </div>
                <div className={styles.column}>
                    <div className={styles.socialMedia}>
                        <a href="https://chat.decred.org/" target="_blank" rel="noopener noreferrer" aria-label="Invite to join Decred official matrix chat"><MatrixLogo /></a>
                        <a href="https://discord.com/invite/dXSmwvYury" target="_blank" rel="noopener noreferrer" aria-label="Invite to join Decred official discord"><DiscordLogo /></a>
                        <a href="https://twitter.com/decredproject" target="_blank" rel="noopener noreferrer" aria-label="Link to Decred official twitter"><TwitterLogo /></a>
                        <a href="https://www.reddit.com/r/decred" target="_blank" rel="noopener noreferrer" aria-label="Link to Decred subreddit"><RedditLogo /></a>
                        <a href="https://www.youtube.com/@DecredTV" target="_blank" rel="noopener noreferrer" aria-label="Link to Decred official youtube channel"><YoutubeLogo /></a>
                        <a href="https://medium.com/decred" target="_blank" rel="noopener noreferrer" aria-label="Link to Decred official medium blog"><MediumLogo /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
