// Confirmation screen displayed after a successful Bean robot pairing.
// Shows a layered success icon, connection status, battery level,
// and a button that navigates the user into the main app.

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { PrimaryButton } from '../../components';
import { SPACING, TYPOGRAPHY } from '../../constants';
import { useTheme } from '../../context/ThemeContext';

const BeanConnectedScreen = ({ navigation }: any) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.SURFACE }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Three concentric circles forming a success checkmark indicator */}
        <View style={styles.iconContainer}>
          <View
            style={[
              styles.outerCircle,
              { backgroundColor: colors.SECONDARY_LIGHT },
            ]}
          >
            <View style={styles.middleCircle}>
              <View
                style={[
                  styles.innerCircle,
                  { backgroundColor: colors.PRIMARY },
                ]}
              >
                <Text style={styles.checkmark}>✓</Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={[styles.title, { color: colors.TEXT_PRIMARY }]}>
          Bean Connected!
        </Text>
        <Text style={[styles.subtitle, { color: colors.TEXT_SECONDARY }]}>
          Your robot is now synced and ready to go.
        </Text>

        {/* Status cards showing connection security and battery level */}
        <View style={styles.statusContainer}>
          {/* Connection status card */}
          <View
            style={[
              styles.statusCard,
              { backgroundColor: colors.SECONDARY_LIGHT },
            ]}
          >
            <View
              style={[
                styles.statusIconContainer,
                { backgroundColor: colors.PRIMARY },
              ]}
            >
              <Image
                source={require('../../../assets/images/connection-status.png')}
                style={styles.statusIconImage}
                resizeMode="contain"
              />
            </View>
            <Text style={[styles.statusLabel, { color: colors.TEXT_PRIMARY }]}>
              Connection Status
            </Text>
            <View
              style={[styles.statusBadge, { backgroundColor: colors.PRIMARY }]}
            >
              <Text style={[styles.statusBadgeText, { color: colors.WHITE }]}>
                Secured
              </Text>
            </View>
          </View>

          {/* Battery level card */}
          <View
            style={[
              styles.statusCard,
              { backgroundColor: colors.SECONDARY_LIGHT },
            ]}
          >
            <View
              style={[
                styles.statusIconContainer,
                { backgroundColor: colors.PRIMARY },
              ]}
            >
              <Image
                source={require('../../../assets/images/battery-level.png')}
                style={styles.statusIconImage}
                resizeMode="contain"
              />
            </View>
            <Text style={[styles.statusLabel, { color: colors.TEXT_PRIMARY }]}>
              Battery Level
            </Text>
            <View
              style={[styles.statusBadge, { backgroundColor: colors.PRIMARY }]}
            >
              <Text style={[styles.statusBadgeText, { color: colors.WHITE }]}>
                0%
              </Text>
            </View>
          </View>
        </View>

        {/* Proceeds to the main user app shell */}
        <PrimaryButton
          title="Next"
          onPress={() => navigation.navigate('UserApp')}
          variant="primary"
          size="large"
          fullWidth
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.HUGE,
    paddingBottom: SPACING.XXL,
    alignItems: 'center',
  },
  iconContainer: { marginBottom: SPACING.XXL },

  // Layered circles: outer (light tint) → middle (fixed mid-green) → inner (primary)
  outerCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#7FE4C4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: { fontSize: 40, color: '#FFFFFF', fontWeight: 'bold' },

  title: {
    ...TYPOGRAPHY.H1,
    textAlign: 'center',
    marginBottom: SPACING.SM,
    fontWeight: 'bold',
  },
  subtitle: {
    ...TYPOGRAPHY.BODY,
    textAlign: 'center',
    marginBottom: SPACING.HUGE,
    lineHeight: 20,
    paddingHorizontal: SPACING.LG,
  },

  statusContainer: {
    width: '100%',
    gap: SPACING.MD,
    marginBottom: SPACING.XXL,
  },

  // Each row holds an icon, a label, and a coloured badge on the right.
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: SPACING.LG,
    paddingVertical: SPACING.LG,
    paddingHorizontal: SPACING.LG,
  },
  statusIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.MD,
    overflow: 'hidden',
  },
  statusIconImage: { width: 28, height: 28 },
  statusLabel: { ...TYPOGRAPHY.BODY, flex: 1, fontWeight: '500' },
  statusBadge: {
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.XS,
    borderRadius: SPACING.MD,
  },
  statusBadgeText: { ...TYPOGRAPHY.BODY, fontWeight: '600' },
});

export default BeanConnectedScreen;
