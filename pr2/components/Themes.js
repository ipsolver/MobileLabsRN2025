import React, { createContext, useContext, useState } from "react";
import { ThemeProvider } from "styled-components/native";

const lightTheme = {
  background: "#FFFFFF",
  text: "#000000",
  card: "#F8F8F8",
  post: "#888",
  headerSearch: "#000000",
  loger: "#808080",
  chat: "#ffffff",
};

const darkTheme = {
  background: "#1b2838",
  text: "#FFFFFF",
  card: "#1b2838",
  post: "#1E1E1E",
  headerSearch: "#808080",
  loger: "#aaa",
  chat: "#aaa",
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
