import {
  createContext,
  useEffect,
  useState
} from "react";

export const ThemeContext =
  createContext();

function ThemeProvider({
  children
}) {

  const [darkMode,
    setDarkMode] =
    useState(true);

  useEffect(() => {

    const saved =
      localStorage.getItem(
        "theme"
      );

    if (saved === "light") {

      setDarkMode(false);

      document.documentElement
      .classList.remove(
        "dark"
      );

    } else {

      setDarkMode(true);

      document.documentElement
      .classList.add(
        "dark"
      );
    }

  }, []);

  const toggleTheme = () => {

    const next =
      !darkMode;

    setDarkMode(next);

    if (next) {

      document.documentElement
      .classList.add(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );

    } else {

      document.documentElement
      .classList.remove(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "light"
      );
    }
  };

  return (

    <ThemeContext.Provider

      value={{
        darkMode,
        toggleTheme
      }}
    >

      {children}

    </ThemeContext.Provider>
  );
}

export default ThemeProvider;