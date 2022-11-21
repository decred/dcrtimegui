import { createContext } from "react";

const ThemeContext = createContext({
  theme: "",
  themes: {},
  setThemeName: () => {}
});

export default ThemeContext;