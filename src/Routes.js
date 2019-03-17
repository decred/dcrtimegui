import React, { lazy } from "react";
import { Switch } from "react-router-dom";
import Route from "./components/RouteWrapper";

const Timestamp = lazy(() => import("./pages/Timestamp"));
const Results = lazy(() => import("./pages/Results"));

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Timestamp} />
    <Route exact path="/results" component={Results} />
  </Switch>
);

export default Routes;
