import React, { lazy, Suspense } from "react";
import { Header } from "cobra-ui";
import ErrorBoundary from "./components/ErrorBoundary";
import {
  Title,
  SubTitle,
  Main,
  CardWrapper
} from "./components/CommonComponents";

const AuthAndVerify = lazy(() => import("./components/AuthAndVerify"));

const App = () => {
  return (
    <div>
      <Header logo={<img alt="" src={"assets/lightlogo.svg"} />} />
      <ErrorBoundary>
        <Main>
          <CardWrapper>
            <div style={{ margin: "25px auto" }}>
              <Title>Timestamp</Title>
              <SubTitle>Timestamp your files with Blockchain.</SubTitle>
            </div>
            <Suspense fallback={<h4>Loading ...</h4>}>
              <AuthAndVerify />
            </Suspense>
          </CardWrapper>
        </Main>
      </ErrorBoundary>
    </div>
  );
};

export default App;
