import { useContext } from "react";
import ThemeContext from "./themeContext";

/**
 * Use theme hook can be used to get theme info or change themes
 * @returns {Object} Object with theme name, themes object and setTheme function
 */
const useTheme = () => useContext(ThemeContext) || {};

export default useTheme;