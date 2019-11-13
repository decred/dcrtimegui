import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";

const TimestampPage = lazy(() => import("./pages/Timestamp"));
const ResultsPage = lazy(() => import("./pages/Results"));

const Routes = () => (
  <Switch>
    <Route exact path="/" component={TimestampPage} />
    <Route exact path="/results" component={ResultsPage} />
  </Switch>
);

export default Routes;
