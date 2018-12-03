import React, { lazy, Suspense } from "react";
import { Header, Tabs, TabButtons, TabButton, TabItems, TabItem } from "cobra";
import ErrorBoundary from "./components/ErrorBoundary";
import { Title, SubTitle, Main } from "./components/CommonComponents";

const AuthenticateTab = lazy(() => import("./components/AuthenticateTab"));
const VerifyTab = lazy(() => import("./components/VerifyTab"));

const appTabs = [
  {
    title: "Authenticate",
    contents: <AuthenticateTab />
  },
  {
    title: "Verify",
    contents: <VerifyTab />
  }
];

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
          <Tabs>
            {({ selectedItem, handleItemClick }) => (
              <React.Fragment>
                <TabButtons>
                  {appTabs.map((item, index) => (
                    <TabButton
                      width={100 / appTabs.length}
                      key={item.title}
                      isSelected={selectedItem === index}
                      onClick={() => handleItemClick(index)}
                    >
                      {item.title}
                    </TabButton>
                  ))}
                </TabButtons>
                <TabItems>
                  {appTabs.map((item, index) => (
                    <TabItem key={index} isSelected={selectedItem === index}>
                      <ErrorBoundary>
                        <Suspense fallback="Loading ...">
                          {item.contents}
                        </Suspense>
                      </ErrorBoundary>
                    </TabItem>
                  ))}
                </TabItems>
              </React.Fragment>
            )}
          </Tabs>
        </Main>
      </ErrorBoundary>
    </div>
  );
};

export default App;
