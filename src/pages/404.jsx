import React from "react";
import Page from "src/components/Layout/Page";
import LatestHashes from "src/components/LatestHashesSection";
import {ReactComponent as NotFoundDark} from "../assets/icons/error404-dark.svg";
import {ReactComponent as NotFoundLight} from "../assets/icons/error404-light.svg";
import useTheme from "src/theme/useTheme";
import Button from "src/components/Button/Button";
import {ReactComponent as GoBack} from "../assets/icons/goback-button-arrow.svg";
import { useTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import styles from "./NotFound.module.css";

const ResultsPage = ({history}) => {
    const {theme} = useTheme();
    const {t} = useTranslation();
    const isDarkTheme = theme === "dark";
    return (
        <Page>
            <div className={styles.wrapper}>
                <div style={{marginBottom: "3.5rem"}} className={styles.notFound}>
                    {isDarkTheme ? <NotFoundDark width="100%"/> : <NotFoundLight />}
                </div>
                <Button kind="secondary" text={t("404.goToIndex")} Icon={GoBack} handleClick={() => history.push("/")}/>
            </div>
            <LatestHashes />
        </Page>
    );
};

export default withRouter(ResultsPage);
