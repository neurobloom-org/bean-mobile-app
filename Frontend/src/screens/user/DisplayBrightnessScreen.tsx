// Appearance and brightness settings screen. Selecting Light or Dark applies
// the theme immediately across the entire app via toggleTheme. The brightness
// slider and True Tone switch are static UI placeholders pending system API
// integration.

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { SPACING } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';

const DisplayBrightnessScreen = ({ navigation }: any) => {
  const { isDark, colors, toggleTheme } = useTheme();

  // Local selection mirrors the active theme so the correct card is highlighted on mount.
  const [selected, setSelected] = useState<'light' | 'dark'>(
    isDark ? 'dark' : 'light',
  );
  const [auto, setAuto] = useState(false);
  const [trueTone, setTrueTone] = useState(true);

  // Applies the selected theme globally and updates the local highlight state.
  const handleSelect = (mode: 'light' | 'dark') => {
    setSelected(mode);
    toggleTheme(mode === 'dark');
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.BACKGROUND_LIGHT }]}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.SURFACE,
            borderBottomColor: colors.BORDER_LIGHT,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={[styles.backIcon, { color: colors.TEXT_PRIMARY }]}>
            ‹
          </Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.TEXT_PRIMARY }]}>
          Display & Brightness
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Appearance section */}
        <Text style={[styles.sectionLabel, { color: colors.TEXT_TERTIARY }]}>
          APPEARANCE
        </Text>

        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.SURFACE,
              borderColor: colors.BORDER_LIGHT,
            },
          ]}
        >
          {/* Side-by-side Light / Dark selector cards */}
          <View style={styles.themeRow}>
            {/* Light mode card — fixed light background so the mockup always reads correctly */}
            <TouchableOpacity
              style={[
                styles.themeBox,
                { backgroundColor: '#F0F0F0' },
                selected === 'light' && {
                  borderColor: colors.PRIMARY,
                  borderWidth: 2.5,
                },
              ]}
              onPress={() => handleSelect('light')}
              activeOpacity={0.85}
            >
              {/* Simplified phone UI mockup representing the light theme */}
              <View style={styles.mockupLight}>
                <View style={styles.mockupBarLight} />
                <View style={styles.mockupLineLight} />
                <View style={styles.mockupLineLight} />
                <View
                  style={[
                    styles.mockupLineLight,
                    { width: '55%', backgroundColor: '#4ECCA3', height: 8 },
                  ]}
                />
              </View>
              <View style={styles.labelRow}>
                <Text style={styles.lightLabel}>Light</Text>
                {selected === 'light' && (
                  <View
                    style={[
                      styles.checkCircle,
                      { backgroundColor: colors.PRIMARY },
                    ]}
                  >
                    <Text style={styles.checkText}>✓</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>

            {/* Dark mode card — fixed dark background so the mockup always reads correctly */}
            <TouchableOpacity
              style={[
                styles.themeBox,
                { backgroundColor: '#2A2A3A' },
                selected === 'dark' && {
                  borderColor: colors.PRIMARY,
                  borderWidth: 2.5,
                },
              ]}
              onPress={() => handleSelect('dark')}
              activeOpacity={0.85}
            >
              {/* Simplified phone UI mockup representing the dark theme */}
              <View style={styles.mockupDark}>
                <View style={styles.mockupBarDark} />
                <View style={styles.mockupLineDark} />
                <View style={styles.mockupLineDark} />
                <View
                  style={[
                    styles.mockupLineDark,
                    { width: '55%', backgroundColor: '#4ECCA3', height: 8 },
                  ]}
                />
              </View>
              <View style={styles.labelRow}>
                <Text style={styles.darkLabel}>Dark</Text>
                {selected === 'dark' && (
                  <View
                    style={[
                      styles.checkCircle,
                      { backgroundColor: colors.PRIMARY },
                    ]}
                  >
                    <Text style={styles.checkText}>✓</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={[styles.divider, { backgroundColor: colors.BORDER_LIGHT }]}
          />

          {/* Automatic toggle — reserved for system-level dark mode following */}
          <View style={styles.toggleRow}>
            <Text style={[styles.toggleLabel, { color: colors.TEXT_PRIMARY }]}>
              Automatic
            </Text>
            <Switch
              value={auto}
              onValueChange={setAuto}
              trackColor={{ false: colors.BORDER, true: colors.PRIMARY }}
              thumbColor={colors.WHITE}
            />
          </View>
        </View>

        {/* Brightness section */}
        <Text
          style={[
            styles.sectionLabel,
            { color: colors.TEXT_TERTIARY, marginTop: SPACING.XL },
          ]}
        >
          BRIGHTNESS
        </Text>

        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.SURFACE,
              borderColor: colors.BORDER_LIGHT,
            },
          ]}
        >
          {/* Static brightness slider — small sun on left, large on right to indicate range */}
          <View style={styles.sliderRow}>
            <Text style={[styles.sunSmall, { color: colors.TEXT_TERTIARY }]}>
              ☀
            </Text>
            <View
              style={[styles.sliderTrack, { backgroundColor: colors.BORDER }]}
            >
              {/* Filled portion of the track set at 65% for the default visual */}
              <View
                style={[styles.sliderFill, { backgroundColor: colors.PRIMARY }]}
              />
              <View
                style={[
                  styles.sliderThumb,
                  { backgroundColor: colors.PRIMARY },
                ]}
              />
            </View>
            <Text style={[styles.sunLarge, { color: colors.TEXT_PRIMARY }]}>
              ☀
            </Text>
          </View>

          <View
            style={[styles.divider, { backgroundColor: colors.BORDER_LIGHT }]}
          />

          {/* True Tone toggle — adapts white balance to ambient lighting */}
          <View style={styles.toggleRow}>
            <View>
              <Text
                style={[styles.toggleLabel, { color: colors.TEXT_PRIMARY }]}
              >
                True Tone
              </Text>
              <Text style={[styles.toggleSub, { color: colors.TEXT_TERTIARY }]}>
                Adapt display based on lighting
              </Text>
            </View>
            <Switch
              value={trueTone}
              onValueChange={setTrueTone}
              trackColor={{ false: colors.BORDER, true: colors.PRIMARY }}
              thumbColor={colors.WHITE}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
    borderBottomWidth: 1,
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  backIcon: { fontSize: 28, lineHeight: 32 },
  headerTitle: { fontSize: 17, fontWeight: '700' as const },

  scroll: {
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.LG,
    paddingBottom: SPACING.MASSIVE,
  },

  sectionLabel: {
    fontSize: 11,
    fontWeight: '600' as const,
    letterSpacing: 1,
    marginBottom: SPACING.SM,
    marginLeft: SPACING.XS,
  },

  card: {
    borderRadius: BORDER_RADIUS.XL,
    borderWidth: 1,
    padding: SPACING.LG,
    marginBottom: SPACING.SM,
  },

  // Theme selector
  themeRow: { flexDirection: 'row', gap: SPACING.MD, marginBottom: SPACING.LG },
  themeBox: {
    flex: 1,
    borderRadius: BORDER_RADIUS.LG,
    padding: SPACING.MD,
    borderWidth: 2,
    borderColor: 'transparent',
  },

  // Light mockup blocks — light grey palette
  mockupLight: {
    height: 90,
    backgroundColor: '#E8E8E8',
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.SM,
    gap: 5,
    marginBottom: SPACING.SM,
  },
  mockupBarLight: {
    height: 12,
    backgroundColor: '#D0D0D0',
    borderRadius: 3,
    width: '75%',
  },
  mockupLineLight: {
    height: 7,
    backgroundColor: '#DADADA',
    borderRadius: 3,
    width: '90%',
  },

  // Dark mockup blocks — dark navy palette
  mockupDark: {
    height: 90,
    backgroundColor: '#111120',
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.SM,
    gap: 5,
    marginBottom: SPACING.SM,
  },
  mockupBarDark: {
    height: 12,
    backgroundColor: '#2A2A4A',
    borderRadius: 3,
    width: '75%',
  },
  mockupLineDark: {
    height: 7,
    backgroundColor: '#1E1E3A',
    borderRadius: 3,
    width: '90%',
  },

  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lightLabel: { fontSize: 14, fontWeight: '600' as const, color: '#333333' },
  darkLabel: { fontSize: 14, fontWeight: '600' as const, color: '#E0E0FF' },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkText: { fontSize: 11, color: '#000000', fontWeight: '800' as const },

  divider: { height: 1, marginVertical: SPACING.MD },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.XS,
  },
  toggleLabel: { fontSize: 15, fontWeight: '500' as const },
  toggleSub: { fontSize: 12, marginTop: 2 },

  // Brightness slider — static layout at 65% fill
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.MD,
    marginBottom: SPACING.MD,
  },
  sunSmall: { fontSize: 16 },
  sunLarge: { fontSize: 22 },
  sliderTrack: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    justifyContent: 'center',
  },
  sliderFill: {
    position: 'absolute',
    left: 0,
    width: '65%',
    height: 4,
    borderRadius: 2,
  },
  sliderThumb: {
    position: 'absolute',
    left: '63%',
    width: 22,
    height: 22,
    borderRadius: 11,
    marginTop: -9,
    elevation: 3,
  },
});

export default DisplayBrightnessScreen;
