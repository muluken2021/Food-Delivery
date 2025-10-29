import React, { createContext, useState, useEffect } from "react";

// Create context
export const ThemeContext2 = createContext();

// Provider component
export const ThemeProvider2 = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Update localStorage and HTML class when theme changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <ThemeContext2.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext2.Provider>
  );
};
