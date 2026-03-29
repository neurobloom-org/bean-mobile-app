// Shared style fragments reused across multiple screens.
// Spread these into StyleSheet.create() objects rather than copying values manually.

import { StyleSheet } from 'react-native';
import { SPACING, TYPOGRAPHY } from '../constants';
import { BORDER_RADIUS } from '../constants/spacing';

export const globalStyles = StyleSheet.create({
  // Full-screen safe-area container
  screen: {
    flex: 1,
  },

  // Standard scrollable content padding
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.LG,
    paddingBottom: SPACING.MASSIVE,
  },

  // Centred scrollable content (used in auth screens)
  scrollContentCentered: {
    flexGrow: 1,
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.XL,
    paddingBottom: SPACING.XXL,
    alignItems: 'center',
  },

  // Standard screen header row
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
    borderBottomWidth: 1,
  },

  // Back button hit area
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },

  // Rounded card with elevation
  card: {
    borderRadius: BORDER_RADIUS.XL,
    padding: SPACING.LG,
    elevation: 2,
  },

  // Row with space-between alignment
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // Centred row
  rowCentered: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Full-width primary action button
  primaryBtn: {
    width: '100%',
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: SPACING.LG,
    alignItems: 'center',
    elevation: 5,
  },

  // Hairline divider
  divider: {
    height: 1,
  },

  // Section heading
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    marginBottom: SPACING.MD,
  },

  // Caption text centred at the bottom of a screen
  footerCaption: {
    ...TYPOGRAPHY.CAPTION,
    textAlign: 'center',
    marginTop: SPACING.SM,
  },
});
