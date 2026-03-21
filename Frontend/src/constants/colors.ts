// src/constants/colors.ts
// ✅ Light + Dark theme tokens

export const LIGHT_COLORS = {
  // Brand
  PRIMARY: '#4ECCA3',
  PRIMARY_DARK: '#3DA88A',
  PRIMARY_LIGHT: '#7FE4C4',

  SECONDARY: '#4CAF50',
  SECONDARY_LIGHT: '#E0F7F1',
  SECONDARY_DARK: '#2E7D32',

  // Status
  SUCCESS: '#4CAF50',
  SUCCESS_LIGHT: '#E8F5E9',
  ERROR: '#E74C3C',
  ERROR_LIGHT: '#FFEBEE',
  WARNING: '#FFC107',
  WARNING_LIGHT: '#FFF9C4',
  INFO: '#2196F3',
  INFO_LIGHT: '#E3F2FD',

  // Base
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GRAY_50: '#F5F5F5',
  GRAY_100: '#F0F0F0',
  GRAY_200: '#E0E0E0',
  GRAY_300: '#D3D3D3',
  GRAY_400: '#999999',
  GRAY_500: '#757575',
  GRAY_600: '#666666',
  GRAY_700: '#4A4A4A',
  GRAY_800: '#333333',
  GRAY_900: '#1A1A1A',

  // Text
  TEXT_PRIMARY: '#000000',
  TEXT_SECONDARY: '#666666',
  TEXT_TERTIARY: '#999999',
  TEXT_DISABLED: '#BDBDBD',
  TEXT_INVERSE: '#FFFFFF',

  // Backgrounds
  BACKGROUND: '#F0F9F6',
  BACKGROUND_LIGHT: '#F8F9FA',
  BACKGROUND_DARK: '#F5F5F5',
  SURFACE: '#FFFFFF',

  // Borders
  BORDER: '#E0E0E0',
  BORDER_LIGHT: '#F0F0F0',
  BORDER_DARK: '#D3D3D3',

  // Links
  LINK: '#4169E1',
  LINK_VISITED: '#6A5ACD',

  SHADOW: '#000000',
  TRANSPARENT: 'transparent',
} as const;

export const DARK_COLORS = {
  // Brand — stays the same green, it pops on dark
  PRIMARY: '#4ECCA3',
  PRIMARY_DARK: '#3DA88A',
  PRIMARY_LIGHT: '#7FE4C4',

  SECONDARY: '#4CAF50',
  SECONDARY_LIGHT: '#1A3A32', // dark teal tint
  SECONDARY_DARK: '#2E7D32',

  // Status
  SUCCESS: '#4ECCA3',
  SUCCESS_LIGHT: '#1A3A32',
  ERROR: '#FF6B6B',
  ERROR_LIGHT: '#3A1A1A',
  WARNING: '#FFD166',
  WARNING_LIGHT: '#3A2E00',
  INFO: '#60A5FA',
  INFO_LIGHT: '#1A2A3A',

  // Base
  WHITE: '#1A1A2E', // "white" in dark = dark navy
  BLACK: '#FFFFFF', // "black" in dark = white text
  GRAY_50: '#16213E',
  GRAY_100: '#1A1A2E',
  GRAY_200: '#222244',
  GRAY_300: '#2A2A4A',
  GRAY_400: '#666688',
  GRAY_500: '#8888AA',
  GRAY_600: '#AAAACC',
  GRAY_700: '#CCCCEE',
  GRAY_800: '#E0E0FF',
  GRAY_900: '#F0F0FF',

  // Text
  TEXT_PRIMARY: '#E0E0FF',
  TEXT_SECONDARY: '#AAAACC',
  TEXT_TERTIARY: '#666688',
  TEXT_DISABLED: '#444466',
  TEXT_INVERSE: '#000000',

  // Backgrounds — deep dark navy like the Figma
  BACKGROUND: '#0D0D1A',
  BACKGROUND_LIGHT: '#12121F',
  BACKGROUND_DARK: '#0A0A14',
  SURFACE: '#16213E',

  // Borders
  BORDER: '#2A2A4A',
  BORDER_LIGHT: '#1E1E3A',
  BORDER_DARK: '#333355',

  // Links
  LINK: '#7EB8FF',
  LINK_VISITED: '#B09FFF',

  SHADOW: '#000000',
  TRANSPARENT: 'transparent',
} as const;

// ✅ Default export stays as COLORS — points to light by default
// Components that haven't migrated to useTheme() still work
export const COLORS = LIGHT_COLORS;

export type ColorTheme = typeof LIGHT_COLORS;

export const withOpacity = (color: string, opacity: number): string => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
