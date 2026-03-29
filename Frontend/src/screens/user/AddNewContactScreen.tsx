// Form for adding a new emergency contact. The user can enter details manually
// or import from the device address book via the sync option. A custom
// dropdown handles relationship selection.

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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';
import { useTheme } from '../../context/ThemeContext';

// Predefined relationship options shown in the dropdown.
const RELATIONSHIPS = [
  'Mother',
  'Father',
  'Sibling',
  'Partner',
  'Friend',
  'Therapist',
  'Guardian',
  'Other',
];

const AddNewContactScreen = ({ navigation }: any) => {
  const { colors } = useTheme();

  const [fullName, setFullName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [phone, setPhone] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  // Validates all three required fields before confirming and navigating back.
  const handleSave = () => {
    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter a full name');
      return;
    }
    if (!relationship) {
      Alert.alert('Error', 'Please select a relationship');
      return;
    }
    if (!phone.trim()) {
      Alert.alert('Error', 'Please enter a phone number');
      return;
    }
    Alert.alert(
      'Success',
      `${fullName} has been added as an emergency contact!`,
      [{ text: 'OK', onPress: () => navigation.goBack() }],
    );
  };

  // Confirms intent before reading from the device contacts.
  // TODO: wire up to react-native-contacts for actual sync.
  const handleSync = () => {
    Alert.alert(
      'Sync from Contacts',
      'This will sync contacts from your phone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sync', onPress: () => {} },
      ],
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.BACKGROUND_LIGHT }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
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
            Add New Contact
          </Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Dashed circle icon acts as the contact photo placeholder */}
          <View
            style={[
              styles.addIconOuter,
              {
                borderColor: colors.PRIMARY,
                backgroundColor: colors.SECONDARY_LIGHT,
              },
            ]}
          >
            <Image
              source={require('../../../assets/images/add-contact.png')}
              style={styles.addIcon}
              resizeMode="contain"
            />
          </View>

          <Text style={[styles.subtitle, { color: colors.TEXT_SECONDARY }]}>
            Add someone your companion robot can reach out to when you need
            extra support.
          </Text>

          {/* Phone contacts sync shortcut */}
          <TouchableOpacity
            style={[
              styles.syncBtn,
              {
                backgroundColor: colors.SECONDARY_LIGHT,
                borderColor: colors.PRIMARY,
              },
            ]}
            onPress={handleSync}
            activeOpacity={0.8}
          >
            <Image
              source={require('../../../assets/images/sync-contact.png')}
              style={styles.syncBtnIcon}
              resizeMode="contain"
            />
            <Text style={styles.syncBtnText}>Sync from Contacts</Text>
          </TouchableOpacity>

          {/* Separator between the sync option and manual entry form */}
          <View style={styles.dividerRow}>
            <View
              style={[
                styles.dividerLine,
                { backgroundColor: colors.BORDER_LIGHT },
              ]}
            />
            <Text style={[styles.dividerText, { color: colors.TEXT_TERTIARY }]}>
              OR ENTER MANUALLY
            </Text>
            <View
              style={[
                styles.dividerLine,
                { backgroundColor: colors.BORDER_LIGHT },
              ]}
            />
          </View>

          {/* Full Name field */}
          <Text style={[styles.fieldLabel, { color: colors.TEXT_SECONDARY }]}>
            Full Name
          </Text>
          <View
            style={[
              styles.inputWrap,
              { backgroundColor: colors.SECONDARY_LIGHT },
            ]}
          >
            <Image
              source={require('../../../assets/images/full-name.png')}
              style={styles.inputIcon}
              resizeMode="contain"
            />
            <TextInput
              style={[styles.input, { color: colors.TEXT_PRIMARY }]}
              placeholder="e.g. Sarah Jenkins"
              placeholderTextColor={colors.TEXT_TERTIARY}
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />
          </View>

          {/* Relationship selector — toggling this row shows or hides the dropdown list */}
          <Text style={[styles.fieldLabel, { color: colors.TEXT_SECONDARY }]}>
            Relationship
          </Text>
          <TouchableOpacity
            style={[
              styles.inputWrap,
              { backgroundColor: colors.SECONDARY_LIGHT },
            ]}
            onPress={() => setShowDropdown(!showDropdown)}
            activeOpacity={0.8}
          >
            <Image
              source={require('../../../assets/images/relationship.png')}
              style={styles.inputIcon}
              resizeMode="contain"
            />
            <Text
              style={[
                styles.input,
                {
                  color: relationship
                    ? colors.TEXT_PRIMARY
                    : colors.TEXT_TERTIARY,
                },
              ]}
            >
              {relationship || 'Select relationship'}
            </Text>
            <Text
              style={[styles.dropdownArrow, { color: colors.TEXT_SECONDARY }]}
            >
              {showDropdown ? '▲' : '▼'}
            </Text>
          </TouchableOpacity>

          {/* Dropdown options rendered inline below the selector */}
          {showDropdown && (
            <View
              style={[
                styles.dropdown,
                {
                  backgroundColor: colors.SURFACE,
                  borderColor: colors.BORDER_LIGHT,
                },
              ]}
            >
              {RELATIONSHIPS.map(rel => (
                <TouchableOpacity
                  key={rel}
                  style={[
                    styles.dropdownItem,
                    { borderBottomColor: colors.BORDER_LIGHT },
                  ]}
                  onPress={() => {
                    setRelationship(rel);
                    setShowDropdown(false);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      { color: colors.TEXT_PRIMARY },
                      // Highlight the currently selected option in the primary colour.
                      relationship === rel && {
                        color: colors.PRIMARY,
                        fontWeight: '700' as const,
                      },
                    ]}
                  >
                    {rel}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Phone Number field */}
          <Text style={[styles.fieldLabel, { color: colors.TEXT_SECONDARY }]}>
            Phone Number
          </Text>
          <View
            style={[
              styles.inputWrap,
              { backgroundColor: colors.SECONDARY_LIGHT },
            ]}
          >
            <Image
              source={require('../../../assets/images/phone-number.png')}
              style={styles.inputIcon}
              resizeMode="contain"
            />
            <TextInput
              style={[styles.input, { color: colors.TEXT_PRIMARY }]}
              placeholder="+1 (555) 000-0000"
              placeholderTextColor={colors.TEXT_TERTIARY}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <TouchableOpacity
            style={styles.saveBtn}
            onPress={handleSave}
            activeOpacity={0.85}
          >
            <Text style={styles.saveBtnText}>Save Contact</Text>
          </TouchableOpacity>

          {/* Privacy reassurance shown below the save action */}
          <Text style={[styles.disclaimer, { color: colors.TEXT_TERTIARY }]}>
            Your contact information is encrypted and only used in cases of
            emergency or requested support.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
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
    alignItems: 'center',
  },

  // Dashed circular border around the placeholder icon.
  addIconOuter: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.LG,
  },
  addIcon: { width: 50, height: 50 },
  subtitle: {
    ...TYPOGRAPHY.BODY,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.XL,
    paddingHorizontal: SPACING.MD,
  },

  syncBtn: {
    width: '100%',
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: SPACING.LG,
    alignItems: 'center',
    borderWidth: 1.5,
    marginBottom: SPACING.LG,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.SM,
  },
  syncBtnIcon: { width: 45, height: 45 },
  syncBtnText: { fontSize: 15, fontWeight: '600' as const, color: '#22C55E' },

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: SPACING.SM,
    marginBottom: SPACING.XL,
  },
  dividerLine: { flex: 1, height: 1 },
  dividerText: { fontSize: 11, fontWeight: '600' as const, letterSpacing: 0.8 },

  fieldLabel: {
    alignSelf: 'flex-start',
    fontSize: 13,
    fontWeight: '600' as const,
    marginBottom: SPACING.XS,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderRadius: BORDER_RADIUS.LG,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.MD,
    marginBottom: SPACING.LG,
    gap: SPACING.SM,
  },
  // Icon tint is hardcoded to a neutral slate so it works on any background colour.
  inputIcon: { width: 26, height: 26, flexShrink: 0, tintColor: '#94A3B8' },
  input: { flex: 1, fontSize: 15, paddingTop: 0, paddingBottom: 0 },
  dropdownArrow: { fontSize: 12 },

  // Dropdown list positioned flush below the selector row.
  dropdown: {
    width: '100%',
    borderRadius: BORDER_RADIUS.LG,
    borderWidth: 1,
    marginTop: -SPACING.LG,
    marginBottom: SPACING.LG,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: SPACING.MD,
    paddingHorizontal: SPACING.LG,
    borderBottomWidth: 1,
  },
  dropdownItemText: { fontSize: 14 },

  saveBtn: {
    width: '100%',
    backgroundColor: '#22C55E',
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: SPACING.LG,
    alignItems: 'center',
    marginBottom: SPACING.MD,
    elevation: 5,
  },
  saveBtnText: { fontSize: 16, fontWeight: '700' as const, color: '#FFFFFF' },
  disclaimer: {
    ...TYPOGRAPHY.CAPTION,
    textAlign: 'center',
    lineHeight: 17,
    paddingHorizontal: SPACING.MD,
  },
});

export default AddNewContactScreen;
