import { Theme, ThemeContext } from "./ThemeContext";
import { useEffect, useState } from "react";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme as Theme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    window.localStorage.setItem("theme", newTheme);
  };

  const ProviderValue = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={ProviderValue}>
      {children}
    </ThemeContext.Provider>
  );
};
