import React, { lazy, Suspense } from "react";
import { Header } from "cobra";
import ErrorBoundary from "./components/ErrorBoundary";
import { Title, SubTitle, Main } from "./components/CommonComponents";

const AuthAndVerify = lazy(() => import("./components/AuthAndVerify"));

const App = () => {
  return (
    <div
      style={{
        textAlign: "center",
        height: "100%"
      }}
    >
      <Header logo={"Auth It!"} />
      <ErrorBoundary>
        <Main>
          <div style={{ margin: "25px auto" }}>
            <Title>Auth It!</Title>
            <SubTitle>Authenticate your files with Blockchain.</SubTitle>
          </div>
          <Suspense fallback={<h4>Loading ...</h4>}>
            <AuthAndVerify />
          </Suspense>
        </Main>
      </ErrorBoundary>
    </div>
  );
};

export default App;
