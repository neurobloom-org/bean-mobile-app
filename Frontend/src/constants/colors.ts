// Defines the full colour token set for both light and dark themes.
// All screens consume colours via useTheme() rather than importing directly,
// which allows the theme to switch at runtime without a restart.

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

// Light theme palette.
// Used as the default when the user has not selected dark mode.
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

// Dark theme palette.
// Grey scale follows the Tailwind CSS slate ramp so that elevation levels
// remain visually consistent (darker = lower, lighter = higher surface).
export const DARK_COLORS: ColorTheme = {
  PRIMARY: '#4ECCA3',
  PRIMARY_DARK: '#3DA88A',
  PRIMARY_LIGHT: '#7FE4C4',
  SECONDARY: '#4CAF50',
  SECONDARY_LIGHT: '#162520', // Dark green tint used for badge backgrounds
  SECONDARY_DARK: '#2E7D32',
  SUCCESS: '#4ECCA3',
  SUCCESS_LIGHT: '#162520',
  ERROR: '#FF6B6B',
  ERROR_LIGHT: '#3A1A1A',
  WARNING: '#FFD166',
  WARNING_LIGHT: '#3A2E00',
  INFO: '#60A5FA',
  INFO_LIGHT: '#1A2A3A',
  WHITE: '#F8FAFC', // Near-white used for text on dark surfaces
  BLACK: '#FFFFFF',
  GRAY_50: '#0F172A', // Tailwind slate-900
  GRAY_100: '#1E293B', // Tailwind slate-800
  GRAY_200: '#334155', // Tailwind slate-700
  GRAY_300: '#475569', // Tailwind slate-600
  GRAY_400: '#64748B', // Tailwind slate-500
  GRAY_500: '#94A3B8', // Tailwind slate-400
  GRAY_600: '#CBD5E1', // Tailwind slate-300
  GRAY_700: '#E2E8F0', // Tailwind slate-200
  GRAY_800: '#F1F5F9', // Tailwind slate-100
  GRAY_900: '#F8FAFC', // Tailwind slate-50
  TEXT_PRIMARY: '#F1F5F9', // slate-100 — primary readable text
  TEXT_SECONDARY: '#94A3B8', // slate-400 — supporting text
  TEXT_TERTIARY: '#64748B', // slate-500 — placeholder and hint text
  TEXT_DISABLED: '#334155', // slate-700 — non-interactive text
  TEXT_INVERSE: '#0F172A',
  BACKGROUND: '#0F172A', // slate-900 — base screen background
  BACKGROUND_LIGHT: '#0F172A', // matches BACKGROUND; kept separate for semantic clarity
  BACKGROUND_DARK: '#020617', // slate-950 — deepest background layer
  SURFACE: '#1E293B', // slate-800 — card and modal surface
  BORDER: '#334155', // slate-700
  BORDER_LIGHT: '#1E293B', // slate-800 — subtle dividers on surface
  BORDER_DARK: '#475569', // slate-600 — stronger borders
  LINK: '#7EB8FF',
  LINK_VISITED: '#B09FFF',
  SHADOW: '#000000',
  TRANSPARENT: 'transparent',
};

// Convenience alias pointing to LIGHT_COLORS.
// Used by legacy screens that import COLORS directly instead of using useTheme().
export const COLORS = LIGHT_COLORS;

// Converts a hex colour string to an rgba value with the given opacity (0–1).
export const withOpacity = (color: string, opacity: number): string => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
