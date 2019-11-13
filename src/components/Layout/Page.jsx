import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./Layout.module.css";
import { Container, Main } from "pi-ui";

const Page = ({ children }) => {
  return (
    <>
      <Container className={styles.container} singleContent>
        <Header />
        <Main fill className={styles.pageMain}>
          {children}
        </Main>
      </Container>
      <Footer />
    </>
  );
};

export default Page;
