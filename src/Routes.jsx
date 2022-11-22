import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";

const TimestampPage = lazy(() => import("./pages/Timestamp"));
const ResultsPage = lazy(() => import("./pages/Results"));
const VerifyPage = lazy(() => import("./pages/Verify"));

const Routes = () => (
    <Switch>
        <Route exact path="/" component={TimestampPage} />
        <Route exact path="/timestamp" component={TimestampPage} />
        <Route exact path="/verify" component={VerifyPage} />
        <Route exact path="/results" component={ResultsPage} />
    </Switch>
);

export default Routes;
