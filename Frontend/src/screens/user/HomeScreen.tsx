// src/screens/user/HomeScreen.tsx
// ✅ EXACT FIGMA DESIGN - Combined cards, white therapeutic, big bean image

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';

const HomeScreen = ({ navigation }: any) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Home Dashboard');

  const dropdownOptions = [
    'Home Dashboard',
    'Focus Mode Dashboard',
    'Wellness Tracker',
    'Progress Overview',
    'Therapy Sessions',
  ];

  const handleDropdownSelect = (option: string) => {
    setSelectedOption(option);
    setDropdownVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Bean Logo and Dropdown */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../../assets/images/select-user.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={styles.logoText}>Bean</Text>
          </View>

          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setDropdownVisible(true)}
          >
            <Text style={styles.dropdownIcon}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* Dropdown Modal */}
        <Modal
          visible={dropdownVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setDropdownVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setDropdownVisible(false)}
          >
            <View style={styles.dropdownMenu}>
              {dropdownOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => handleDropdownSelect(option)}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      selectedOption === option &&
                      styles.dropdownItemTextActive,
                    ]}
                  >
                    {option}
                  </Text>
                  {selectedOption === option && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Greeting */}
        <View style={styles.greetingSection}>
          <Text style={styles.greeting}>
            Hey <Text style={styles.greetingName}>Alex!</Text>
          </Text>
        </View>

        {/* Today's Focus */}
        <View style={styles.focusSection}>
          <Text style={styles.sectionTitle}>Today's Focus</Text>
        </View>

        {/* COMBINED Mood Balance + Daily Progress Card */}
        <View style={styles.combinedCard}>
          {/* Mood Balance Section */}
          <Text style={styles.cardTitle}>Mood Balance</Text>

          <View style={styles.chartContainer}>
            {/* Placeholder for backend chart */}
            <View style={styles.chartPlaceholder}>
              <View style={styles.circleOuter}>
                <View style={styles.circleInner}>
                  <Text style={styles.chartPercentage}>65%</Text>
                </View>
              </View>
            </View>

            {/* Legend */}
            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <View
                  style={[
                    styles.legendDot,
                    { backgroundColor: COLORS.PRIMARY },
                  ]}
                />
                <Text style={styles.legendText}>Calm</Text>
              </View>
              <View style={styles.legendItem}>
                <View
                  style={[
                    styles.legendDot,
                    { backgroundColor: COLORS.GRAY_300 },
                  ]}
                />
                <Text style={styles.legendText}>Joy</Text>
              </View>
              <View style={styles.legendItem}>
                <View
                  style={[
                    styles.legendDot,
                    { backgroundColor: COLORS.GRAY_300 },
                  ]}
                />
                <Text style={styles.legendText}>Active</Text>
              </View>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Daily Progress Section */}
          <Text style={styles.cardTitle}>Daily Progress</Text>
          <Text style={styles.progressStats}>
            15 Tasks Done • 45m Focus Time
          </Text>

          <View style={styles.progressRow}>
            <View style={styles.streakContainer}>
              <Text style={styles.streakIcon}>🔥</Text>
              <Text style={styles.streakText}>7 Day Streak</Text>
            </View>

            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Features</Text>

          <View style={styles.featuresGrid}>
            {/* Talk to Bean */}
            <TouchableOpacity
              style={styles.featureCard}
              onPress={() => navigation.navigate('Chat')}
            >
              <View style={styles.featureIconContainer}>
                <Image
                  source={require('../../../assets/images/talk -to-bean.png')}
                  style={styles.featureImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.featureTitle}>Talk to Bean</Text>
            </TouchableOpacity>

            {/* Start Focus Mode */}
            <TouchableOpacity
              style={styles.featureCard}
              onPress={() => navigation.navigate('FocusMode')}
            >
              <View style={styles.featureIconContainer}>
                <Image
                  source={require('../../../assets/images/start-focus-mode.png')}
                  style={styles.featureImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.featureTitle}>Start Focus Mode</Text>
            </TouchableOpacity>

            {/* Games */}
            <TouchableOpacity style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <Image
                  source={require('../../../assets/images/games-user-dashboard.png')}
                  style={styles.featureImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.featureTitle}>Games</Text>
            </TouchableOpacity>

            {/* Play calm music */}
            <TouchableOpacity style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <Image
                  source={require('../../../assets/images/play-calm-music.png')}
                  style={styles.featureImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.featureTitle}>Play calm music</Text>
            </TouchableOpacity>

            {/* Detecting SOS */}
            <TouchableOpacity style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <Image
                  source={require('../../../assets/images/detect-sos.png')}
                  style={styles.featureImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.featureTitle}>Detecting SOS</Text>
            </TouchableOpacity>

            {/* Calming Exercises */}
            <TouchableOpacity style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <Image
                  source={require('../../../assets/images/calming-exercises.png')}
                  style={styles.featureImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.featureTitle}>Calming Exercises</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Therapeutic Conversations - WHITE CARD like others */}
        <View style={styles.therapySection}>
          <TouchableOpacity
            style={styles.therapyCard}
            onPress={() => navigation.navigate('Chat')}
          >
            <View style={styles.therapyIconContainer}>
              <Image
                source={require('../../../assets/images/therapeutic-convo.png')}
                style={styles.therapyIconImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.therapyText}>Therapeutic Conversations</Text>
          </TouchableOpacity>
        </View>

        {/* Extra spacing for Bean character */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Big Bean Character - FIXED POSITION, stays visible */}
      <View style={styles.beanCharacterFixed}>
        <Image
          source={require('../../../assets/images/user-dashboard-bean-thinking.png')}
          style={styles.beanImageLarge}
          resizeMode="contain"
        />
      </View>

      {/* Bottom Navigation - Using actual image icons */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require('../../../assets/images/home.png')}
            style={styles.navIconImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require('../../../assets/images/check-circle.png')}
            style={styles.navIconImage}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require('../../../assets/images/person.png')}
            style={styles.navIconImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  header: {
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.LG,
    paddingBottom: SPACING.MD,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  logoImage: {
    width: 30,
    height: 30,
    marginRight: SPACING.XS,
  },
  logoText: {
    ...TYPOGRAPHY.H3,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: 'bold',
  },
  dropdownButton: {
    padding: SPACING.SM,
  },
  dropdownIcon: {
    fontSize: 16,
    color: COLORS.TEXT_PRIMARY,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    paddingTop: 60,
    paddingHorizontal: SPACING.XL,
  },
  dropdownMenu: {
    backgroundColor: COLORS.WHITE,
    borderRadius: SPACING.MD,
    paddingVertical: SPACING.SM,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.MD,
    paddingHorizontal: SPACING.LG,
  },
  dropdownItemText: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_PRIMARY,
  },
  dropdownItemTextActive: {
    color: COLORS.PRIMARY,
    fontWeight: '600',
  },
  checkmark: {
    color: COLORS.PRIMARY,
    fontSize: 18,
    fontWeight: 'bold',
  },
  greetingSection: {
    paddingHorizontal: SPACING.XL,
    paddingVertical: SPACING.XL,
  },
  greeting: {
    ...TYPOGRAPHY.H1,
    color: COLORS.TEXT_PRIMARY,
    fontSize: 32,
  },
  greetingName: {
    color: COLORS.PRIMARY,
  },
  focusSection: {
    paddingHorizontal: SPACING.XL,
    marginBottom: SPACING.LG,
  },
  sectionTitle: {
    ...TYPOGRAPHY.H3,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: 'bold',
    marginBottom: SPACING.MD,
  },
  // COMBINED CARD - Mood Balance + Daily Progress
  combinedCard: {
    backgroundColor: COLORS.WHITE,
    marginHorizontal: SPACING.XL,
    marginBottom: SPACING.XL,
    padding: SPACING.XL,
    borderRadius: SPACING.LG,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },
  cardTitle: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '600',
    marginBottom: SPACING.LG,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.LG,
  },
  chartPlaceholder: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleOuter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 8,
    borderColor: COLORS.GRAY_200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  circleInner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartPercentage: {
    ...TYPOGRAPHY.H2,
    color: COLORS.PRIMARY,
    fontWeight: 'bold',
  },
  legend: {
    flex: 1,
    marginLeft: SPACING.XL,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.SM,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: SPACING.SM,
  },
  legendText: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_SECONDARY,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.BORDER,
    marginVertical: SPACING.LG,
  },
  progressStats: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.LG,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakIcon: {
    fontSize: 20,
    marginRight: SPACING.XS,
  },
  streakText: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '600',
  },
  detailsButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.SM,
    borderRadius: SPACING.MD,
  },
  detailsButtonText: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.WHITE,
    fontWeight: '600',
  },
  featuresSection: {
    paddingHorizontal: SPACING.XL,
    marginBottom: SPACING.XL,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.MD,
  },
  featureCard: {
    width: '48%',
    backgroundColor: COLORS.WHITE,
    borderRadius: SPACING.LG,
    padding: SPACING.LG,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    alignItems: 'center',
  },
  featureIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8F5F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.SM,
  },
  featureImage: {
    width: 36,
    height: 36,
  },
  featureTitle: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '600',
    textAlign: 'center',
  },
  // Therapeutic Conversations - WHITE CARD
  therapySection: {
    paddingHorizontal: SPACING.XL,
    marginBottom: SPACING.XL,
  },
  therapyCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: SPACING.LG,
    padding: SPACING.XL,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    flexDirection: 'row',
    alignItems: 'center',
  },
  therapyIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8F5F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.MD,
  },
  therapyIconImage: {
    width: 30,
    height: 30,
  },
  therapyText: {
    ...TYPOGRAPHY.BODY_LARGE,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '600',
    flex: 1,
  },
  // Big Bean Character - FIXED at bottom right
  beanCharacterFixed: {
    position: 'absolute',
    bottom: 80, // Above bottom nav
    right: 0,
    zIndex: 999,
  },
  beanImageLarge: {
    width: 120,
    height: 120,
  },
  // Bottom Navigation
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER,
    paddingVertical: SPACING.MD,
    paddingHorizontal: SPACING.XL,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.SM,
  },
  navIconImage: {
    width: 24,
    height: 24,
  },
});

export default HomeScreen;
