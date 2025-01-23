import React, { createContext, useContext, useState, ReactNode } from 'react';
import { themes } from 'constants/theme';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  themeConstants: typeof themes.light;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('dark');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const themeConstants = themes[theme];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeConstants }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
