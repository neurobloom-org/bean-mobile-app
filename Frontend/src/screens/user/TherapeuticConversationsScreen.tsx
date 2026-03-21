// src/screens/user/TherapeuticConversationsScreen.tsx
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
  Dimensions,
} from 'react-native';
import { SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';
import { useTheme } from '../../context/ThemeContext';

const { width } = Dimensions.get('window');

const PROMPTS = [
  {
    id: '1',
    icon: require('../../../assets/images/talk.png'),
    title: '"I need to talk"',
    desc: 'Starts an open-ended session',
  },
  {
    id: '2',
    icon: require('../../../assets/images/mood-check.png'),
    title: '"Check my mood"',
    desc: 'Analyzes tone and expression',
  },
  {
    id: '3',
    icon: require('../../../assets/images/feeling-stressed.png'),
    title: '"I\'m feeling stressed"',
    desc: 'Triggers calming breathing exercises',
  },
];

const TherapeuticConversationsScreen = ({ navigation }: any) => {
  const { colors } = useTheme(); // ✅

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
          Therapeutic Conversations
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero circle */}
        <View style={styles.heroCircle}>
          <Image
            source={require('../../../assets/images/therapeutic-convo-top-icon.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        {/* Subtitle */}
        <Text style={[styles.subtitle, { color: colors.TEXT_SECONDARY }]}>
          Your companion is here to listen and help you navigate your emotions.
          Use these voice prompts to begin a session and check your mental
          well-being.
        </Text>

        {/* Section label */}
        <Text style={[styles.sectionGreen, { color: colors.PRIMARY_DARK }]}>
          Try saying these prompts...
        </Text>

        {/* Prompt cards */}
        <View style={styles.promptsContainer}>
          {PROMPTS.map(prompt => (
            <TouchableOpacity
              key={prompt.id}
              style={[styles.promptCard, { backgroundColor: colors.SURFACE }]}
              onPress={() => navigation.navigate('Chat')}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.promptIconCircle,
                  { backgroundColor: colors.SECONDARY_LIGHT },
                ]}
              >
                <Image
                  source={prompt.icon}
                  style={styles.promptIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.promptText}>
                <Text
                  style={[styles.promptTitle, { color: colors.TEXT_PRIMARY }]}
                >
                  {prompt.title}
                </Text>
                <Text
                  style={[styles.promptDesc, { color: colors.TEXT_SECONDARY }]}
                >
                  {prompt.desc}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Start session button */}
        <TouchableOpacity
          style={[styles.startBtn, { backgroundColor: colors.PRIMARY }]}
          onPress={() => navigation.navigate('Chat')}
          activeOpacity={0.85}
        >
          <Text style={[styles.startBtnText, { color: colors.WHITE }]}>
            Start a Session
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
  headerTitle: { fontSize: 15, fontWeight: '700' as const },
  scroll: {
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.XL,
    paddingBottom: SPACING.MASSIVE,
    alignItems: 'center',
  },
  heroCircle: {
    width: width * 0.62,
    height: width * 0.62,
    borderRadius: width * 0.31,
    overflow: 'hidden',
    marginBottom: SPACING.XL,
    elevation: 5,
  },
  heroImage: { width: '100%', height: '100%' },
  subtitle: {
    ...TYPOGRAPHY.BODY,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.XL,
    paddingHorizontal: SPACING.SM,
  },
  sectionGreen: {
    alignSelf: 'flex-start',
    fontSize: 15,
    fontWeight: '700' as const,
    marginBottom: SPACING.MD,
  },
  promptsContainer: {
    width: '100%',
    gap: SPACING.MD,
    marginBottom: SPACING.XL,
  },
  promptCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.XL,
    paddingVertical: SPACING.LG,
    paddingHorizontal: SPACING.LG,
    gap: SPACING.MD,
    elevation: 2,
  },
  promptIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    overflow: 'hidden',
  },
  promptIcon: { width: 36, height: 36, alignSelf: 'center' },
  promptText: { flex: 1 },
  promptTitle: { fontSize: 15, fontWeight: '700' as const, marginBottom: 3 },
  promptDesc: { ...TYPOGRAPHY.BODY_SMALL, lineHeight: 18 },
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

export default TherapeuticConversationsScreen;
