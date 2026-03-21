// src/screens/user/AddNewContactScreen.tsx
// ✅ FIGMA-MATCHED — Add contact icon · Sync · Manual form · Save

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
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';

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
  const [fullName, setFullName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [phone, setPhone] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add New Contact</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Add contact icon — dashed ring ── */}
          <View style={styles.addIconOuter}>
            <Image
              source={require('../../../assets/images/add-contact.png')}
              style={styles.addIcon}
              resizeMode="contain"
            />
          </View>

          {/* ── Subtitle ── */}
          <Text style={styles.subtitle}>
            Add someone your companion robot can reach out to when you need
            extra support.
          </Text>

          {/* ── Sync from Contacts button ── */}
          <TouchableOpacity
            style={styles.syncBtn}
            onPress={handleSync}
            activeOpacity={0.8}
          >
            <Text style={styles.syncBtnIcon}>📋</Text>
            <Text style={styles.syncBtnText}>Sync from Contacts</Text>
          </TouchableOpacity>

          {/* ── OR ENTER MANUALLY ── */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR ENTER MANUALLY</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* ── Full Name ── */}
          <Text style={styles.fieldLabel}>Full Name</Text>
          <View style={styles.inputWrap}>
            <Text style={styles.inputIcon}>👤</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Sarah Jenkins"
              placeholderTextColor={COLORS.TEXT_TERTIARY}
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />
          </View>

          {/* ── Relationship dropdown ── */}
          <Text style={styles.fieldLabel}>Relationship</Text>
          <TouchableOpacity
            style={styles.inputWrap}
            onPress={() => setShowDropdown(!showDropdown)}
            activeOpacity={0.8}
          >
            <Text style={styles.inputIcon}>👥</Text>
            <Text
              style={[
                styles.input,
                !relationship && { color: COLORS.TEXT_TERTIARY },
              ]}
            >
              {relationship || 'Select relationship'}
            </Text>
            <Text style={styles.dropdownArrow}>{showDropdown ? '▲' : '▼'}</Text>
          </TouchableOpacity>

          {/* Dropdown options */}
          {showDropdown && (
            <View style={styles.dropdown}>
              {RELATIONSHIPS.map(rel => (
                <TouchableOpacity
                  key={rel}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setRelationship(rel);
                    setShowDropdown(false);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      relationship === rel && styles.dropdownItemActive,
                    ]}
                  >
                    {rel}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* ── Phone Number ── */}
          <Text style={styles.fieldLabel}>Phone Number</Text>
          <View style={styles.inputWrap}>
            <Text style={styles.inputIcon}>📞</Text>
            <TextInput
              style={styles.input}
              placeholder="+1 (555) 000-0000"
              placeholderTextColor={COLORS.TEXT_TERTIARY}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          {/* ── Save Contact button ── */}
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={handleSave}
            activeOpacity={0.85}
          >
            <Text style={styles.saveBtnText}>Save Contact</Text>
          </TouchableOpacity>

          {/* ── Disclaimer ── */}
          <Text style={styles.disclaimer}>
            Your contact information is encrypted and only used in cases of
            emergency or requested support.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.BACKGROUND_LIGHT },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_LIGHT,
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  backIcon: { fontSize: 28, color: COLORS.TEXT_PRIMARY, lineHeight: 32 },
  headerTitle: { ...TYPOGRAPHY.H4, color: COLORS.TEXT_PRIMARY },

  scroll: {
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.XL,
    paddingBottom: SPACING.MASSIVE,
    alignItems: 'center',
  },

  // Add icon — dashed ring
  addIconOuter: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.LG,
    backgroundColor: COLORS.SECONDARY_LIGHT,
  },
  addIcon: {
    width: 50,
    height: 50,
  },

  subtitle: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.XL,
    paddingHorizontal: SPACING.MD,
  },

  // Sync button — green border, green text, green icon ✅
  syncBtn: {
    width: '100%',
    backgroundColor: COLORS.SECONDARY_LIGHT,
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: SPACING.LG,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.PRIMARY,
    marginBottom: SPACING.LG,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.SM,
  },
  syncBtnText: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: '#22C55E', // ✅ green text like Figma
  },
  syncBtnIcon: {
    fontSize: 16,
    color: '#22C55E', // ✅ green icon
  },

  // Divider
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: SPACING.SM,
    marginBottom: SPACING.XL,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.BORDER_LIGHT,
  },
  dividerText: {
    fontSize: 11,
    fontWeight: '600' as const,
    color: COLORS.TEXT_TERTIARY,
    letterSpacing: 0.8,
  },

  // Field label
  fieldLabel: {
    alignSelf: 'flex-start',
    fontSize: 13,
    fontWeight: '600' as const,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.XS,
  },

  // Input wrap
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.SECONDARY_LIGHT,
    borderRadius: BORDER_RADIUS.LG,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.MD,
    marginBottom: SPACING.LG,
    gap: SPACING.SM,
  },
  inputIcon: {
    fontSize: 18,
    color: '#94A3B8', // ✅ grey like Figma image
    flexShrink: 0,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.TEXT_PRIMARY,
    paddingTop: 0,
    paddingBottom: 0,
  },
  dropdownArrow: {
    fontSize: 12,
    color: COLORS.TEXT_SECONDARY,
  },

  // Dropdown
  dropdown: {
    width: '100%',
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.LG,
    borderWidth: 1,
    borderColor: COLORS.BORDER_LIGHT,
    marginTop: -SPACING.LG,
    marginBottom: SPACING.LG,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: SPACING.MD,
    paddingHorizontal: SPACING.LG,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_LIGHT,
  },
  dropdownItemText: {
    fontSize: 14,
    color: COLORS.TEXT_PRIMARY,
  },
  dropdownItemActive: {
    color: COLORS.PRIMARY,
    fontWeight: '700' as const,
  },

  // Save button
  saveBtn: {
    width: '100%',
    backgroundColor: '#22C55E',
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: SPACING.LG,
    alignItems: 'center',
    marginBottom: SPACING.MD,
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: COLORS.WHITE,
  },

  // Disclaimer
  disclaimer: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_TERTIARY,
    textAlign: 'center',
    lineHeight: 17,
    paddingHorizontal: SPACING.MD,
  },
});

export default AddNewContactScreen;
