import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  defaultLightTheme,
  ThemeProvider,
  DEFAULT_LIGHT_THEME_NAME,
  Spinner
} from "pi-ui";
import Routes from "./Routes";

const themes = {
  [DEFAULT_LIGHT_THEME_NAME]: defaultLightTheme
};

const App = () => {
  return (
    <ThemeProvider themes={themes} defaultThemeName={DEFAULT_LIGHT_THEME_NAME}>
      <Router>
        <Suspense fallback={<Spinner invert />}>
          <Routes />
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default App;
