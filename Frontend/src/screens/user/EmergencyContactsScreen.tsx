// src/screens/user/EmergencyContactsScreen.tsx
// ✅ Dark theme aware + white top icon in dark mode

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
import { SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';
import { useTheme } from '../../context/ThemeContext';

interface Contact {
  id: string;
  name: string;
  relationship: string;
}

const EmergencyContactsScreen = ({ navigation }: any) => {
  const { colors, isDark } = useTheme(); // ✅ added isDark
  const [contacts, setContacts] = useState<Contact[]>([]);

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
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.BACKGROUND_LIGHT }]}
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
          Emergency Contacts
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Top icon — ✅ white in dark mode */}
        <View style={styles.topIconWrap}>
          <Image
            source={require('../../../assets/images/emergency-contact-top-icon.png')}
            style={[
              styles.topIcon,
              isDark && { tintColor: '#FFFFFF' }, // ✅ pure white in dark mode
            ]}
            resizeMode="contain"
          />
        </View>

        {/* Subtitle */}
        <Text style={[styles.subtitle, { color: colors.TEXT_SECONDARY }]}>
          Your Bean will reach out to these trusted people if you ever need
          immediate support.
        </Text>

        {/* Your Trusted Circle */}
        <Text style={[styles.sectionGreen, { color: colors.PRIMARY_DARK }]}>
          Your Trusted Circle
        </Text>

        <View style={styles.contactsList}>
          {contacts.length === 0 ? (
            <View
              style={[styles.emptyState, { backgroundColor: colors.SURFACE }]}
            >
              <Text style={styles.emptyIcon}>👥</Text>
              <Text style={[styles.emptyTitle, { color: colors.TEXT_PRIMARY }]}>
                No contacts added yet
              </Text>
              <Text
                style={[styles.emptySubtitle, { color: colors.TEXT_SECONDARY }]}
              >
                Add trusted people who Bean can alert in an emergency.
              </Text>
            </View>
          ) : (
            contacts.map(contact => (
              <View
                key={contact.id}
                style={[
                  styles.contactCard,
                  { backgroundColor: colors.SECONDARY_LIGHT },
                ]}
              >
                <View
                  style={[
                    styles.avatarCircle,
                    { backgroundColor: colors.SURFACE },
                  ]}
                >
                  <Image
                    source={require('../../../assets/images/contact.png')}
                    style={styles.avatarIcon}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.contactInfo}>
                  <Text
                    style={[styles.contactName, { color: colors.TEXT_PRIMARY }]}
                  >
                    {contact.name}
                  </Text>
                  <Text
                    style={[
                      styles.contactRel,
                      { color: colors.TEXT_SECONDARY },
                    ]}
                  >
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

        {/* Add New Contact button */}
        <TouchableOpacity
          style={[
            styles.addBtn,
            { borderColor: colors.PRIMARY, backgroundColor: colors.SURFACE },
          ]}
          onPress={() => navigation.navigate('AddNewContact')}
          activeOpacity={0.8}
        >
          <Image
            source={require('../../../assets/images/add-contact.png')}
            style={styles.addBtnIcon}
            resizeMode="contain"
          />
          <Text style={[styles.addBtnText, { color: colors.PRIMARY }]}>
            Add New Contact
          </Text>
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
    alignItems: 'center',
  },
  topIconWrap: { marginBottom: SPACING.LG },
  topIcon: { width: 100, height: 100 },
  subtitle: {
    ...TYPOGRAPHY.BODY,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.XL,
    paddingHorizontal: SPACING.MD,
  },
  sectionGreen: {
    alignSelf: 'flex-start',
    fontSize: 15,
    fontWeight: '700' as const,
    marginBottom: SPACING.MD,
  },
  contactsList: { width: '100%', gap: SPACING.MD, marginBottom: SPACING.XL },
  emptyState: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: SPACING.HUGE,
    borderRadius: BORDER_RADIUS.XL,
    gap: SPACING.SM,
  },
  emptyIcon: { fontSize: 40, marginBottom: SPACING.SM },
  emptyTitle: { fontSize: 16, fontWeight: '700' as const },
  emptySubtitle: {
    ...TYPOGRAPHY.BODY_SMALL,
    textAlign: 'center',
    paddingHorizontal: SPACING.XL,
    lineHeight: 18,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.XL,
    paddingVertical: SPACING.MD,
    paddingHorizontal: SPACING.LG,
    gap: SPACING.MD,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  avatarIcon: { width: 28, height: 28 },
  contactInfo: { flex: 1 },
  contactName: { fontSize: 15, fontWeight: '700' as const },
  contactRel: { ...TYPOGRAPHY.CAPTION, marginTop: 2 },
  deleteBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  deleteIcon: { width: 32, height: 32 },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: SPACING.LG,
    borderWidth: 1.5,
    borderRadius: BORDER_RADIUS.XL,
    borderStyle: 'dashed',
    gap: SPACING.SM,
  },
  addBtnIcon: { width: 28, height: 28 },
  addBtnText: { fontSize: 15, fontWeight: '700' as const },
});

export default EmergencyContactsScreen;
