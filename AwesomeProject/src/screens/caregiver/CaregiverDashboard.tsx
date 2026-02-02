// src/screens/caregiver/CaregiverDashboard.tsx
// ✅ REFACTORED VERSION

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { BackButton, PrimaryButton } from '../../components';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';

const { width } = Dimensions.get('window');

const CaregiverDashboard = ({ navigation }: any) => {
  const [selectedPeriod, setSelectedPeriod] = useState<
    'week' | 'month' | 'year'
  >('week');

  const moodData = [
    { day: 'Mon', mood: 'happy', score: 8 },
    { day: 'Tue', mood: 'calm', score: 7 },
    { day: 'Wed', mood: 'anxious', score: 4 },
    { day: 'Thu', mood: 'calm', score: 7 },
    { day: 'Fri', mood: 'happy', score: 9 },
    { day: 'Sat', mood: 'happy', score: 8 },
    { day: 'Sun', mood: 'calm', score: 7 },
  ];

  const activities = [
    { activity: 'Meditation', count: 12, time: '60 min', icon: '🧘' },
    { activity: 'Chat Sessions', count: 8, time: '40 min', icon: '💬' },
    { activity: 'Focus Time', count: 5, time: '125 min', icon: '⏰' },
    { activity: 'Tasks Completed', count: 18, time: '—', icon: '✅' },
  ];

  const recentEntries = [
    { date: 'Jan 28', mood: 'happy', note: 'Had a great day at work!' },
    {
      date: 'Jan 27',
      mood: 'anxious',
      note: 'Feeling stressed about deadlines',
    },
    { date: 'Jan 26', mood: 'calm', note: 'Peaceful morning meditation' },
  ];

  const getMoodEmoji = (mood: string) => {
    const moodMap: { [key: string]: string } = {
      happy: '😊',
      calm: '😌',
      anxious: '😰',
      sad: '😢',
      angry: '😠',
    };
    return moodMap[mood] || '😐';
  };

  const getMoodColor = (mood: string) => {
    const colorMap: { [key: string]: string } = {
      happy: COLORS.SUCCESS,
      calm: COLORS.INFO,
      anxious: COLORS.WARNING,
      sad: COLORS.ERROR,
      angry: COLORS.ERROR,
    };
    return colorMap[mood] || COLORS.GRAY_400;
  };

  const handleExportReport = () => {
    Alert.alert('Export Report', 'Clinical report will be exported as PDF', [
      { text: 'OK' },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <BackButton />

        <Text style={styles.title}>Caregiver Dashboard</Text>
        <Text style={styles.subtitle}>Monitoring User's Wellness Journey</Text>

        {/* Overview Cards */}
        <View style={styles.overviewContainer}>
          <View style={styles.overviewCard}>
            <Text style={styles.overviewNumber}>7.5</Text>
            <Text style={styles.overviewLabel}>Avg Mood</Text>
            <Text style={styles.overviewTrend}>↑ +0.5</Text>
          </View>

          <View style={styles.overviewCard}>
            <Text style={styles.overviewNumber}>43</Text>
            <Text style={styles.overviewLabel}>Activities</Text>
            <Text style={styles.overviewTrend}>This Week</Text>
          </View>

          <View style={styles.overviewCard}>
            <Text style={styles.overviewNumber}>85%</Text>
            <Text style={styles.overviewLabel}>Task Rate</Text>
            <Text style={styles.overviewTrend}>↑ +5%</Text>
          </View>
        </View>

        {/* Mood Trends */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mood Trends</Text>
            <View style={styles.periodSelector}>
              {(['week', 'month', 'year'] as const).map(period => (
                <TouchableOpacity
                  key={period}
                  style={[
                    styles.periodButton,
                    selectedPeriod === period && styles.periodButtonActive,
                  ]}
                  onPress={() => setSelectedPeriod(period)}
                >
                  <Text
                    style={[
                      styles.periodText,
                      selectedPeriod === period && styles.periodTextActive,
                    ]}
                  >
                    {period}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.moodChart}>
            {moodData.map((data, index) => (
              <View key={index} style={styles.moodBar}>
                <View
                  style={[
                    styles.moodBarFill,
                    {
                      height: `${data.score * 10}%`,
                      backgroundColor: getMoodColor(data.mood),
                    },
                  ]}
                />
                <Text style={styles.moodBarLabel}>{data.day}</Text>
                <Text style={styles.moodBarEmoji}>
                  {getMoodEmoji(data.mood)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Activity Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activity Overview</Text>
          <View style={styles.activitiesGrid}>
            {activities.map((item, index) => (
              <View key={index} style={styles.activityCard}>
                <Text style={styles.activityIcon}>{item.icon}</Text>
                <Text style={styles.activityCount}>{item.count}</Text>
                <Text style={styles.activityName}>{item.activity}</Text>
                <Text style={styles.activityTime}>{item.time}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Entries */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Journal Entries</Text>
          {recentEntries.map((entry, index) => (
            <View key={index} style={styles.entryCard}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryDate}>{entry.date}</Text>
                <Text style={styles.entryMood}>{getMoodEmoji(entry.mood)}</Text>
              </View>
              <Text style={styles.entryNote}>{entry.note}</Text>
            </View>
          ))}
        </View>

        {/* Export Report Button */}
        <PrimaryButton
          title="Export Clinical Report"
          onPress={handleExportReport}
          variant="primary"
          size="large"
          fullWidth
        />

        {/* Emergency Alert */}
        <View style={styles.alertCard}>
          <Text style={styles.alertIcon}>🆘</Text>
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>Emergency Contact</Text>
            <Text style={styles.alertText}>
              User can reach you anytime via SOS feature
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.XL,
    paddingBottom: SPACING.XXL,
  },
  title: {
    ...TYPOGRAPHY.H1,
    color: COLORS.TEXT_PRIMARY,
    marginTop: SPACING.XL,
  },
  subtitle: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.XXL,
  },
  overviewContainer: {
    flexDirection: 'row',
    gap: SPACING.MD,
    marginBottom: SPACING.XL,
  },
  overviewCard: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    borderRadius: SPACING.LG,
    padding: SPACING.LG,
    alignItems: 'center',
  },
  overviewNumber: {
    ...TYPOGRAPHY.H2,
    color: COLORS.PRIMARY,
    marginBottom: SPACING.XS,
  },
  overviewLabel: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.XXS,
  },
  overviewTrend: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.SUCCESS,
    fontWeight: '600',
  },
  section: {
    marginBottom: SPACING.XL,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.LG,
  },
  sectionTitle: {
    ...TYPOGRAPHY.H3,
    color: COLORS.TEXT_PRIMARY,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: COLORS.GRAY_100,
    borderRadius: SPACING.SM,
    padding: SPACING.XXS,
  },
  periodButton: {
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.XS,
    borderRadius: SPACING.XS,
  },
  periodButtonActive: {
    backgroundColor: COLORS.WHITE,
  },
  periodText: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_TERTIARY,
    textTransform: 'capitalize',
  },
  periodTextActive: {
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '600',
  },
  moodChart: {
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    borderRadius: SPACING.LG,
    padding: SPACING.LG,
    height: 200,
    alignItems: 'flex-end',
    gap: SPACING.SM,
  },
  moodBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  moodBarFill: {
    width: '100%',
    borderRadius: SPACING.XS,
    marginBottom: SPACING.XS,
  },
  moodBarLabel: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    fontSize: 10,
    marginTop: SPACING.XS,
  },
  moodBarEmoji: {
    fontSize: 16,
    marginTop: SPACING.XXS,
  },
  activitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.MD,
  },
  activityCard: {
    width: (width - SPACING.XL * 2 - SPACING.MD) / 2,
    backgroundColor: COLORS.WHITE,
    borderRadius: SPACING.LG,
    padding: SPACING.LG,
    alignItems: 'center',
  },
  activityIcon: {
    fontSize: 32,
    marginBottom: SPACING.SM,
  },
  activityCount: {
    ...TYPOGRAPHY.H2,
    color: COLORS.PRIMARY,
    marginBottom: SPACING.XXS,
  },
  activityName: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '600',
    marginBottom: SPACING.XXS,
  },
  activityTime: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    fontSize: 10,
  },
  entryCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: SPACING.LG,
    padding: SPACING.LG,
    marginBottom: SPACING.MD,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.SM,
  },
  entryDate: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    fontWeight: '600',
  },
  entryMood: {
    fontSize: 20,
  },
  entryNote: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_PRIMARY,
  },
  alertCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.ERROR_LIGHT,
    borderRadius: SPACING.LG,
    padding: SPACING.LG,
    marginTop: SPACING.XL,
    gap: SPACING.LG,
    alignItems: 'center',
  },
  alertIcon: {
    fontSize: 32,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    ...TYPOGRAPHY.H4,
    color: COLORS.ERROR,
    marginBottom: SPACING.XXS,
  },
  alertText: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
  },
});

export default CaregiverDashboard;
