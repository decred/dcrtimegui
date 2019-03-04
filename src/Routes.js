import React, { lazy } from "react";
import { Switch } from "react-router-dom";
import Route from "./components/RouteWrapper";

const Timestamp = lazy(() => import("./pages/Timestamp"));

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Timestamp} />
  </Switch>
);

export default Routes;
