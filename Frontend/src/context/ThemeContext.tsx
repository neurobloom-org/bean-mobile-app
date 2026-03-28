// src/context/ThemeContext.tsx
// ✅ Global dark/light theme — persists across app restarts

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LIGHT_COLORS, DARK_COLORS, ColorTheme } from '../constants/colors';

interface ThemeContextType {
  isDark: boolean;
  colors: ColorTheme;
  toggleTheme: (dark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  colors: LIGHT_COLORS,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  // Load saved preference on startup
  useEffect(() => {
    AsyncStorage.getItem('bean_theme').then(val => {
      if (val === 'dark') setIsDark(true);
    });
  }, []);

  const toggleTheme = (dark: boolean) => {
    setIsDark(dark);
    AsyncStorage.setItem('bean_theme', dark ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        colors: isDark ? DARK_COLORS : LIGHT_COLORS,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// ✅ This is the hook every screen will use
export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
