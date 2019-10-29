import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { defaultLightTheme, useTheme } from "pi-ui";
import Routes from "./Routes";

const App = () => {
  useTheme(defaultLightTheme);
  return (
    <Router>
      <Suspense fallback={<div />}>
        <Routes />
      </Suspense>
    </Router>
  );
};

export default App;
