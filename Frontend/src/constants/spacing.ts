// src/constants/spacing.ts
// Spacing system for consistent padding, margins, and sizing

export const SPACING = {
  // Base spacing scale
  XXS: 2, // 2px
  XS: 4, // 4px
  SM: 8, // 8px
  MD: 12, // 12px
  LG: 16, // 16px
  XL: 20, // 20px
  XXL: 24, // 24px
  XXXL: 30, // 30px
  HUGE: 40, // 40px
  MASSIVE: 48, // 48px
} as const;

// Border Radius
export const BORDER_RADIUS = {
  NONE: 0,
  SM: 4,
  MD: 8,
  LG: 12,
  XL: 16,
  XXL: 20,
  ROUND: 30, // For rounded buttons
  CIRCLE: 9999, // For circular elements
} as const;

// Icon Sizes
export const ICON_SIZES = {
  XS: 16,
  SM: 20,
  MD: 24,
  LG: 32,
  XL: 40,
  XXL: 48,
} as const;

// Button Heights
export const BUTTON_HEIGHTS = {
  SMALL: 36,
  MEDIUM: 44,
  LARGE: 52,
} as const;

// Input Heights
export const INPUT_HEIGHTS = {
  SMALL: 36,
  MEDIUM: 44,
  LARGE: 52,
} as const;

// Container Widths
export const CONTAINER = {
  MAX_WIDTH: 600, // Maximum width for content containers
  PADDING: 20, // Default container padding
} as const;

// Screen Padding
export const SCREEN_PADDING = {
  HORIZONTAL: 20,
  VERTICAL: 16,
} as const;
