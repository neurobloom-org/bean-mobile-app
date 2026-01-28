import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';

// Type definition for history events
interface HistoryEvent {
  title: string;
  time: string;
  icon: string;
  iconBgColor: string;
}

const CaregiverDashboard = ({ navigation }: any) => {
  // Default values (0 or not done)
  const monitoringUser = 'Max Smith'; // Can be made dynamic
  const moodStatus = 'Stable';
  const moodChange = '+0%';
  const tasksPercentage = 0;
  const tasksChangeWeekly = '+0% vs LW';
  const focusTimeHours = 0;
  const focusTimeMinutes = 0;
  const focusChangeWeekly = '-0% vs LW';

  // Default mood data for the week (all at baseline)
  const moodData = [
    { day: 'Mon', value: 50 },
    { day: 'Tue', value: 50 },
    { day: 'Wed', value: 50 },
    { day: 'Thu', value: 50 },
    { day: 'Fri', value: 50 },
    { day: 'Sat', value: 50 },
    { day: 'Sun', value: 50 },
  ];

  // Default history (no events) - properly typed
  const userHistory: HistoryEvent[] = [
    // Empty by default - caregiver will see "No recent events" message
  ];

  const handleExportReport = () => {
    // TODO: Implement export functionality
    console.log('Export Clinical Report');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Caregiver Dashboard</Text>
          <Text style={styles.headerSubtitle}>
            Monitoring: {monitoringUser}
          </Text>
        </View>
        <TouchableOpacity style={styles.calendarButton}>
          <Text style={styles.calendarIcon}>📅</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Mood Trends Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mood Trends</Text>
          <Text style={styles.sectionSubtitle}>
            Weekly wellness overview from the past 7 days
          </Text>

          <View style={styles.moodCard}>
            {/* Status Badge */}
            <View style={styles.statusContainer}>
              <Text style={styles.statusLabel}>{moodStatus}</Text>
              <Text style={styles.statusChange}>{moodChange} Improved</Text>
            </View>

            {/* Simple Line Graph */}
            <View style={styles.graphContainer}>
              <View style={styles.graphLine}>
                {moodData.map((point, index) => (
                  <View key={index} style={styles.graphPoint}>
                    <View style={[styles.graphDot, { bottom: point.value }]} />
                  </View>
                ))}
              </View>
            </View>

            {/* Days Labels */}
            <View style={styles.daysContainer}>
              {moodData.map((point, index) => (
                <Text key={index} style={styles.dayLabel}>
                  {point.day}
                </Text>
              ))}
            </View>
          </View>
        </View>

        {/* Activity Overview Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activity Overview</Text>

          <View style={styles.activityRow}>
            {/* Tasks Circle */}
            <View style={styles.activityCard}>
              <View style={styles.circleContainer}>
                <View style={styles.circleOuter}>
                  <View style={styles.circleInner}>
                    <Text style={styles.circlePercentage}>
                      {tasksPercentage}%
                    </Text>
                  </View>
                </View>
                <Text style={styles.circleLabel}>Tasks</Text>
              </View>
              <Text style={styles.circleChange}>{tasksChangeWeekly}</Text>
            </View>

            {/* Focus Time Circle */}
            <View style={styles.activityCard}>
              <View style={styles.circleContainer}>
                <View style={styles.circleOuter}>
                  <View style={styles.circleInner}>
                    <Text style={styles.circleTime}>
                      {focusTimeHours}h{focusTimeMinutes}m
                    </Text>
                  </View>
                </View>
                <Text style={styles.circleLabel}>Focus</Text>
              </View>
              <Text style={styles.circleChange}>{focusChangeWeekly}</Text>
            </View>
          </View>
        </View>

        {/* Bean User History Section */}
        <View style={styles.section}>
          <View style={styles.historyHeader}>
            <Text style={styles.sectionTitle}>Bean User History</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllLink}>View All</Text>
            </TouchableOpacity>
          </View>

          {userHistory.length === 0 ? (
            <View style={styles.noEventsCard}>
              <Text style={styles.noEventsIcon}>✓</Text>
              <Text style={styles.noEventsText}>No recent events</Text>
              <Text style={styles.noEventsSubtext}>
                Everything looks good! No alerts or concerns to report.
              </Text>
            </View>
          ) : (
            userHistory.map((event, index) => (
              <TouchableOpacity key={index} style={styles.historyCard}>
                <View
                  style={[
                    styles.historyIcon,
                    { backgroundColor: event.iconBgColor },
                  ]}
                >
                  <Text style={styles.historyIconText}>{event.icon}</Text>
                </View>
                <View style={styles.historyContent}>
                  <Text style={styles.historyTitle}>{event.title}</Text>
                  <Text style={styles.historyTime}>{event.time}</Text>
                </View>
                <Text style={styles.historyArrow}>›</Text>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Export Button */}
        <TouchableOpacity
          style={styles.exportButton}
          onPress={handleExportReport}
        >
          <Text style={styles.exportButtonText}>Export Clinical Report</Text>
          <Text style={styles.exportButtonIcon}>↓</Text>
        </TouchableOpacity>

        {/* Extra padding at bottom */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 28,
    color: '#000',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  calendarButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarIcon: {
    fontSize: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 16,
  },
  moodCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusLabel: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    marginRight: 8,
  },
  statusChange: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  graphContainer: {
    height: 120,
    marginBottom: 12,
    position: 'relative',
  },
  graphLine: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  graphPoint: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    position: 'relative',
  },
  graphDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    position: 'absolute',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  dayLabel: {
    fontSize: 11,
    color: '#666',
    flex: 1,
    textAlign: 'center',
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  activityCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  circleContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  circleOuter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  circleInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circlePercentage: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  circleTime: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  circleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  circleChange: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllLink: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  noEventsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  noEventsIcon: {
    fontSize: 48,
    color: '#4CAF50',
    marginBottom: 12,
  },
  noEventsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  noEventsSubtext: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  historyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  historyIconText: {
    fontSize: 20,
  },
  historyContent: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  historyTime: {
    fontSize: 12,
    color: '#666',
  },
  historyArrow: {
    fontSize: 24,
    color: '#CCC',
  },
  exportButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  exportButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
  },
  exportButtonIcon: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default CaregiverDashboard;
