// Combined profile and account settings screen for the caregiver role.
// Covers personal details, professional information, monitored patient summary,
// password change, and account deletion — all in a single scrollable layout.

import React, { useState, useEffect } from 'react';
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
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';

const SectionTitle = ({ label, colors }: { label: string; colors: any }) => (
  <Text style={[sectionStyle.title, { color: colors.PRIMARY }]}>{label}</Text>
);
const sectionStyle = StyleSheet.create({
  title: {
    fontSize: 13,
    fontWeight: '700' as const,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
    marginTop: 24,
    marginLeft: 4,
  },
});

interface FieldRowProps {
  label: string;
  value: string;
  iconSource: any;
  editable?: boolean;
  onEdit?: () => void;
  colors: any;
  isDark: boolean;
  onChangeText?: (text: string) => void;
  isEditing?: boolean;
  onBlur?: () => void;
  keyboardType?: any;
}

const FieldRow: React.FC<FieldRowProps> = ({
  label,
  value,
  iconSource,
  editable = false,
  onEdit,
  colors,
  isDark,
  onChangeText,
  isEditing,
  onBlur,
  keyboardType = 'default',
}) => {
  const iconTint = isDark ? '#F1F5F9' : '#000000';
  return (
    <View style={fieldStyle.wrap}>
      <Text style={[fieldStyle.label, { color: colors.TEXT_TERTIARY }]}>
        {label}
      </Text>
      <View style={fieldStyle.row}>
        <Image
          source={iconSource}
          style={[fieldStyle.icon, { tintColor: iconTint }]}
          resizeMode="contain"
        />
        {isEditing ? (
          <TextInput
            style={[fieldStyle.input, { color: colors.TEXT_PRIMARY }]}
            value={value}
            onChangeText={onChangeText}
            autoFocus
            onBlur={onBlur}
            keyboardType={keyboardType}
          />
        ) : (
          <Text style={[fieldStyle.value, { color: colors.TEXT_PRIMARY }]}>
            {value}
          </Text>
        )}
        {editable && !isEditing && (
          <TouchableOpacity onPress={onEdit}>
            <Text
              style={[fieldStyle.editIcon, { color: colors.TEXT_TERTIARY }]}
            >
              ✏️
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const fieldStyle = StyleSheet.create({
  wrap: { paddingHorizontal: SPACING.LG, paddingVertical: SPACING.MD },
  label: {
    fontSize: 11,
    fontWeight: '600' as const,
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: SPACING.SM },
  icon: { width: 18, height: 18, flexShrink: 0 },
  value: { flex: 1, fontSize: 15, fontWeight: '500' as const },
  input: { flex: 1, fontSize: 15, fontWeight: '500' as const, padding: 0 },
  editIcon: { fontSize: 14 },
});

const CaregiverAccountScreen = ({ navigation }: any) => {
  const { colors, isDark } = useTheme();
  const iconTint = isDark ? '#F1F5F9' : '#000000';
  const { userName } = useAuth();

  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [fullName, setFullName] = useState(userName !== 'there' ? userName : '');
  const [email] = useState('');
  const [phone, setPhone] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [specialisation, setSpecialisation] = useState('');
  const [wardName] = useState('Linked Patient');
  const [wardEmail] = useState('—');

  const [editingName, setEditingName] = useState(false);
  const [editingPhone, setEditingPhone] = useState(false);
  const [editingOrg, setEditingOrg] = useState(false);
  const [editingSpec, setEditingSpec] = useState(false);

  const handlePickPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow access to your photo library.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (!result.canceled && result.assets?.[0]?.uri) {
      setProfilePhoto(result.assets[0].uri);
    }
  };

  // TODO: persist updated fields to backend before showing the confirmation.
  const handleSave = () => {
    Alert.alert('Saved', 'Your account information has been updated.', [
      { text: 'OK' },
    ]);
  };

  const handleChangePassword = () => {
    navigation.navigate('ForgotPassword', { userType: 'guardian' });
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This will permanently delete your caregiver account and all associated data. This action cannot be undone.',
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

  const divider = (
    <View style={[styles.divider, { backgroundColor: colors.BORDER_LIGHT }]} />
  );

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
          Account & Profile
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar — shows the guardian's name loaded from AsyncStorage */}
        <View
          style={[styles.avatarSection, { backgroundColor: colors.SURFACE }]}
        >
          <TouchableOpacity
            onPress={handlePickPhoto}
            style={styles.avatarWrap}
            activeOpacity={0.85}
          >
            <Image
              source={
                profilePhoto
                  ? { uri: profilePhoto }
                  : require('../../../assets/images/select-user-green.png')
              }
              style={[
                styles.avatarImage,
                { backgroundColor: colors.SECONDARY_LIGHT },
              ]}
              resizeMode="cover"
            />
            <View style={styles.cameraOverlay}>
              <Text style={styles.cameraIcon}>📷</Text>
            </View>
          </TouchableOpacity>

          {/* Displays the name entered at signup instead of a hardcoded placeholder */}
          <Text style={[styles.avatarName, { color: colors.TEXT_PRIMARY }]}>
            {fullName || 'Caregiver'}
          </Text>

          <View
            style={[
              styles.roleBadge,
              { backgroundColor: colors.SECONDARY_LIGHT },
            ]}
          >
            <Text style={[styles.roleBadgeText, { color: colors.PRIMARY }]}>
              🩺 Caregiver / Therapist
            </Text>
          </View>
          <Text style={[styles.avatarHint, { color: colors.TEXT_TERTIARY }]}>
            Tap photo to change
          </Text>
        </View>

        {/* Personal details */}
        <SectionTitle label="Personal Details" colors={colors} />
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.SURFACE,
              borderColor: colors.BORDER_LIGHT,
            },
          ]}
        >
          <FieldRow
            label="Full Name"
            value={fullName}
            iconSource={require('../../../assets/images/full-name.png')}
            editable
            onEdit={() => setEditingName(true)}
            isEditing={editingName}
            onChangeText={setFullName}
            onBlur={() => setEditingName(false)}
            colors={colors}
            isDark={isDark}
          />
          {divider}
          <FieldRow
            label="Email Address"
            value={email || '—'}
            iconSource={require('../../../assets/images/mail.png')}
            colors={colors}
            isDark={isDark}
          />
          {divider}
          <FieldRow
            label="Phone Number"
            value={phone || '—'}
            iconSource={require('../../../assets/images/phone-number.png')}
            editable
            onEdit={() => setEditingPhone(true)}
            isEditing={editingPhone}
            onChangeText={setPhone}
            onBlur={() => setEditingPhone(false)}
            keyboardType="phone-pad"
            colors={colors}
            isDark={isDark}
          />
        </View>

        {/* Professional information */}
        <SectionTitle label="Professional Info" colors={colors} />
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.SURFACE,
              borderColor: colors.BORDER_LIGHT,
            },
          ]}
        >
          <FieldRow
            label="Organisation / Clinic"
            value={organisation || '—'}
            iconSource={require('../../../assets/images/account-info.png')}
            editable
            onEdit={() => setEditingOrg(true)}
            isEditing={editingOrg}
            onChangeText={setOrganisation}
            onBlur={() => setEditingOrg(false)}
            colors={colors}
            isDark={isDark}
          />
          {divider}
          <FieldRow
            label="Specialisation"
            value={specialisation || '—'}
            iconSource={require('../../../assets/images/analytics.png')}
            editable
            onEdit={() => setEditingSpec(true)}
            isEditing={editingSpec}
            onChangeText={setSpecialisation}
            onBlur={() => setEditingSpec(false)}
            colors={colors}
            isDark={isDark}
          />
        </View>

        {/* Monitored patient — populated from backend when connected */}
        <SectionTitle label="Monitored Patient" colors={colors} />
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.SURFACE,
              borderColor: colors.BORDER_LIGHT,
            },
          ]}
        >
          <View style={styles.patientRow}>
            <View
              style={[
                styles.patientAvatar,
                { backgroundColor: colors.SECONDARY_LIGHT },
              ]}
            >
              <Image
                source={require('../../../assets/images/select-user-green.png')}
                style={styles.patientAvatarImg}
                resizeMode="cover"
              />
            </View>
            <View style={styles.patientInfo}>
              <Text
                style={[styles.patientName, { color: colors.TEXT_PRIMARY }]}
              >
                {wardName}
              </Text>
              <Text
                style={[styles.patientEmail, { color: colors.TEXT_SECONDARY }]}
              >
                {wardEmail}
              </Text>
            </View>
            <View
              style={[
                styles.monitoringBadge,
                { backgroundColor: colors.SECONDARY_LIGHT },
              ]}
            >
              <View style={styles.monitoringDot} />
              <Text style={[styles.monitoringText, { color: colors.PRIMARY }]}>
                Active
              </Text>
            </View>
          </View>
        </View>

        {/* Security */}
        <SectionTitle label="Security" colors={colors} />
        <TouchableOpacity
          style={[
            styles.card,
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
              style={[styles.lockIcon, { tintColor: iconTint }]}
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
        <SectionTitle label="Danger Zone" colors={colors} />
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={handleDeleteAccount}
          activeOpacity={0.85}
        >
          <Text style={styles.deleteBtnText}>Delete Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.saveBtn, { backgroundColor: colors.PRIMARY }]}
          onPress={handleSave}
          activeOpacity={0.85}
        >
          <Text style={styles.saveBtnText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CaregiverAccountScreen;

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
  headerTitle: { fontSize: 17, fontWeight: '700' as const },
  scroll: {
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.LG,
    paddingBottom: SPACING.MASSIVE,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: SPACING.XL,
    borderRadius: BORDER_RADIUS.XL,
    marginBottom: 4,
  },
  avatarWrap: { position: 'relative', marginBottom: SPACING.MD },
  avatarImage: { width: 90, height: 90, borderRadius: 45 },
  cameraOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: { fontSize: 13 },
  avatarName: {
    fontSize: 20,
    fontWeight: '700' as const,
    marginBottom: SPACING.SM,
  },
  roleBadge: {
    borderRadius: BORDER_RADIUS.ROUND,
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.XS,
    marginBottom: SPACING.XS,
  },
  roleBadgeText: { fontSize: 13, fontWeight: '600' as const },
  avatarHint: { fontSize: 11 },
  card: {
    borderRadius: BORDER_RADIUS.XL,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 4,
  },
  divider: { height: 1 },
  patientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.LG,
    gap: SPACING.MD,
  },
  patientAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  patientAvatarImg: { width: 46, height: 46 },
  patientInfo: { flex: 1 },
  patientName: { fontSize: 15, fontWeight: '600' as const, marginBottom: 2 },
  patientEmail: { fontSize: 12 },
  monitoringBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.ROUND,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.XS,
    gap: 5,
  },
  monitoringDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#07882C',
  },
  monitoringText: { fontSize: 12, fontWeight: '600' as const },
  securityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.LG,
    gap: SPACING.MD,
  },
  lockCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockIcon: { width: 22, height: 22 },
  securityText: { flex: 1 },
  securityTitle: { fontSize: 15, fontWeight: '600' as const, marginBottom: 2 },
  securitySub: { fontSize: 12 },
  chevron: { fontSize: 20 },
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
  saveBtn: {
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: SPACING.LG,
    alignItems: 'center',
    shadowColor: '#4ECCA3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  saveBtnText: { fontSize: 15, fontWeight: '700' as const, color: '#FFFFFF' },
});
