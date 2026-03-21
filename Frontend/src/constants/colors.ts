// src/constants/colors.ts

export type ColorTheme = {
  PRIMARY: string;
  PRIMARY_DARK: string;
  PRIMARY_LIGHT: string;
  SECONDARY: string;
  SECONDARY_LIGHT: string;
  SECONDARY_DARK: string;
  SUCCESS: string;
  SUCCESS_LIGHT: string;
  ERROR: string;
  ERROR_LIGHT: string;
  WARNING: string;
  WARNING_LIGHT: string;
  INFO: string;
  INFO_LIGHT: string;
  WHITE: string;
  BLACK: string;
  GRAY_50: string;
  GRAY_100: string;
  GRAY_200: string;
  GRAY_300: string;
  GRAY_400: string;
  GRAY_500: string;
  GRAY_600: string;
  GRAY_700: string;
  GRAY_800: string;
  GRAY_900: string;
  TEXT_PRIMARY: string;
  TEXT_SECONDARY: string;
  TEXT_TERTIARY: string;
  TEXT_DISABLED: string;
  TEXT_INVERSE: string;
  BACKGROUND: string;
  BACKGROUND_LIGHT: string;
  BACKGROUND_DARK: string;
  SURFACE: string;
  BORDER: string;
  BORDER_LIGHT: string;
  BORDER_DARK: string;
  LINK: string;
  LINK_VISITED: string;
  SHADOW: string;
  TRANSPARENT: string;
};

export const LIGHT_COLORS: ColorTheme = {
  PRIMARY: '#4ECCA3',
  PRIMARY_DARK: '#3DA88A',
  PRIMARY_LIGHT: '#7FE4C4',
  SECONDARY: '#4CAF50',
  SECONDARY_LIGHT: '#E0F7F1',
  SECONDARY_DARK: '#2E7D32',
  SUCCESS: '#4CAF50',
  SUCCESS_LIGHT: '#E8F5E9',
  ERROR: '#E74C3C',
  ERROR_LIGHT: '#FFEBEE',
  WARNING: '#FFC107',
  WARNING_LIGHT: '#FFF9C4',
  INFO: '#2196F3',
  INFO_LIGHT: '#E3F2FD',
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
  TEXT_PRIMARY: '#000000',
  TEXT_SECONDARY: '#666666',
  TEXT_TERTIARY: '#999999',
  TEXT_DISABLED: '#BDBDBD',
  TEXT_INVERSE: '#FFFFFF',
  BACKGROUND: '#F0F9F6',
  BACKGROUND_LIGHT: '#F8F9FA',
  BACKGROUND_DARK: '#F5F5F5',
  SURFACE: '#FFFFFF',
  BORDER: '#E0E0E0',
  BORDER_LIGHT: '#F0F0F0',
  BORDER_DARK: '#D3D3D3',
  LINK: '#4169E1',
  LINK_VISITED: '#6A5ACD',
  SHADOW: '#000000',
  TRANSPARENT: 'transparent',
};

export const DARK_COLORS: ColorTheme = {
  PRIMARY: '#4ECCA3',
  PRIMARY_DARK: '#3DA88A',
  PRIMARY_LIGHT: '#7FE4C4',
  SECONDARY: '#4CAF50',
  SECONDARY_LIGHT: '#1A2E25', // ✅ darker green tint
  SECONDARY_DARK: '#2E7D32',
  SUCCESS: '#4ECCA3',
  SUCCESS_LIGHT: '#1A3A32',
  ERROR: '#FF6B6B',
  ERROR_LIGHT: '#3A1A1A',
  WARNING: '#FFD166',
  WARNING_LIGHT: '#3A2E00',
  INFO: '#60A5FA',
  INFO_LIGHT: '#1A2A3A',
  WHITE: '#1A1A2E',
  BLACK: '#FFFFFF',
  GRAY_50: '#141B2D', // ✅ deep navy
  GRAY_100: '#111827', // ✅ near black navy
  GRAY_200: '#1C2541',
  GRAY_300: '#1E2D45',
  GRAY_400: '#4A5568',
  GRAY_500: '#718096',
  GRAY_600: '#A0AEC0',
  GRAY_700: '#CBD5E0',
  GRAY_800: '#E2E8F0',
  GRAY_900: '#F7FAFC',
  TEXT_PRIMARY: '#F0F4FF', // ✅ bright white-blue text
  TEXT_SECONDARY: '#8892A4', // ✅ muted blue-grey
  TEXT_TERTIARY: '#4A5568',
  TEXT_DISABLED: '#2D3748',
  TEXT_INVERSE: '#000000',
  BACKGROUND: '#0B0F19', // ✅ exact Figma near-black background
  BACKGROUND_LIGHT: '#0D1117', // ✅ slightly lighter near-black
  BACKGROUND_DARK: '#080C12', // ✅ deepest black
  SURFACE: '#141E2E', // ✅ exact Figma dark blue card surface
  BORDER: '#1E2D45',
  BORDER_LIGHT: '#172035',
  BORDER_DARK: '#243552',
  LINK: '#7EB8FF',
  LINK_VISITED: '#B09FFF',
  SHADOW: '#000000',
  TRANSPARENT: 'transparent',
};

// ✅ Default COLORS still works for screens not yet migrated to useTheme()
export const COLORS = LIGHT_COLORS;

export const withOpacity = (color: string, opacity: number): string => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
