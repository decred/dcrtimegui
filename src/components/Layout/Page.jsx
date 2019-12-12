import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./Page.module.css";
import { Container, Main } from "pi-ui";
import ErrorBoundary from "src/components/ErrorBoundary";

const Page = ({ children }) => {
  return (
    <>
      <Container singleContent className={styles.container}>
        <Header />
        <Main className={styles.pageMain}>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </Main>
        <Footer />
      </Container>
    </>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired
};

export default Page;
