import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { defaultLightTheme, useTheme, Spinner } from "pi-ui";
import Routes from "./Routes";
import ErrorsBoundary from "src/components/ErrorBoundary";

const App = () => {
  useTheme(defaultLightTheme);
  return (
    <Router>
      <Suspense fallback={<Spinner invert />}>
        <ErrorsBoundary>
          <Routes />
        </ErrorsBoundary>
        >
      </Suspense>
    </Router>
  );
};

export default App;
