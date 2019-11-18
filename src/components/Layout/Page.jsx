import React from "react";
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

export default Page;
