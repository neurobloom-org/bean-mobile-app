// Main dashboard for the caregiver/therapist role. Displays mood trends,
// activity overview, and patient history for the linked user. A slide-in
// hamburger menu provides theme toggling, account settings, and logout.

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  Switch,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';
import { useTheme } from '../../context/ThemeContext';
import MoodTrendChart from '../../components/cards/MoodTrendChart';

const { width } = Dimensions.get('window');
const PANEL_WIDTH = width * 0.72;
const MODAL_CLOSE_DELAY = 320;

interface CaregiverMenuProps {
  visible: boolean;
  onClose: () => void;
  navigation: any;
  colors: any;
  isDark: boolean;
  toggleTheme: (dark: boolean) => void;
}

const CaregiverMenu = ({
  visible,
  onClose,
  navigation,
  colors,
  isDark,
  toggleTheme,
}: CaregiverMenuProps) => {
  const iconTint = isDark ? '#F1F5F9' : '#000000';

  const handleLogOut = () => {
    onClose();
    setTimeout(() => {
      Alert.alert('Log Out', 'Are you sure you want to log out?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: () => navigation.navigate('Welcome'),
        },
      ]);
    }, MODAL_CLOSE_DELAY);
  };

  const handleAccountSettings = () => {
    onClose();
    setTimeout(() => {
      navigation.navigate('CaregiverAccount');
    }, MODAL_CLOSE_DELAY);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={menuStyles.overlay} />
      </TouchableWithoutFeedback>
      <View style={[menuStyles.panel, { backgroundColor: colors.SURFACE }]}>
        <TouchableOpacity
          style={[menuStyles.closeBtn, { backgroundColor: colors.GRAY_100 }]}
          onPress={onClose}
        >
          <Text style={[menuStyles.closeIcon, { color: colors.TEXT_PRIMARY }]}>
            ✕
          </Text>
        </TouchableOpacity>
        <View style={menuStyles.brandRow}>
          <Image
            source={require('../../../assets/images/login-page.png')}
            style={[menuStyles.brandLogo, { tintColor: colors.PRIMARY }]}
            resizeMode="contain"
          />
          <Text style={[menuStyles.brandName, { color: colors.TEXT_PRIMARY }]}>
            Bean
          </Text>
        </View>
        <Text style={[menuStyles.brandSub, { color: colors.TEXT_TERTIARY }]}>
          Caregiver Portal
        </Text>
        <View
          style={[menuStyles.divider, { backgroundColor: colors.BORDER_LIGHT }]}
        />
        <View style={menuStyles.menuItem}>
          <View
            style={[
              menuStyles.iconBox,
              { backgroundColor: colors.SECONDARY_LIGHT },
            ]}
          >
            <Text style={menuStyles.menuItemEmoji}>{isDark ? '🌙' : '☀️'}</Text>
          </View>
          <Text style={[menuStyles.menuLabel, { color: colors.TEXT_PRIMARY }]}>
            {isDark ? 'Dark Mode' : 'Light Mode'}
          </Text>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.BORDER_LIGHT, true: colors.PRIMARY }}
            thumbColor={isDark ? '#F1F5F9' : '#FFFFFF'}
          />
        </View>
        <TouchableOpacity
          style={menuStyles.menuItem}
          onPress={handleAccountSettings}
          activeOpacity={0.7}
        >
          <View
            style={[
              menuStyles.iconBox,
              { backgroundColor: colors.SECONDARY_LIGHT },
            ]}
          >
            <Image
              source={require('../../../assets/images/account-info.png')}
              style={[menuStyles.menuIcon, { tintColor: iconTint }]}
              resizeMode="contain"
            />
          </View>
          <Text style={[menuStyles.menuLabel, { color: colors.TEXT_PRIMARY }]}>
            Account Settings
          </Text>
          <Text style={[menuStyles.chevron, { color: colors.TEXT_TERTIARY }]}>
            ›
          </Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <View
          style={[menuStyles.divider, { backgroundColor: colors.BORDER_LIGHT }]}
        />
        <TouchableOpacity
          style={menuStyles.logOutButton}
          onPress={handleLogOut}
          activeOpacity={0.85}
        >
          <Text style={menuStyles.logOutText}>→ Log Out</Text>
        </TouchableOpacity>
        <Text style={[menuStyles.versionText, { color: colors.TEXT_TERTIARY }]}>
          Bean v2.4.1 · Caregiver Portal
        </Text>
      </View>
    </Modal>
  );
};

