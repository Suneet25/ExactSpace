import React, { createContext, useContext, useState } from "react";

let ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  let [theme, setTheme] = useState("light");

  let toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  let themeValue = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
};

//customHook for sharing the theme
export let useTheme = () => {
  return useContext(ThemeContext);
};
export default ThemeContextProvider;
