import React from "react";
import Header from "src/components/layout/Header";
import Footer from "src/components/layout/Footer";
import ErrorsBoundary from "src/components/ErrorBoundary";
import styles from "./layout.module.css";
import { Container, Main } from "pi-ui";

const Page = ({ children }) => {
  return (
    <>
      <Container className={styles.container} singleContent>
        <Header />
        <Main fill className={styles.pageMain}>
          <ErrorsBoundary>{children}</ErrorsBoundary>
        </Main>
      </Container>
      <Footer />
    </>
  );
};

export default Page;
