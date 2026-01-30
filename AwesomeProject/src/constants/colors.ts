// src/constants/colors.ts
// Complete color palette for the Bean app

export const COLORS = {
  // Primary Brand Colors
  PRIMARY: '#4ECCA3', // Main green color
  PRIMARY_DARK: '#3DA88A', // Darker green
  PRIMARY_LIGHT: '#7FE4C4', // Lighter green

  // Secondary Colors
  SECONDARY: '#4CAF50', // Secondary green
  SECONDARY_LIGHT: '#E0F7F1', // Very light green background
  SECONDARY_DARK: '#2E7D32', // Dark green

  // Success/Error/Warning/Info
  SUCCESS: '#4CAF50', // Success green
  SUCCESS_LIGHT: '#E8F5E9', // Light success background
  ERROR: '#E74C3C', // Error red
  ERROR_LIGHT: '#FFEBEE', // Light error background
  WARNING: '#FFC107', // Warning yellow
  WARNING_LIGHT: '#FFF9C4', // Light warning background
  INFO: '#2196F3', // Info blue
  INFO_LIGHT: '#E3F2FD', // Light info background

  // Grayscale
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GRAY_50: '#F5F5F5', // Lightest gray
  GRAY_100: '#F0F0F0',
  GRAY_200: '#E0E0E0',
  GRAY_300: '#D3D3D3',
  GRAY_400: '#999999',
  GRAY_500: '#757575',
  GRAY_600: '#666666',
  GRAY_700: '#4A4A4A',
  GRAY_800: '#333333',
  GRAY_900: '#1A1A1A', // Darkest gray

  // Text Colors
  TEXT_PRIMARY: '#000000', // Main text color
  TEXT_SECONDARY: '#666666', // Secondary text
  TEXT_TERTIARY: '#999999', // Tertiary text
  TEXT_DISABLED: '#BDBDBD', // Disabled text
  TEXT_INVERSE: '#FFFFFF', // Text on dark backgrounds

  // Background Colors
  BACKGROUND: '#F0F9F6', // Main app background
  BACKGROUND_LIGHT: '#F8F9FA', // Light background
  BACKGROUND_DARK: '#F5F5F5', // Dark background
  SURFACE: '#FFFFFF', // Card/surface background

  // Border Colors
  BORDER: '#E0E0E0', // Default border
  BORDER_LIGHT: '#F0F0F0', // Light border
  BORDER_DARK: '#D3D3D3', // Dark border

  // Link Colors
  LINK: '#4169E1', // Link blue
  LINK_VISITED: '#6A5ACD', // Visited link

  // Shadow Colors
  SHADOW: '#000000', // Shadow color (use with opacity)

  // Transparent
  TRANSPARENT: 'transparent',
} as const;

// Helper function to add opacity to colors
export const withOpacity = (color: string, opacity: number): string => {
  // Converts hex to rgba with opacity
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Example usage:
// backgroundColor: withOpacity(COLORS.PRIMARY, 0.5) // 50% opacity
