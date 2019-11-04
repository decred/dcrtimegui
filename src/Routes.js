import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";

const Timestamp = lazy(() => import("./pages/Timestamp"));
const Results = lazy(() => import("./pages/Results"));

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Timestamp} />
    <Route exact path="/results" component={Results} />
  </Switch>
);

export default Routes;
