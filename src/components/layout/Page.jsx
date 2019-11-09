import React from "react";
import Header from "src/components/layout/Header";
import Footer from "src/components/layout/Footer";
import styles from "./layout.module.css";
import { Container, Main } from "pi-ui";

const Page = ({ children }) => {
  return (
    <>
      <Container className={styles.container} singleContent>
        <Header className={styles.header} />
        <Main fill className={styles.pageMain}>
          {children}
        </Main>
      </Container>
      <Footer />
    </>
  );
};

export default Page;
