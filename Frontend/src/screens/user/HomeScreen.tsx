// src/screens/user/HomeScreen.tsx
// ✅ REFACTORED VERSION

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';

const HomeScreen = ({ navigation }: any) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const moods = [
    { id: 'happy', emoji: '😊', label: 'Happy' },
    { id: 'calm', emoji: '😌', label: 'Calm' },
    { id: 'anxious', emoji: '😰', label: 'Anxious' },
    { id: 'sad', emoji: '😢', label: 'Sad' },
    { id: 'angry', emoji: '😠', label: 'Angry' },
  ];

  const activities = [
    { icon: '💬', title: 'Chat', route: 'Chat' },
    { icon: '⏰', title: 'Focus', route: 'FocusMode' },
    { icon: '✅', title: 'Tasks', route: 'Tasks' },
    { icon: '🆘', title: 'SOS', route: 'Home' },
    { icon: '🧘', title: 'Meditate', route: 'Home' },
    { icon: '📊', title: 'Progress', route: 'Home' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, User! 👋</Text>
            <Text style={styles.subGreeting}>How are you feeling today?</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Image
              source={require('../../assets/images/robot-first-page.png')}
              style={styles.profileImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Mood Selection */}
        <View style={styles.moodSection}>
          <Text style={styles.sectionTitle}>Select Your Mood</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.moodScroll}
          >
            {moods.map(mood => (
              <TouchableOpacity
                key={mood.id}
                style={[
                  styles.moodButton,
                  selectedMood === mood.id && styles.moodButtonSelected,
                ]}
                onPress={() => setSelectedMood(mood.id)}
              >
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                <Text style={styles.moodLabel}>{mood.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Progress Cards */}
        <View style={styles.progressSection}>
          <View style={styles.progressCard}>
            <Text style={styles.progressNumber}>7</Text>
            <Text style={styles.progressLabel}>Day Streak 🔥</Text>
          </View>

          <View style={styles.progressCard}>
            <Text style={styles.progressNumber}>85%</Text>
            <Text style={styles.progressLabel}>Tasks Done ✅</Text>
          </View>
        </View>

        {/* Bean Character */}
        <View style={styles.beanContainer}>
          <Image
            source={require('../../assets/images/robot-first-page.png')}
            style={styles.beanImage}
            resizeMode="contain"
          />
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>
              Great job today! Keep it up! 🌟
            </Text>
          </View>
        </View>

        {/* Activities Grid */}
        <View style={styles.activitiesSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.activitiesGrid}>
            {activities.map((activity, index) => (
              <TouchableOpacity
                key={index}
                style={styles.activityCard}
                onPress={() => navigation.navigate(activity.route)}
              >
                <Text style={styles.activityIcon}>{activity.icon}</Text>
                <Text style={styles.activityTitle}>{activity.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Daily Quote */}
        <View style={styles.quoteCard}>
          <Text style={styles.quoteText}>
            "The only way to do great work is to love what you do."
          </Text>
          <Text style={styles.quoteAuthor}>- Steve Jobs</Text>
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
    paddingBottom: SPACING.XXL,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.XL,
    paddingBottom: SPACING.LG,
  },
  greeting: {
    ...TYPOGRAPHY.H2,
    color: COLORS.TEXT_PRIMARY,
  },
  subGreeting: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.XS,
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
  },
  moodSection: {
    marginBottom: SPACING.XL,
  },
  sectionTitle: {
    ...TYPOGRAPHY.H3,
    color: COLORS.TEXT_PRIMARY,
    paddingHorizontal: SPACING.XL,
    marginBottom: SPACING.LG,
  },
  moodScroll: {
    paddingHorizontal: SPACING.XL,
  },
  moodButton: {
    backgroundColor: COLORS.WHITE,
    borderRadius: SPACING.LG,
    padding: SPACING.LG,
    marginRight: SPACING.MD,
    alignItems: 'center',
    minWidth: 80,
    borderWidth: 2,
    borderColor: COLORS.TRANSPARENT,
  },
  moodButtonSelected: {
    borderColor: COLORS.PRIMARY,
    backgroundColor: COLORS.SECONDARY_LIGHT,
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: SPACING.XS,
  },
  moodLabel: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '600',
  },
  progressSection: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.XL,
    gap: SPACING.LG,
    marginBottom: SPACING.XL,
  },
  progressCard: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    borderRadius: SPACING.LG,
    padding: SPACING.LG,
    alignItems: 'center',
  },
  progressNumber: {
    ...TYPOGRAPHY.H1,
    color: COLORS.PRIMARY,
    marginBottom: SPACING.XS,
  },
  progressLabel: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
  },
  beanContainer: {
    alignItems: 'center',
    marginBottom: SPACING.XL,
  },
  beanImage: {
    width: 120,
    height: 120,
  },
  speechBubble: {
    backgroundColor: COLORS.WHITE,
    borderRadius: SPACING.LG,
    padding: SPACING.LG,
    marginTop: SPACING.MD,
    marginHorizontal: SPACING.XL,
  },
  speechText: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
  },
  activitiesSection: {
    marginBottom: SPACING.XL,
  },
  activitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.XL,
    gap: SPACING.LG,
  },
  activityCard: {
    width: '30%',
    backgroundColor: COLORS.WHITE,
    borderRadius: SPACING.LG,
    padding: SPACING.LG,
    alignItems: 'center',
    aspectRatio: 1,
    justifyContent: 'center',
  },
  activityIcon: {
    fontSize: 32,
    marginBottom: SPACING.SM,
  },
  activityTitle: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '600',
    textAlign: 'center',
  },
  quoteCard: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: SPACING.LG,
    padding: SPACING.XL,
    marginHorizontal: SPACING.XL,
  },
  quoteText: {
    ...TYPOGRAPHY.BODY_LARGE,
    color: COLORS.WHITE,
    fontStyle: 'italic',
    marginBottom: SPACING.SM,
    textAlign: 'center',
  },
  quoteAuthor: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
});

export default HomeScreen;
