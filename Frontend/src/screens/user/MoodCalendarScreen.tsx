// src/screens/user/MoodCalendarScreen.tsx
// ✅ Dark theme aware — empty state defaults

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';
import { useTheme } from '../../context/ThemeContext';

const { width } = Dimensions.get('window');

// ─── Calendar helpers ─────────────────────────────────────────────────────────
const DAYS_OF_WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

const getFirstDayOfMonth = (year: number, month: number) =>
  new Date(year, month, 1).getDay();

// ─── Screen ───────────────────────────────────────────────────────────────────
const MoodCalendarScreen = ({ navigation }: any) => {
  const { colors } = useTheme();

  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(y => y - 1);
    } else setCurrentMonth(m => m - 1);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(y => y + 1);
    } else setCurrentMonth(m => m + 1);
  };

  // Build calendar grid — null = empty cell
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  const rows: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));

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
          Mood Calendar
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Calendar Card ── */}
        <View style={[styles.card, { backgroundColor: colors.SURFACE }]}>
          {/* Month nav */}
          <View style={styles.monthNav}>
            <TouchableOpacity onPress={handlePrevMonth} style={styles.navBtn}>
              <Text style={[styles.navArrow, { color: colors.TEXT_PRIMARY }]}>
                ‹
              </Text>
            </TouchableOpacity>
            <View style={styles.monthTitleWrap}>
              <Text style={[styles.monthTitle, { color: colors.TEXT_PRIMARY }]}>
                Mood Calendar
              </Text>
              <Text style={[styles.monthSubtitle, { color: colors.PRIMARY }]}>
                {MONTHS[currentMonth]}, {currentYear}
              </Text>
            </View>
            <TouchableOpacity onPress={handleNextMonth} style={styles.navBtn}>
              <Text style={[styles.navArrow, { color: colors.TEXT_PRIMARY }]}>
                ›
              </Text>
            </TouchableOpacity>
          </View>

          {/* Day headers */}
          <View style={styles.dayHeaderRow}>
            {DAYS_OF_WEEK.map(d => (
              <Text
                key={d}
                style={[styles.dayHeader, { color: colors.TEXT_TERTIARY }]}
              >
                {d}
              </Text>
            ))}
          </View>

          {/* Calendar rows */}
          {rows.map((row, ri) => (
            <View key={ri} style={styles.calRow}>
              {row.map((day, di) => (
                <View key={di} style={styles.calCell}>
                  {day !== null ? (
                    <View
                      style={[
                        styles.dayCell,
                        { backgroundColor: colors.BACKGROUND_LIGHT },
                      ]}
                    >
                      {/* No mood data — just show robot icon dimmed */}
                      <Image
                        source={require('../../../assets/images/login-page.png')}
                        style={styles.moodIcon}
                        resizeMode="contain"
                      />
                    </View>
                  ) : (
                    <View style={styles.emptyCell} />
                  )}
                </View>
              ))}
            </View>
          ))}

          {/* No data label */}
          <Text style={[styles.noDataLabel, { color: colors.TEXT_TERTIARY }]}>
            No mood data recorded yet
          </Text>
        </View>

        {/* ── Monthly Mood Summary ── */}
        <View
          style={[
            styles.summaryCard,
            { backgroundColor: colors.SECONDARY_LIGHT },
          ]}
        >
          <View style={styles.summaryLeft}>
            <Text style={[styles.summaryTag, { color: colors.PRIMARY_DARK }]}>
              MONTHLY MOOD SUMMARY
            </Text>
            <Text style={[styles.summaryMood, { color: colors.PRIMARY_DARK }]}>
              No Mood{'\n'}Tracked Yet
            </Text>
            <Text
              style={[styles.summaryDesc, { color: colors.TEXT_SECONDARY }]}
            >
              Start logging your mood daily to see your monthly summary here.
            </Text>
          </View>
          <Image
            source={require('../../../assets/images/mood-summery-image.png')}
            style={styles.summaryImage}
            resizeMode="contain"
          />
        </View>

        {/* ── Stats Row ── */}
        <View style={styles.statsRow}>
          {/* Therapy Sessions */}
          <View style={[styles.statCard, { backgroundColor: colors.SURFACE }]}>
            <View style={styles.statHeader}>
              <Text style={[styles.statTitle, { color: colors.TEXT_PRIMARY }]}>
                Therapy
              </Text>
            </View>
            <Text style={[styles.statValue, { color: colors.TEXT_PRIMARY }]}>
              0/30
            </Text>
            <View style={styles.statFooter}>
              <Text
                style={[styles.statLabel, { color: colors.TEXT_SECONDARY }]}
              >
                Sessions
              </Text>
              <Image
                source={require('../../../assets/images/theraphy-Container.png')}
                style={styles.statIcon}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Discipline / Focus Score */}
          <View style={[styles.statCard, { backgroundColor: colors.SURFACE }]}>
            <View style={styles.statHeader}>
              <Text style={[styles.statTitle, { color: colors.TEXT_PRIMARY }]}>
                Discipline
              </Text>
            </View>
            <Text style={[styles.statValue, { color: colors.TEXT_PRIMARY }]}>
              0%
            </Text>
            <View style={styles.statFooter}>
              <Text
                style={[styles.statLabel, { color: colors.TEXT_SECONDARY }]}
              >
                Focus Score
              </Text>
              <Image
                source={require('../../../assets/images/Union.png')}
                style={styles.statIcon}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const CELL_SIZE = (width - SPACING.XL * 2 - SPACING.LG * 2) / 7;

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
  headerTitle: { ...TYPOGRAPHY.H4 },

  scroll: {
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.LG,
    paddingBottom: SPACING.MASSIVE,
  },

  // ── Calendar card
  card: {
    borderRadius: BORDER_RADIUS.XL,
    padding: SPACING.LG,
    marginBottom: SPACING.LG,
    elevation: 2,
  },

  // Month nav
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.LG,
  },
  navBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navArrow: { fontSize: 26, lineHeight: 30 },
  monthTitleWrap: { alignItems: 'center' },
  monthTitle: { fontSize: 16, fontWeight: '700' as const },
  monthSubtitle: { fontSize: 13, fontWeight: '600' as const, marginTop: 2 },

  // Day headers
  dayHeaderRow: { flexDirection: 'row', marginBottom: SPACING.SM },
  dayHeader: {
    width: CELL_SIZE,
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '600' as const,
    letterSpacing: 0.4,
  },

  // Calendar grid
  calRow: { flexDirection: 'row', marginBottom: 4 },
  calCell: { width: CELL_SIZE, alignItems: 'center' },
  dayCell: {
    width: CELL_SIZE - 4,
    height: CELL_SIZE - 4,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodIcon: { width: 24, height: 24, opacity: 0.3 },
  emptyCell: { width: CELL_SIZE - 4, height: CELL_SIZE - 4 },

  noDataLabel: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: SPACING.MD,
    fontStyle: 'italic',
  },

  // ── Summary card
  summaryCard: {
    borderRadius: BORDER_RADIUS.XL,
    padding: SPACING.LG,
    marginBottom: SPACING.LG,
    flexDirection: 'row',
    alignItems: 'flex-end',
    overflow: 'hidden',
    minHeight: 160,
  },
  summaryLeft: { flex: 1, paddingRight: SPACING.MD },
  summaryTag: {
    fontSize: 10,
    fontWeight: '700' as const,
    letterSpacing: 0.8,
    marginBottom: SPACING.XS,
  },
  summaryMood: {
    fontSize: 26,
    fontWeight: '900' as const,
    lineHeight: 30,
    marginBottom: SPACING.SM,
  },
  summaryDesc: {
    fontSize: 12,
    lineHeight: 17,
  },
  summaryImage: {
    width: 110,
    height: 130,
    marginBottom: -SPACING.LG,
    marginRight: -SPACING.LG,
  },

  // ── Stats row
  statsRow: {
    flexDirection: 'row',
    gap: SPACING.MD,
  },
  statCard: {
    flex: 1,
    borderRadius: BORDER_RADIUS.XL,
    padding: SPACING.LG,
    elevation: 2,
  },
  statHeader: { marginBottom: SPACING.XS },
  statTitle: { fontSize: 14, fontWeight: '600' as const },
  statValue: {
    fontSize: 28,
    fontWeight: '800' as const,
    marginBottom: SPACING.SM,
  },
  statFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statLabel: { fontSize: 12, color: '#666' },
  statIcon: { width: 22, height: 22 },
});

export default MoodCalendarScreen;
