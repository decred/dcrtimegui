import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import ErrorBoundary from "./components/ErrorBoundary";
import ThemeProvider from "./theme/themeProvider";
import lightTheme from "./theme/lightTheme";
import darkTheme from "./theme/darkTheme";
import LoadingSkeleton from "./components/Loading";
import ScrollToTop from "./components/ScrollToTop";
import "./i18n";

const themes = {
    "light": lightTheme,
    "dark": darkTheme
};

const App = () => {
    const theme = localStorage.getItem("theme");
    return (
        <ErrorBoundary>
            <ThemeProvider themes={themes} defaultTheme={theme || "dark"}>
                <Router>
                    <ScrollToTop>
                        <Suspense fallback={<LoadingSkeleton />}>
                            <Routes />
                        </Suspense>
                    </ScrollToTop>
                </Router>
            </ThemeProvider>
        </ErrorBoundary>
    );
};

export default App;
