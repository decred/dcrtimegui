import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./Page.module.css";
import ErrorBoundary from "src/components/ErrorBoundary";
import useTheme from "src/theme/useTheme";

const Page = ({ children }) => {
    const {theme} = useTheme();
    const isDarkTheme = theme === "dark";
    const containerClass = isDarkTheme ? styles.containerDark : styles.containerLight;
    const mainClass = isDarkTheme ? styles.mainDark : styles.mainLight;
    return (
	      <div className={containerClass}>
            <Header />
            <div className={mainClass}>
                <div className={styles.mainContainer}>
                    <ErrorBoundary>
                        {children}
                    </ErrorBoundary>
                </div>
            </div>
            <Footer />
        </div>
    );
};

Page.propTypes = {
    children: PropTypes.node.isRequired
};

export default Page;
