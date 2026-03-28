// Displays and edits the authenticated user's personal details and security
// settings. The full-name field supports inline editing; all other fields are
// read-only. Save persists changes; Delete navigates back to the Welcome screen.

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';
import { useTheme } from '../../context/ThemeContext';

const AccountInformationScreen = ({ navigation }: any) => {
  const { colors, isDark } = useTheme();

  const [fullName, setFullName] = useState('Alex Johnson');
  const [email] = useState('alex.johnson@example.com');
  const [phone] = useState('+1 (555) 012-3456');
  const [guardianPhone] = useState('+1 (555) 045-2235');
  const [editingName, setEditingName] = useState(false);

  // Pre-resolved hex strings (LIGHT_COLORS.TEXT_PRIMARY = '#000000',
  // DARK_COLORS.TEXT_PRIMARY = '#F1F5F9') so Android image tinting never fails.
  const iconTint = isDark ? '#F1F5F9' : '#000000';

  // TODO: persist updated fields to backend before showing the confirmation.
  const handleSaveChanges = () => {
    Alert.alert('Success', 'Your account information has been updated!', [
      { text: 'OK' },
    ]);
  };

  // Requires confirmation before permanently removing the account.
  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => navigation.navigate('Welcome'),
        },
      ],
    );
  };

  // Reuses the existing forgot-password flow to handle the password change.
  const handleChangePassword = () => {
    navigation.navigate('ForgotPassword', { userType: 'user' });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.BACKGROUND }]}
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
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={[styles.backIcon, { color: colors.TEXT_PRIMARY }]}>
            ‹
          </Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.TEXT_PRIMARY }]}>
          Account Information
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar and membership badge */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrap}>
            <Image
              source={require('../../../assets/images/select-user-green.png')}
              style={styles.avatarImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumText}>Bean Premium Member</Text>
          </View>
          <Text style={[styles.expiry, { color: colors.TEXT_TERTIARY }]}>
            expires on 01/09/2027
          </Text>
        </View>

        {/* Personal details section */}
        <Text style={[styles.sectionTitle, { color: colors.TEXT_PRIMARY }]}>
          Personal Details
        </Text>

        <View
          style={[
            styles.detailsCard,
            {
              backgroundColor: colors.SURFACE,
              borderColor: colors.BORDER_LIGHT,
            },
          ]}
        >
          {/* Full Name — the only editable field; tapping the pencil icon activates a TextInput */}
          <View style={styles.fieldWrap}>
            <Text style={[styles.fieldLabel, { color: colors.TEXT_TERTIARY }]}>
              Full Name
            </Text>
            <View style={styles.fieldRow}>
              <Image
                source={require('../../../assets/images/full-name.png')}
                style={[styles.fieldIcon, { tintColor: iconTint }]}
                resizeMode="contain"
              />
              {editingName ? (
                <TextInput
                  style={[styles.fieldInput, { color: colors.TEXT_PRIMARY }]}
                  value={fullName}
                  onChangeText={setFullName}
                  autoFocus
                  onBlur={() => setEditingName(false)}
                />
              ) : (
                <Text
                  style={[styles.fieldValue, { color: colors.TEXT_PRIMARY }]}
                >
                  {fullName}
                </Text>
              )}
              <TouchableOpacity onPress={() => setEditingName(true)}>
                <Text style={[styles.editIcon, { color: colors.TEXT_PRIMARY }]}>
                  ✏️
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={[
              styles.fieldDivider,
              { backgroundColor: colors.BORDER_LIGHT },
            ]}
          />

          {/* Email — read-only */}
          <View style={styles.fieldWrap}>
            <Text style={[styles.fieldLabel, { color: colors.TEXT_TERTIARY }]}>
              Email Address
            </Text>
            <View style={styles.fieldRow}>
              <Text
                style={[styles.fieldIconEmoji, { color: colors.TEXT_PRIMARY }]}
              >
                ✉️
              </Text>
              <Text style={[styles.fieldValue, { color: colors.TEXT_PRIMARY }]}>
                {email}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.fieldDivider,
              { backgroundColor: colors.BORDER_LIGHT },
            ]}
          />

          {/* Phone — read-only */}
          <View style={styles.fieldWrap}>
            <Text style={[styles.fieldLabel, { color: colors.TEXT_TERTIARY }]}>
              Phone Number
            </Text>
            <View style={styles.fieldRow}>
              <Image
                source={require('../../../assets/images/phone-number.png')}
                style={[styles.fieldIcon, { tintColor: iconTint }]}
                resizeMode="contain"
              />
              <Text style={[styles.fieldValue, { color: colors.TEXT_PRIMARY }]}>
                {phone}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.fieldDivider,
              { backgroundColor: colors.BORDER_LIGHT },
            ]}
          />

          {/* Guardian phone — read-only */}
          <View style={styles.fieldWrap}>
            <Text style={[styles.fieldLabel, { color: colors.TEXT_TERTIARY }]}>
              Guardian's Phone Number
            </Text>
            <View style={styles.fieldRow}>
              <Image
                source={require('../../../assets/images/phone-number.png')}
                style={[styles.fieldIcon, { tintColor: iconTint }]}
                resizeMode="contain"
              />
              <Text style={[styles.fieldValue, { color: colors.TEXT_PRIMARY }]}>
                {guardianPhone}
              </Text>
            </View>
          </View>
        </View>

        {/* Security section */}
        <Text style={[styles.sectionTitle, { color: colors.TEXT_PRIMARY }]}>
          Security
        </Text>

        {/* Tapping this row redirects to the ForgotPassword flow */}
        <TouchableOpacity
          style={[
            styles.securityCard,
            {
              backgroundColor: colors.SURFACE,
              borderColor: colors.BORDER_LIGHT,
            },
          ]}
          onPress={handleChangePassword}
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.lockCircle,
              { backgroundColor: colors.SECONDARY_LIGHT },
            ]}
          >
            <Image
              source={require('../../../assets/images/lock.png')}
              style={[styles.lockIconImage, { tintColor: iconTint }]}
              resizeMode="contain"
            />
          </View>
          <View style={styles.securityText}>
            <Text
              style={[styles.securityTitle, { color: colors.TEXT_PRIMARY }]}
            >
              Change Password
            </Text>
            <Text style={[styles.securitySub, { color: colors.TEXT_TERTIARY }]}>
              Last updated 3 months ago
            </Text>
          </View>
          <Text style={[styles.chevron, { color: colors.TEXT_PRIMARY }]}>
            ›
          </Text>
        </TouchableOpacity>

        {/* Danger zone */}
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={handleDeleteAccount}
          activeOpacity={0.85}
        >
          <Text style={styles.deleteBtnText}>Delete Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.saveBtn, { backgroundColor: colors.PRIMARY }]}
          onPress={handleSaveChanges}
          activeOpacity={0.85}
        >
          <Text style={styles.saveBtnText}>Save Changes</Text>
        </TouchableOpacity>
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
    paddingTop: SPACING.XL,
    paddingBottom: SPACING.MASSIVE,
  },

  // Avatar
  avatarSection: { alignItems: 'center', marginBottom: SPACING.XL },
  avatarWrap: { marginBottom: SPACING.SM },
  avatarImage: { width: 80, height: 80, borderRadius: 40 },

  // Green membership badge
  premiumBadge: {
    backgroundColor: '#16A34A',
    borderRadius: BORDER_RADIUS.ROUND,
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.XS,
    marginBottom: 4,
  },
  premiumText: { fontSize: 12, fontWeight: '700' as const, color: '#FFFFFF' },
  expiry: { fontSize: 11 },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '700' as const,
    marginBottom: SPACING.MD,
  },

  // Details card containing all personal fields
  detailsCard: {
    borderRadius: BORDER_RADIUS.XL,
    borderWidth: 1,
    marginBottom: SPACING.XL,
    overflow: 'hidden',
  },
  fieldWrap: { paddingHorizontal: SPACING.LG, paddingVertical: SPACING.MD },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '600' as const,
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  fieldRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.SM },
  fieldIcon: { width: 18, height: 18, flexShrink: 0 },
  fieldIconEmoji: { fontSize: 16, width: 20, textAlign: 'center' },
  fieldValue: { flex: 1, fontSize: 15, fontWeight: '500' as const },
  fieldInput: { flex: 1, fontSize: 15, fontWeight: '500' as const, padding: 0 },
  editIcon: { fontSize: 14 },
  fieldDivider: { height: 1 },

  // Security row
  securityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.XL,
    borderWidth: 1,
    padding: SPACING.LG,
    gap: SPACING.MD,
    marginBottom: SPACING.XL,
  },
  lockCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockIconImage: { width: 24, height: 24 },
  securityText: { flex: 1 },
  securityTitle: { fontSize: 15, fontWeight: '600' as const, marginBottom: 2 },
  securitySub: { fontSize: 12 },
  chevron: { fontSize: 20, lineHeight: 24 },

  // Danger zone button
  deleteBtn: {
    borderWidth: 1.5,
    borderColor: '#EF4444',
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: SPACING.LG,
    alignItems: 'center',
    marginBottom: SPACING.MD,
    backgroundColor: '#FEF2F2',
  },
  deleteBtnText: { fontSize: 15, fontWeight: '700' as const, color: '#EF4444' },

  // Primary save button
  saveBtn: {
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: SPACING.LG,
    alignItems: 'center',
  },
  saveBtnText: { fontSize: 15, fontWeight: '700' as const, color: '#FFFFFF' },
});

export default AccountInformationScreen;
