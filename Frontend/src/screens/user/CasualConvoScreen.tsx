// src/screens/user/CasualConvoScreen.tsx
// ✅ Dark theme aware

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';
import { useTheme } from '../../context/ThemeContext';

const CasualConvoScreen = ({ navigation }: any) => {
  const { colors } = useTheme(); // ✅

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.SURFACE }]}
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
          Talk to Bean
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Robot circle */}
        <View
          style={[
            styles.robotCircle,
            { backgroundColor: colors.SECONDARY_LIGHT },
          ]}
        >
          <Image
            source={require('../../../assets/images/robot-first-page.png')}
            style={styles.robotImage}
            resizeMode="contain"
          />
        </View>

        {/* Title + subtitle */}
        <Text style={[styles.title, { color: colors.TEXT_PRIMARY }]}>
          Casual Convo
        </Text>
        <Text style={[styles.subtitle, { color: colors.TEXT_SECONDARY }]}>
          Control your companion using simple voice commands. Start by getting
          its attention with a wake word.
        </Text>

        {/* Info cards */}
        <View style={styles.cardsContainer}>
          <View
            style={[
              styles.infoCard,
              { backgroundColor: colors.SECONDARY_LIGHT },
            ]}
          >
            <View
              style={[styles.cardIconBox, { backgroundColor: colors.SURFACE }]}
            >
              <Text style={styles.cardIconEmoji}>🎤</Text>
            </View>
            <View style={styles.cardText}>
              <Text style={[styles.cardLabel, { color: colors.PRIMARY_DARK }]}>
                Wake Word
              </Text>
              <Text style={[styles.cardValue, { color: colors.TEXT_PRIMARY }]}>
                Say: "Hey Bean"
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.infoCard,
              { backgroundColor: colors.SECONDARY_LIGHT },
            ]}
          >
            <View
              style={[styles.cardIconBox, { backgroundColor: colors.SURFACE }]}
            >
              <Text style={styles.cardIconEmoji}>💬</Text>
            </View>
            <View style={styles.cardText}>
              <Text style={[styles.cardLabel, { color: colors.PRIMARY_DARK }]}>
                Interaction
              </Text>
              <Text style={[styles.cardValue, { color: colors.TEXT_PRIMARY }]}>
                Ask me anything
              </Text>
            </View>
          </View>
        </View>

        {/* Footer note */}
        <Text style={[styles.footerNote, { color: colors.TEXT_TERTIARY }]}>
          You can always access this guide by clicking upon the relevant feature
        </Text>

        {/* Start chatting button */}
        <TouchableOpacity
          style={[styles.startBtn, { backgroundColor: colors.PRIMARY }]}
          onPress={() => navigation.navigate('Chat')}
          activeOpacity={0.85}
        >
          <Text style={[styles.startBtnText, { color: colors.WHITE }]}>
            Start Chatting
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
  robotCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.XL,
    elevation: 4,
  },
  robotImage: { width: 140, height: 140 },
  title: {
    fontSize: 26,
    fontWeight: '800' as const,
    marginBottom: SPACING.MD,
    textAlign: 'center',
  },
  subtitle: {
    ...TYPOGRAPHY.BODY,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: SPACING.MD,
    marginBottom: SPACING.XXL,
  },
  cardsContainer: { width: '100%', gap: SPACING.MD, marginBottom: SPACING.XL },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.XL,
    paddingVertical: SPACING.LG,
    paddingHorizontal: SPACING.LG,
    gap: SPACING.MD,
  },
  cardIconBox: {
    width: 42,
    height: 42,
    borderRadius: BORDER_RADIUS.LG,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardIconEmoji: { fontSize: 22 },
  cardText: { flex: 1 },
  cardLabel: {
    fontSize: 12,
    fontWeight: '600' as const,
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardValue: { fontSize: 16, fontWeight: '700' as const },
  footerNote: {
    ...TYPOGRAPHY.CAPTION,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: SPACING.LG,
    marginBottom: SPACING.XL,
  },
  startBtn: {
    width: '100%',
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: SPACING.LG,
    alignItems: 'center',
    elevation: 5,
  },
  startBtnText: {
    fontSize: 16,
    fontWeight: '700' as const,
    letterSpacing: 0.3,
  },
});

export default CasualConvoScreen;
