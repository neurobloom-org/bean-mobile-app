// Design-system tokens for spacing, border radii, icon sizes, button/input heights,
// and container dimensions. All values are in logical pixels.

// Base spacing scale used for padding, margins, and gaps throughout the app.
export const SPACING = {
  XXS: 2,
  XS: 4,
  SM: 8,
  MD: 12,
  LG: 16,
  XL: 20,
  XXL: 24,
  XXXL: 30,
  HUGE: 40,
  MASSIVE: 48,
} as const;

// Border radius presets. ROUND is intended for pill-shaped buttons;
// CIRCLE produces a fully circular element when applied to a square view.
export const BORDER_RADIUS = {
  NONE: 0,
  SM: 4,
  MD: 8,
  LG: 12,
  XL: 16,
  XXL: 20,
  ROUND: 30,
  CIRCLE: 9999,
} as const;

// Standard icon dimensions matched to common touch-target sizes.
export const ICON_SIZES = {
  XS: 16,
  SM: 20,
  MD: 24,
  LG: 32,
  XL: 40,
  XXL: 48,
} as const;

// Fixed height values for button components across the three size variants.
export const BUTTON_HEIGHTS = {
  SMALL: 36,
  MEDIUM: 44,
  LARGE: 52,
} as const;

// Fixed height values for text input components across the three size variants.
export const INPUT_HEIGHTS = {
  SMALL: 36,
  MEDIUM: 44,
  LARGE: 52,
} as const;

// Layout constraints for content containers.
export const CONTAINER = {
  MAX_WIDTH: 600, // Prevents content from stretching too wide on large screens.
  PADDING: 20, // Default horizontal inset applied to screen-level containers.
} as const;

// Default screen-edge insets applied at the outermost layout level.
export const SCREEN_PADDING = {
  HORIZONTAL: 20,
  VERTICAL: 16,
} as const;
