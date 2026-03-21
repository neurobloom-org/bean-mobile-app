// src/screens/caregiver/CaregiverDashboard.tsx
// ✅ Dark theme aware

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
import { SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';
import { useTheme } from '../../context/ThemeContext';
import MoodTrendChart from '../../components/cards/MoodTrendChart';

interface AlertItemProps {
  icon: any;
  title: string;
  subtitle: string;
  onPress: () => void;
  colors: any;
}

const AlertItem = ({
  icon,
  title,
  subtitle,
  onPress,
  colors,
}: AlertItemProps) => (
  <TouchableOpacity
    style={[styles.alertItem, { backgroundColor: colors.SURFACE }]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Image source={icon} style={styles.alertIcon} resizeMode="contain" />
    <View style={styles.alertItemText}>
      <Text style={[styles.alertItemTitle, { color: colors.TEXT_PRIMARY }]}>
        {title}
      </Text>
      <Text style={[styles.alertItemSub, { color: colors.TEXT_SECONDARY }]}>
        {subtitle}
      </Text>
    </View>
    <Text style={[styles.alertChevron, { color: colors.TEXT_TERTIARY }]}>
      ›
    </Text>
  </TouchableOpacity>
);

const CaregiverDashboard = ({ navigation }: any) => {
  const { colors } = useTheme(); // ✅

  const handleExportReport = () => {
    Alert.alert('Export Report', 'Clinical report will be exported as PDF.', [
      { text: 'OK' },
    ]);
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
          Caregiver Dashboard
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Page title */}
        <Text style={[styles.pageTitle, { color: colors.TEXT_PRIMARY }]}>
          Caregiver/Therapist Dashboard
        </Text>
        <Text style={[styles.pageSubtitle, { color: colors.TEXT_SECONDARY }]}>
          Monitoring: Alex Johnson
        </Text>

        {/* Mood Trends card */}
        <View style={[styles.card, { backgroundColor: colors.SURFACE }]}>
          <Text style={[styles.cardTitle, { color: colors.TEXT_PRIMARY }]}>
            Mood Trends
          </Text>
          <Text style={[styles.cardSubtitle, { color: colors.TEXT_SECONDARY }]}>
            Mental wellness overview from the past 7 days
          </Text>
          <MoodTrendChart scores={[0, 0, 0, 0, 0, 0, 0]} />
        </View>

        {/* Activity Overview */}
        <Text style={[styles.sectionTitle, { color: colors.TEXT_PRIMARY }]}>
          Activity Overview
        </Text>
        <View style={styles.activityRow}>
          {/* Tasks card */}
          <View
            style={[styles.activityCard, { backgroundColor: colors.SURFACE }]}
          >
            <View style={styles.activityHeader}>
              <Image
                source={require('../../../assets/images/guardian-task.png')}
                style={styles.activityIcon}
                resizeMode="contain"
              />
              <Text
                style={[styles.activityLabel, { color: colors.TEXT_SECONDARY }]}
              >
                Tasks
              </Text>
            </View>
            <Text
              style={[styles.activityValue, { color: colors.TEXT_PRIMARY }]}
            >
              0%
            </Text>
            <Text
              style={[styles.activityTrend, { color: colors.TEXT_TERTIARY }]}
            >
              — no data yet
            </Text>
          </View>

          {/* Focus card */}
          <View
            style={[styles.activityCard, { backgroundColor: colors.SURFACE }]}
          >
            <View style={styles.activityHeader}>
              <Image
                source={require('../../../assets/images/guardian-time-focus.png')}
                style={styles.activityIcon}
                resizeMode="contain"
              />
              <Text
                style={[styles.activityLabel, { color: colors.TEXT_SECONDARY }]}
              >
                Focus
              </Text>
            </View>
            <Text
              style={[styles.activityValue, { color: colors.TEXT_PRIMARY }]}
            >
              0h 0m
            </Text>
            <Text
              style={[styles.activityTrend, { color: colors.TEXT_TERTIARY }]}
            >
              — no data yet
            </Text>
          </View>
        </View>

        {/* Bean User History */}
        <View style={styles.historyHeader}>
          <Text style={[styles.sectionTitle, { color: colors.TEXT_PRIMARY }]}>
            Bean User History
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={[styles.viewAll, { color: colors.PRIMARY }]}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        {/* Empty history state */}
        <View
          style={[styles.historyEmpty, { backgroundColor: colors.SURFACE }]}
        >
          <Text
            style={[styles.historyEmptyText, { color: colors.TEXT_PRIMARY }]}
          >
            No alerts recorded yet.
          </Text>
          <Text
            style={[styles.historyEmptySub, { color: colors.TEXT_SECONDARY }]}
          >
            Events like SOS triggers and mood alerts will appear here.
          </Text>
        </View>

        {/* Export Clinical Report */}
        <TouchableOpacity
          style={[styles.exportBtn, { backgroundColor: colors.PRIMARY }]}
          onPress={handleExportReport}
          activeOpacity={0.85}
        >
          <Image
            source={require('../../../assets/images/clinical-report.png')}
            style={[styles.exportIcon, { tintColor: colors.WHITE }]}
            resizeMode="contain"
          />
          <Text style={[styles.exportText, { color: colors.WHITE }]}>
            Export Clinical Report
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={[styles.footer, { color: colors.TEXT_TERTIARY }]}>
          Bean AI · Caregiver/Therapist Portal v2.4.1
        </Text>
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
  headerTitle: { ...TYPOGRAPHY.H4 },
  scroll: {
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.LG,
    paddingBottom: SPACING.MASSIVE,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    marginBottom: SPACING.XS,
  },
  pageSubtitle: { ...TYPOGRAPHY.BODY_SMALL, marginBottom: SPACING.XL },
  card: {
    borderRadius: BORDER_RADIUS.XL,
    padding: SPACING.LG,
    marginBottom: SPACING.XL,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    marginBottom: SPACING.XS,
  },
  cardSubtitle: { ...TYPOGRAPHY.CAPTION, marginBottom: SPACING.LG },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    marginBottom: SPACING.MD,
  },
  activityRow: {
    flexDirection: 'row',
    gap: SPACING.MD,
    marginBottom: SPACING.XL,
  },
  activityCard: {
    flex: 1,
    borderRadius: BORDER_RADIUS.XL,
    padding: SPACING.LG,
    elevation: 2,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.XS,
    marginBottom: SPACING.SM,
  },
  activityIcon: { width: 22, height: 22 },
  activityLabel: { fontSize: 12, fontWeight: '600' as const },
  activityValue: { fontSize: 26, fontWeight: '800' as const, marginBottom: 2 },
  activityTrend: { fontSize: 11 },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.MD,
  },
  viewAll: { fontSize: 13, fontWeight: '600' as const },
  historyEmpty: {
    borderRadius: BORDER_RADIUS.XL,
    padding: SPACING.XL,
    alignItems: 'center',
    marginBottom: SPACING.XL,
    elevation: 2,
  },
  historyEmptyText: {
    fontSize: 15,
    fontWeight: '600' as const,
    marginBottom: SPACING.XS,
  },
  historyEmptySub: {
    ...TYPOGRAPHY.CAPTION,
    textAlign: 'center',
    lineHeight: 17,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.LG,
    padding: SPACING.MD,
    marginBottom: SPACING.SM,
    gap: SPACING.MD,
    elevation: 1,
  },
  alertIcon: { width: 40, height: 40 },
  alertItemText: { flex: 1 },
  alertItemTitle: { fontSize: 14, fontWeight: '700' as const },
  alertItemSub: { ...TYPOGRAPHY.CAPTION, marginTop: 2 },
  alertChevron: { fontSize: 20 },
  exportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: SPACING.LG,
    gap: SPACING.SM,
    marginBottom: SPACING.LG,
    elevation: 5,
  },
  exportIcon: { width: 22, height: 22 },
  exportText: { fontSize: 16, fontWeight: '700' as const, letterSpacing: 0.3 },
  footer: { ...TYPOGRAPHY.CAPTION, textAlign: 'center' },
});

export default CaregiverDashboard;
