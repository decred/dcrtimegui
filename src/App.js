import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";

const App = () => {
  return (
    <Router>
      <Suspense fallback={"Loading..."}>
        <Routes />
      </Suspense>
    </Router>
  );
};

export default App;
