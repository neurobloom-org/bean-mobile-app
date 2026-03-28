// Design-system tokens for font sizes, weights, line heights, and
// pre-composed text style presets. Spread a preset into a StyleSheet
// object to apply a consistent typographic role, e.g.:
//   title: { ...TYPOGRAPHY.H1, color: colors.TEXT_PRIMARY }

// Numeric font-size scale in logical pixels.
export const FONT_SIZES = {
  XS: 10,
  SM: 12,
  MD: 14,
  LG: 16,
  XL: 18,
  XXL: 20,
  XXXL: 24,
  HUGE: 28,
  MASSIVE: 32,
} as const;

// String weight values compatible with React Native's fontWeight prop.
export const FONT_WEIGHTS = {
  LIGHT: '300',
  REGULAR: '400',
  MEDIUM: '500',
  SEMIBOLD: '600',
  BOLD: '700',
  EXTRABOLD: '800',
} as const;

// Unitless line-height multipliers. Apply by multiplying against the font size
// when an absolute lineHeight value is needed.
export const LINE_HEIGHTS = {
  TIGHT: 1.2,
  NORMAL: 1.5,
  RELAXED: 1.75,
  LOOSE: 2,
} as const;

// Pre-composed style presets covering headings, body text, UI controls,
// labels, captions, and input fields.
export const TYPOGRAPHY = {
  // ── Headings ──────────────────────────────────────────────────────────────

  H1: {
    fontSize: FONT_SIZES.HUGE, // 28
    fontWeight: FONT_WEIGHTS.BOLD, // 700
    lineHeight: 34,
  },
  H2: {
    fontSize: FONT_SIZES.XXXL, // 24
    fontWeight: FONT_WEIGHTS.BOLD, // 700
    lineHeight: 30,
  },
  H3: {
    fontSize: FONT_SIZES.XXL, // 20
    fontWeight: FONT_WEIGHTS.BOLD, // 700
    lineHeight: 26,
  },
  H4: {
    fontSize: FONT_SIZES.XL, // 18
    fontWeight: FONT_WEIGHTS.SEMIBOLD, // 600
    lineHeight: 24,
  },

  // ── Body Text ─────────────────────────────────────────────────────────────

  BODY_LARGE: {
    fontSize: FONT_SIZES.LG, // 16
    fontWeight: FONT_WEIGHTS.REGULAR, // 400
    lineHeight: 24,
  },
  BODY: {
    fontSize: FONT_SIZES.MD, // 14
    fontWeight: FONT_WEIGHTS.REGULAR, // 400
    lineHeight: 20,
  },
  BODY_SMALL: {
    fontSize: FONT_SIZES.SM, // 12
    fontWeight: FONT_WEIGHTS.REGULAR, // 400
    lineHeight: 18,
  },

  // ── Button Labels ─────────────────────────────────────────────────────────

  BUTTON_LARGE: {
    fontSize: FONT_SIZES.XL, // 18
    fontWeight: FONT_WEIGHTS.SEMIBOLD, // 600
    lineHeight: 24,
  },
  BUTTON_MEDIUM: {
    fontSize: FONT_SIZES.LG, // 16
    fontWeight: FONT_WEIGHTS.SEMIBOLD, // 600
    lineHeight: 22,
  },
  BUTTON_SMALL: {
    fontSize: FONT_SIZES.MD, // 14
    fontWeight: FONT_WEIGHTS.SEMIBOLD, // 600
    lineHeight: 20,
  },

  // ── Labels & Captions ─────────────────────────────────────────────────────

  // Form field labels and secondary headings.
  LABEL: {
    fontSize: FONT_SIZES.MD, // 14
    fontWeight: FONT_WEIGHTS.MEDIUM, // 500
    lineHeight: 20,
  },
  // Supporting text, timestamps, and footnotes.
  CAPTION: {
    fontSize: FONT_SIZES.SM, // 12
    fontWeight: FONT_WEIGHTS.REGULAR, // 400
    lineHeight: 16,
  },

  // ── Input Fields ──────────────────────────────────────────────────────────

  INPUT: {
    fontSize: FONT_SIZES.LG, // 16
    fontWeight: FONT_WEIGHTS.REGULAR, // 400
    lineHeight: 22,
  },
} as const;
