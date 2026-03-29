// Global theme context that provides the active colour palette and a toggle function
// to every component in the tree. The selected theme is persisted to AsyncStorage
// so it survives app restarts.

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LIGHT_COLORS, DARK_COLORS, ColorTheme } from '../constants/colors';

// AsyncStorage key used to persist the user's theme preference.
const THEME_STORAGE_KEY = 'bean_theme';

interface ThemeContextType {
  // True when the dark theme is active.
  isDark: boolean;
  // The resolved colour palette for the current theme.
  colors: ColorTheme;
  // Switches the theme and persists the choice. Pass true for dark, false for light.
  toggleTheme: (dark: boolean) => void;
}

// Default context value used before the provider mounts.
const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  colors: LIGHT_COLORS,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  // Read the persisted preference once on mount and apply it immediately.
  useEffect(() => {
    AsyncStorage.getItem(THEME_STORAGE_KEY).then(val => {
      if (val === 'dark') setIsDark(true);
    });
  }, []);

  // Update state and write the new preference to storage.
  const toggleTheme = (dark: boolean) => {
    setIsDark(dark);
    AsyncStorage.setItem(THEME_STORAGE_KEY, dark ? 'dark' : 'light');
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

// Convenience hook consumed by every screen and component that needs theme values.
export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
