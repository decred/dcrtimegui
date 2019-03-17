import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import ErrorsBoundary from "./ErrorBoundary";
import Header from "./Header";

const RouteWrapper = ({ component: Component, ...props }) => {
  return (
    <Route
      {...props}
      render={props => (
        <Suspense
          fallback={
            <div style={{ width: "100%", textAlign: "center" }}>
              <h3>Loading ...</h3>
            </div>
          }
        >
          <Header {...props} />
          <ErrorsBoundary>
            <Component {...props} />
          </ErrorsBoundary>
        </Suspense>
      )}
    />
  );
};

export default RouteWrapper;
