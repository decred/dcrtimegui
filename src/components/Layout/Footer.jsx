import React from "react";
import styles from "./Footer.module.css";
import {ReactComponent as GithubLogo} from "../../assets/icons/icon-frontpage-github.svg";
import {ReactComponent as TwitterLogo} from "../../assets/icons/icon-frontpage-twitter.svg";
import {ReactComponent as MatrixLogo} from "../../assets/icons/icon-frontpage-matrix.svg";
import {ReactComponent as MediumLogo} from "../../assets/icons/icon-frontpage-medium.svg";
import {ReactComponent as RedditLogo} from "../../assets/icons/icon-frontpage-reddit.svg";
import {ReactComponent as TelegramLogo} from "../../assets/icons/icon-frontpage-telegram.svg";
import {ReactComponent as YoutubeLogo} from "../../assets/icons/icon-frontpage-youtube.svg";
import {ReactComponent as DiscordLogo} from "../../assets/icons/icon-frontpage-discord.svg";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.decredDevs}>
                    <a href="https://github.com/decred" target="_blank" rel="noopener noreferrer" aria-label="Link to Decred Github">
                      Decred Developers
                    </a>
                </div>
                <div className={styles.column}>
                    <a href="https://decred.org/brand/" target="_blank" rel="noopener noreferrer">Brand Resources</a>
                    <a href="https://decred.org/news/" target="_blank" rel="noopener noreferrer">News</a>
                    <a href="https://decred.org/vsp/" target="_blank" rel="noopener noreferrer">Voting Service Providers</a>
                    <a href="https://docs.decred.org/contributing/overview/" target="_blank" rel="noopener noreferrer">Become a Contributor</a>
                </div>
                <div className={styles.column}>
                    <a href="https://docs.decred.org/research/overview/" target="_blank" rel="noopener noreferrer">Technical Overview</a>
                    <a href="https://dcrdata.decred.org/" target="_blank" rel="noopener noreferrer">Block Explorer</a>
                    <a href="https://timestamp.decred.org/" target="_blank" rel="noopener noreferrer">Timestamping Service</a>
                    <a href="https://bounty.decred.org/" target="_blank" rel="noopener noreferrer">Bug Bounty Program</a>
                </div>
                <div className={styles.socialMedia}>
                    <a href="https://github.com/decred/dcrtimegui" target="_blank" rel="noopener noreferrer" aria-label="Link to timestamply frontend github repo"><GithubLogo /></a>
                    <a href="https://twitter.com/decredproject" target="_blank" rel="noopener noreferrer" aria-label="Link to Decred official twitter"><TwitterLogo /></a>
                    <a href="https://medium.com/decred" target="_blank" rel="noopener noreferrer" aria-label="Link to Decred official medium blog"><MediumLogo /></a>
                    <a href="https://www.youtube.com/@DecredTV" target="_blank" rel="noopener noreferrer" aria-label="Link to Decred official youtube channel"><YoutubeLogo /></a>
                    <a href="https://discord.com/invite/dXSmwvYury" target="_blank" rel="noopener noreferrer" aria-label="Invite to join Decred official discord"><DiscordLogo /></a>
                    <a href="https://chat.decred.org/" target="_blank" rel="noopener noreferrer" aria-label="Invite to join Decred official matrix chat"><MatrixLogo /></a>
                    <a href="https://t.me/decred" target="_blank" rel="noopener noreferrer" aria-label="Invite to join Decred official telegram group"><TelegramLogo /></a>
                    <a href="https://www.reddit.com/r/decred" target="_blank" rel="noopener noreferrer" aria-label="Link to Decred subreddit"><RedditLogo /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