const CaregiverDashboard = ({ navigation }: any) => {
  const { colors, isDark, toggleTheme } = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);

  // Reads the guardian's name saved at signup.
  const [guardianName, setGuardianName] = useState('Guardian');

  useEffect(() => {
    AsyncStorage.getItem('bean_guardian_name').then(name => {
      if (name) setGuardianName(name);
    });
  }, []);

  const handleExportReport = () => {
    Alert.alert('Export Report', 'Clinical report will be exported as PDF.', [
      { text: 'OK' },
    ]);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.BACKGROUND_LIGHT }]}
    >
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.SURFACE,
            borderBottomColor: colors.BORDER_LIGHT,
          },
        ]}
      >
        <View style={styles.headerLeft}>
          <Image
            source={require('../../../assets/images/login-page.png')}
            style={[
              styles.headerLogo,
              { tintColor: isDark ? '#FFFFFF' : undefined },
            ]}
            resizeMode="contain"
          />
          <Text
            style={[styles.headerBrandName, { color: colors.TEXT_PRIMARY }]}
          >
            Bean
          </Text>
        </View>
        <Text style={[styles.headerTitle, { color: colors.TEXT_PRIMARY }]}>
          Caregiver Dashboard
        </Text>
        <TouchableOpacity
          onPress={() => setMenuVisible(true)}
          style={styles.hamburgerBtn}
        >
          <Text style={[styles.hamburger, { color: colors.TEXT_PRIMARY }]}>
            ≡
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.pageTitle, { color: colors.TEXT_PRIMARY }]}>
          Caregiver/Therapist Dashboard
        </Text>

        {/* Shows the guardian's name from AsyncStorage instead of a hardcoded placeholder */}
        <Text style={[styles.pageSubtitle, { color: colors.TEXT_SECONDARY }]}>
          Signed in as: {guardianName}
        </Text>

        <View style={[styles.card, { backgroundColor: colors.SURFACE }]}>
          <Text style={[styles.cardTitle, { color: colors.TEXT_PRIMARY }]}>
            Mood Trends
          </Text>
          <Text style={[styles.cardSubtitle, { color: colors.TEXT_SECONDARY }]}>
            Mental wellness overview from the past 7 days
          </Text>
          <MoodTrendChart scores={[0, 0, 0, 0, 0, 0, 0]} />
        </View>

        <Text style={[styles.sectionTitle, { color: colors.TEXT_PRIMARY }]}>
          Activity Overview
        </Text>
        <View style={styles.activityRow}>
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

        <Text style={[styles.footer, { color: colors.TEXT_TERTIARY }]}>
          Bean AI · Caregiver/Therapist Portal v2.4.1
        </Text>
      </ScrollView>

      <CaregiverMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        navigation={navigation}
        colors={colors}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
    </SafeAreaView>
  );
};

const menuStyles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  panel: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: PANEL_WIDTH,
    borderTopLeftRadius: BORDER_RADIUS.XXL,
    borderBottomLeftRadius: BORDER_RADIUS.XXL,
    paddingTop: 56,
    paddingHorizontal: SPACING.XL,
    paddingBottom: SPACING.XXXL,
    shadowColor: '#000000',
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 20,
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: { fontSize: 14, fontWeight: '600' },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.SM,
    marginBottom: 4,
  },
  brandLogo: { width: 32, height: 32 },
  brandName: { fontSize: 20, fontWeight: '800' as const },
  brandSub: { fontSize: 12, marginBottom: SPACING.LG },
  divider: { height: 1, marginVertical: SPACING.LG },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.MD,
    gap: SPACING.LG,
    borderRadius: BORDER_RADIUS.LG,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemEmoji: { fontSize: 20 },
  menuIcon: { width: 22, height: 22 },
  menuLabel: { flex: 1, fontSize: 16, fontWeight: '500' as const },
  chevron: { fontSize: 22 },
  logOutButton: {
    backgroundColor: '#FF4D6D',
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: SPACING.MD,
    paddingHorizontal: SPACING.XL,
    alignItems: 'center',
    marginBottom: SPACING.MD,
  },
  logOutText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  versionText: { fontSize: 11, textAlign: 'center' },
});

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
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.XS },
  headerLogo: { width: 32, height: 32, borderRadius: 16 },
  headerBrandName: { fontSize: 16, fontWeight: '700' as const },
  headerTitle: { fontSize: 15, fontWeight: '700' as const },
  hamburgerBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hamburger: { fontSize: 26, lineHeight: 28 },
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
