import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { defaultLightTheme, useTheme, Spinner } from "pi-ui";
import Routes from "./Routes";

const App = () => {
  useTheme(defaultLightTheme);
  return (
    <Router>
      <Suspense fallback={<Spinner invert />}>
        <Routes />
      </Suspense>
    </Router>
  );
};

export default App;
