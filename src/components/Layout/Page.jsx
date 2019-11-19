import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./Page.module.css";
import { Container, Main } from "pi-ui";

const Page = ({ children }) => {
  return (
    <>
      <Container className={styles.container} singleContent>
        <Header />
        <Main className={styles.pageMain}>
          <div className={styles.contentMain}>{children}</div>
        </Main>
      </Container>
      <Footer />
    </>
  );
};

Page.propTypes = {
  children: PropTypes.element
};

export default Page;
