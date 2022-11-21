import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./Page.module.css";
import ErrorBoundary from "src/components/ErrorBoundary";

const Page = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.pageMain}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </div>
      <Footer />
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired
};

export default Page;
