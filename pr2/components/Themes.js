import React, { createContext, useContext, useState } from "react";
import { ThemeProvider } from "styled-components/native";

const lightTheme = {
  background: "#FFFFFF",
  text: "#000000",
  card: "#F8F8F8",
  cardSecondary: "#E0E0E0",
  primary: "#1E90FF",
  headerSearch: "#000000",
  loger: "#808080",
  secondaryText: "#444444",
};

const darkTheme = {
  background: "#1b2838",
  text: "#FFFFFF",
  card: "#252525",
  cardSecondary: "#2E2E2E",
  primary: "#1E90FF",
  headerSearch: "#808080",
  loger: "#aaa",
  secondaryText: "#AAAAAA",
};

const ThemeContext = createContext();

export const ThemeProviderComponent = ({ children }) => {
  const [theme, setTheme] = useState(darkTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
