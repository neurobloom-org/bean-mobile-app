import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';

const HomeScreen = ({ navigation }: any) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const userName = 'Alex'; // You can make this dynamic later

  // Default values for first-time users
  const todayProgress = 0; // 0% for new users
  const tasksDone = 0;
  const totalTasks = 5;
  const focusTime = 0; // 0 minutes
  const dayStreak = 0; // 0 day streak

  const moodOptions = [
    { id: 'calm', label: 'Calm', icon: '😊' },
    { id: 'energetic', label: 'Energetic', icon: '⚡' },
    { id: 'overwhelmed', label: 'Overwhelmed', icon: '😰' },
  ];

  const activityCards = [
    {
      id: 1,
      title: 'Talk to Bean',
      icon: require('../../assets/images/chat_bubble.png'),
      bgColor: '#E0F2F1',
      onPress: () => navigation.navigate('Chat'),
    },
    {
      id: 2,
      title: 'Start Focus Mode',
      icon: require('../../assets/images/timer-icon.png'),
      bgColor: '#E0F2F1',
      onPress: () => navigation.navigate('FocusMode'),
    },
    {
      id: 3,
      title: 'Grounding Game',
      icon: require('../../assets/images/grid_view.png'),
      bgColor: '#E0F2F1',
      onPress: () => navigation.navigate('GroundingGame'),
    },
    {
      id: 4,
      title: 'Meditate',
      icon: require('../../assets/images/self_improvement.png'),
      bgColor: '#E0F2F1',
      onPress: () => navigation.navigate('Meditation'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F9F6" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require('../../assets/images/user-dashboard-top-small-bean.png')}
              style={styles.robotIcon}
            />
            <Text style={styles.greetingText}>
              Hi {userName}, how are you feeling today?
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.menuIcon}>⋮</Text>
          </TouchableOpacity>
        </View>

        {/* Mood Selection */}
        <View style={styles.moodSection}>
          {moodOptions.map(mood => (
            <TouchableOpacity
              key={mood.id}
              style={[
                styles.moodButton,
                selectedMood === mood.id && styles.moodButtonSelected,
              ]}
              onPress={() => setSelectedMood(mood.id)}
            >
              <Text style={styles.moodEmoji}>{mood.icon}</Text>
              <Text style={styles.moodLabel}>{mood.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Today's Focus Section - White Card */}
        <View style={styles.whiteCard}>
          <Text style={styles.sectionTitle}>Today's Focus</Text>
          <View style={styles.focusCard}>
            <View style={styles.circularProgress}>
              <Text style={styles.progressText}>{todayProgress}%</Text>
            </View>
          </View>
        </View>

        {/* Daily Progress Section - White Card */}
        <View style={styles.whiteCard}>
          <Text style={styles.sectionTitle}>Daily Progress</Text>
          <Text style={styles.progressSubtitle}>
            {tasksDone}/{totalTasks} Tasks Done • {focusTime}m Focus Time
          </Text>

          <View style={styles.progressActions}>
            <View style={styles.streakBadge}>
              <Text style={styles.streakEmoji}>🔥</Text>
              <Text style={styles.streakText}>{dayStreak} Day Streak</Text>
            </View>
            <TouchableOpacity style={styles.viewDetailsButton}>
              <Text style={styles.viewDetailsText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Activity Cards Grid */}
        <View style={styles.activityGrid}>
          {activityCards.map(card => (
            <TouchableOpacity
              key={card.id}
              style={[styles.activityCard, { backgroundColor: card.bgColor }]}
              onPress={card.onPress}
            >
              <View style={styles.iconCircle}>
                <Image source={card.icon} style={styles.activityIcon} />
              </View>
              <Text style={styles.activityTitle}>{card.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Extra padding at bottom for scroll */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bean Mascot */}
      <View style={styles.mascotContainer}>
        <Image
          source={require('../../assets/images/user-dashboard-bean-thinking.png')}
          style={styles.mascotImage}
        />
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.navIconActive}>⌂</Text>
          <Text style={[styles.navLabel, styles.navLabelActive]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Tasks')}
        >
          <Text style={styles.navIconInactive}>✓</Text>
          <Text style={styles.navLabelInactive}>Tasks</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Games')}
        >
          <Text style={styles.navIconInactive}>◆</Text>
          <Text style={styles.navLabelInactive}>Games</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.navIconInactive}>◉</Text>
          <Text style={styles.navLabelInactive}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F9F6',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#F0F9F6',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  robotIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
    borderRadius: 20,
  },
  greetingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  menuIcon: {
    fontSize: 24,
    color: '#333',
    fontWeight: '700',
  },
  moodSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 4,
    marginBottom: 16,
  },
  moodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 12,
    backgroundColor: '#FFFFFF',
  },
  moodButtonSelected: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  moodEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  moodLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
  },
  whiteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  focusCard: {
    backgroundColor: '#7FE4C4',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  circularProgress: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  progressText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  progressSubtitle: {
    fontSize: 13,
    color: '#757575',
    marginBottom: 10,
  },
  progressActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  streakEmoji: {
    fontSize: 16,
    marginRight: 4,
  },
  streakText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4CAF50',
    marginLeft: 4,
  },
  viewDetailsButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },
  viewDetailsText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  activityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 16,
  },
  activityCard: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 32,
    padding: 16,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D0E8E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activityTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  mascotContainer: {
    position: 'absolute',
    bottom: 90,
    right: 15,
    zIndex: 999,
  },
  mascotImage: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  navIconActive: {
    fontSize: 26,
    marginBottom: 2,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  navIconInactive: {
    fontSize: 26,
    marginBottom: 2,
    color: '#9E9E9E',
  },
  navLabel: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: '500',
  },
  navLabelActive: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  navLabelInactive: {
    color: '#9E9E9E',
    fontWeight: '500',
  },
});

export default HomeScreen;
