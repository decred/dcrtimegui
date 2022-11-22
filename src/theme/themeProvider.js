import React, {
    useState,
    useLayoutEffect,
    useMemo
} from "react";
import ThemeContext from "./themeContext";
import PropTypes from "prop-types";

/**
   * This function goes through all theme properties and create CSS variables
   * that can be used in style files. This also has the advantage to not trigger
   * a re-render on theme change.
   * @param {string} theme
   */
function applyTheme(theme) {
    Object.keys(theme).forEach((key) => {
        document.documentElement.style.setProperty(`--${key}`, theme[key]);
    });
}

function validateTheme(theme, themesAllowed) {
    if (typeof theme !== "string" || !themesAllowed.find(el => el === theme)) {
        throw new Error(`Theme should be one of: ${themesAllowed.join(", ")}`);
    }
}

const ThemeProvider = ({
    themes,
    defaultTheme,
    children
}) => {
    const [theme, setTheme] = useState(defaultTheme);
    const themesAllowed = Object.keys(themes);
    validateTheme(theme, themesAllowed);
    const setThemeWithValidation = (theme) => {
        validateTheme(theme, themesAllowed);
        setTheme(theme);
    };
    const themeProperties = useMemo(() => themes[theme], [themes, theme]);
    useLayoutEffect(() => {
        applyTheme(themeProperties);
    }, [themeProperties]);

    return (
        <ThemeContext.Provider
            value={{
                setTheme: setThemeWithValidation,
                theme,
                themes
            }}>
            {children}
        </ThemeContext.Provider>
    );
};

ThemeProvider.propTypes = {
    themes: PropTypes.object.isRequired,
    defaultTheme: PropTypes.string.isRequired,
    children: PropTypes.node
};

export default ThemeProvider;