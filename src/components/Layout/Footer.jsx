import React from "react";
import styles from "./Footer.module.css";
import GithubLogo from "../../assets/icons/icon-frontpage-github.svg";
import TwitterLogo from "../../assets/icons/icon-frontpage-twitter.svg";
import MatrixLogo from "../../assets/icons/icon-frontpage-matrix.svg";
import MediumLogo from "../../assets/icons/icon-frontpage-medium.svg";
import RedditLogo from "../../assets/icons/icon-frontpage-reddit.svg";
import TelegramLogo from "../../assets/icons/icon-frontpage-telegram.svg";
import YoutubeLogo from "../../assets/icons/icon-frontpage-youtube.svg";
import DiscordLogo from "../../assets/icons/icon-frontpage-discord.svg";

const Footer = () => (
    <div className={styles.footer}>
        <div className={styles.container}>
            <div className={styles.decredDevs}>
                <span>
                  Decred Developers
                </span>
            </div>
            <div className={styles.column}>
                <span>Brand Resources</span>
                <span>Press</span>
                <span>Become a Contributor</span>
                <span>Business Brief</span>
            </div>
            <div className={styles.column}>
                <span>Technical Overview</span>
                <span>Block Explorer</span>
                <span>Bug Bounty Program</span>
            </div>
            <div className={styles.socialMedia}>
                <img src={GithubLogo} alt="github"></img>
                <img src={TwitterLogo} alt="twitter"></img>
                <img src={MediumLogo} alt="medium"></img>
                <img src={YoutubeLogo} alt="youtube"></img>
                <img src={DiscordLogo} alt="discord"></img>
                <img src={MatrixLogo} alt="matrix"></img>
                <img src={TelegramLogo} alt="telegram"></img>
                <img src={RedditLogo} alt="reddit"></img>
            </div>
        </div>
    </div>
);

export default Footer;
