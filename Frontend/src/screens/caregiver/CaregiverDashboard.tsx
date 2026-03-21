// src/screens/caregiver/CaregiverDashboard.tsx
// ✅ FIGMA-MATCHED — All values default 0

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';
import MoodTrendChart from '../../components/cards/MoodTrendChart';

// ─── Alert History Item ───────────────────────────────────────────────────────
interface AlertItemProps {
  icon: any;
  title: string;
  subtitle: string;
  onPress: () => void;
}

const AlertItem = ({ icon, title, subtitle, onPress }: AlertItemProps) => (
  <TouchableOpacity
    style={styles.alertItem}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Image source={icon} style={styles.alertIcon} resizeMode="contain" />
    <View style={styles.alertItemText}>
      <Text style={styles.alertItemTitle}>{title}</Text>
      <Text style={styles.alertItemSub}>{subtitle}</Text>
    </View>
    <Text style={styles.alertChevron}>›</Text>
  </TouchableOpacity>
);

// ─── Screen ───────────────────────────────────────────────────────────────────
const CaregiverDashboard = ({ navigation }: any) => {
  const handleExportReport = () => {
    Alert.alert('Export Report', 'Clinical report will be exported as PDF.', [
      { text: 'OK' },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Caregiver Dashboard</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Page title ── */}
        <Text style={styles.pageTitle}>Caregiver/Therapist Dashboard</Text>
        <Text style={styles.pageSubtitle}>Monitoring: Alex Johnson</Text>

        {/* ── Mood Trends card ── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Mood Trends</Text>
          <Text style={styles.cardSubtitle}>
            Mental wellness overview from the past 7 days
          </Text>
          {/* ✅ MoodTrendChart component from src/components/cards/ */}
          <MoodTrendChart scores={[0, 0, 0, 0, 0, 0, 0]} />
        </View>

        {/* ── Activity Overview ── */}
        <Text style={styles.sectionTitle}>Activity Overview</Text>
        <View style={styles.activityRow}>
          {/* Tasks card */}
          <View style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <Image
                source={require('../../../assets/images/guardian-task.png')}
                style={styles.activityIcon}
                resizeMode="contain"
              />
              <Text style={styles.activityLabel}>Tasks</Text>
            </View>
            <Text style={styles.activityValue}>0%</Text>
            <Text style={styles.activityTrend}>— no data yet</Text>
          </View>

          {/* Focus card */}
          <View style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <Image
                source={require('../../../assets/images/guardian-time-focus.png')}
                style={styles.activityIcon}
                resizeMode="contain"
              />
              <Text style={styles.activityLabel}>Focus</Text>
            </View>
            <Text style={styles.activityValue}>0h 0m</Text>
            <Text style={styles.activityTrend}>— no data yet</Text>
          </View>
        </View>

        {/* ── Bean User History ── */}
        <View style={styles.historyHeader}>
          <Text style={styles.sectionTitle}>Bean User History</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Empty state for history */}
        <View style={styles.historyEmpty}>
          <Text style={styles.historyEmptyText}>No alerts recorded yet.</Text>
          <Text style={styles.historyEmptySub}>
            Events like SOS triggers and mood alerts will appear here.
          </Text>
        </View>

        {/* ── Export Clinical Report ── */}
        <TouchableOpacity
          style={styles.exportBtn}
          onPress={handleExportReport}
          activeOpacity={0.85}
        >
          <Image
            source={require('../../../assets/images/clinical-report.png')}
            style={styles.exportIcon}
            resizeMode="contain"
          />
          <Text style={styles.exportText}>Export Clinical Report</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footer}>
          Bean AI · Caregiver/Therapist Portal v2.4.1
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.BACKGROUND_LIGHT },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_LIGHT,
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  backIcon: { fontSize: 28, color: COLORS.TEXT_PRIMARY, lineHeight: 32 },
  headerTitle: { ...TYPOGRAPHY.H4, color: COLORS.TEXT_PRIMARY },

  scroll: {
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.LG,
    paddingBottom: SPACING.MASSIVE,
  },

  // Page title
  pageTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XS,
  },
  pageSubtitle: {
    ...TYPOGRAPHY.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.XL,
  },

  // Card
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.XL,
    padding: SPACING.LG,
    marginBottom: SPACING.XL,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XS,
  },
  cardSubtitle: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.LG,
  },

  // Section title
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.MD,
  },

  // Activity row
  activityRow: {
    flexDirection: 'row',
    gap: SPACING.MD,
    marginBottom: SPACING.XL,
  },
  activityCard: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.XL,
    padding: SPACING.LG,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.XS,
    marginBottom: SPACING.SM,
  },
  activityIcon: {
    width: 22,
    height: 22,
  },
  activityLabel: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: COLORS.TEXT_SECONDARY,
  },
  activityValue: {
    fontSize: 26,
    fontWeight: '800' as const,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 2,
  },
  activityTrend: {
    fontSize: 11,
    color: COLORS.TEXT_TERTIARY,
  },

  // History
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.MD,
  },
  viewAll: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: COLORS.PRIMARY,
  },

  // Empty history state
  historyEmpty: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.XL,
    padding: SPACING.XL,
    alignItems: 'center',
    marginBottom: SPACING.XL,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  historyEmptyText: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XS,
  },
  historyEmptySub: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 17,
  },

  // Alert item (for when data exists)
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.LG,
    padding: SPACING.MD,
    marginBottom: SPACING.SM,
    gap: SPACING.MD,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  alertIcon: { width: 40, height: 40 },
  alertItemText: { flex: 1 },
  alertItemTitle: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: COLORS.TEXT_PRIMARY,
  },
  alertItemSub: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    marginTop: 2,
  },
  alertChevron: { fontSize: 20, color: COLORS.TEXT_TERTIARY },

  // Export button
  exportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: SPACING.LG,
    gap: SPACING.SM,
    marginBottom: SPACING.LG,
    shadowColor: COLORS.PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  exportIcon: {
    width: 22,
    height: 22,
    tintColor: COLORS.WHITE,
  },
  exportText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: COLORS.WHITE,
    letterSpacing: 0.3,
  },

  // Footer
  footer: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_TERTIARY,
    textAlign: 'center',
  },
});

export default CaregiverDashboard;
