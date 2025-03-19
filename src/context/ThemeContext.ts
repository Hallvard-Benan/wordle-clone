import { createContext, useContext } from "react";

export type Theme = "light" | "dark";

export const ThemeContext = createContext({
  theme: "light" as Theme,
  toggleTheme: () => {},
});

export const useTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return { theme, toggleTheme };
};
