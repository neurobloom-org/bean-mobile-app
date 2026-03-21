// src/screens/user/EmergencyContactsScreen.tsx
// ✅ FIGMA-MATCHED — Trusted Circle · Contact list · Add New Contact

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';

interface Contact {
  id: string;
  name: string;
  relationship: string;
}

const EmergencyContactsScreen = ({ navigation }: any) => {
  const [contacts, setContacts] = useState<Contact[]>([]); // ✅ empty by default

  const handleDelete = (id: string) => {
    Alert.alert(
      'Remove Contact',
      'Are you sure you want to remove this contact?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => setContacts(prev => prev.filter(c => c.id !== id)),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Emergency Contacts</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Top icon ── */}
        <View style={styles.topIconWrap}>
          <Image
            source={require('../../../assets/images/emergency-contact-top-icon.png')}
            style={styles.topIcon}
            resizeMode="contain"
          />
        </View>

        {/* ── Subtitle ── */}
        <Text style={styles.subtitle}>
          Your Bean will reach out to these trusted people if you ever need
          immediate support.
        </Text>

        {/* ── Your Trusted Circle ── */}
        <Text style={styles.sectionGreen}>Your Trusted Circle</Text>

        <View style={styles.contactsList}>
          {contacts.length === 0 ? (
            // ✅ Empty state
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>👥</Text>
              <Text style={styles.emptyTitle}>No contacts added yet</Text>
              <Text style={styles.emptySubtitle}>
                Add trusted people who Bean can alert in an emergency.
              </Text>
            </View>
          ) : (
            contacts.map(contact => (
              <View key={contact.id} style={styles.contactCard}>
                <View style={styles.avatarCircle}>
                  <Image
                    source={require('../../../assets/images/contact.png')}
                    style={styles.avatarIcon}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>{contact.name}</Text>
                  <Text style={styles.contactRel}>
                    Relationship: {contact.relationship}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => handleDelete(contact.id)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Image
                    source={require('../../../assets/images/delete-contact.png')}
                    style={styles.deleteIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        {/* ── Add New Contact button ── */}
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('AddNewContact')}
          activeOpacity={0.8}
        >
          <Image
            source={require('../../../assets/images/add-contact.png')}
            style={styles.addBtnIcon}
            resizeMode="contain"
          />
          <Text style={styles.addBtnText}>Add New Contact</Text>
        </TouchableOpacity>
      </ScrollView>
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

  // Top icon
  topIconWrap: {
    marginBottom: SPACING.LG,
  },
  topIcon: {
    width: 100,
    height: 100,
  },

  // Subtitle
  subtitle: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.XL,
    paddingHorizontal: SPACING.MD,
  },

  // Section label
  sectionGreen: {
    alignSelf: 'flex-start',
    fontSize: 15,
    fontWeight: '700' as const,
    color: COLORS.PRIMARY_DARK,
    marginBottom: SPACING.MD,
  },

  // Empty state
  emptyState: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: SPACING.HUGE,
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.XL,
    gap: SPACING.SM,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: SPACING.SM,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: COLORS.TEXT_PRIMARY,
  },
  emptySubtitle: {
    ...TYPOGRAPHY.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    paddingHorizontal: SPACING.XL,
    lineHeight: 18,
  },

  // Contacts list
  contactsList: {
    width: '100%',
    gap: SPACING.MD,
    marginBottom: SPACING.XL,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.SECONDARY_LIGHT, // ✅ light green bg
    borderRadius: BORDER_RADIUS.XL,
    paddingVertical: SPACING.MD,
    paddingHorizontal: SPACING.LG,
    gap: SPACING.MD,
  },

  // Avatar
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  avatarIcon: {
    width: 28,
    height: 28,
  },

  // Contact info
  contactInfo: { flex: 1 },
  contactName: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: COLORS.TEXT_PRIMARY,
  },
  contactRel: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    marginTop: 2,
  },

  // Delete button
  deleteBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  deleteIcon: {
    width: 32,
    height: 32,
  },

  // Add New Contact button — dashed border style
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: SPACING.LG,
    borderWidth: 1.5,
    borderColor: COLORS.PRIMARY,
    borderRadius: BORDER_RADIUS.XL,
    borderStyle: 'dashed',
    gap: SPACING.SM,
    backgroundColor: COLORS.WHITE,
  },
  addBtnIcon: {
    width: 28,
    height: 28,
  },
  addBtnText: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: COLORS.PRIMARY,
  },
});

export default EmergencyContactsScreen;
