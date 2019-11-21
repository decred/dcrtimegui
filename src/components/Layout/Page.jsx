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
        <Footer />
      </Container>
    </>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired
};

export default Page;
