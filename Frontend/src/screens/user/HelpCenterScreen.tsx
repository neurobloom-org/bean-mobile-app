// src/screens/user/HelpCenterScreen.tsx
// ✅ Real image assets + full dark/light theme support via useTheme

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';

// ─── Types ────────────────────────────────────────────────────────────────────

interface CategoryRowProps {
  iconSource: any;
  title: string;
  subtitle: string;
  onPress: () => void;
  colors: any;
}

interface ArticleRowProps {
  title: string;
  onPress: () => void;
  colors: any;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const CategoryRow: React.FC<CategoryRowProps> = ({
  iconSource,
  title,
  subtitle,
  onPress,
  colors,
}) => (
  <TouchableOpacity
    style={[styles.categoryRow, { backgroundColor: colors.SURFACE }]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    {/* ✅ Green icon box — matches Figma design exactly */}
    <View style={styles.categoryIconWrap}>
      <Image
        source={iconSource}
        style={styles.categoryIconImage}
        resizeMode="contain"
      />
    </View>
    <View style={styles.categoryTextWrap}>
      <Text style={[styles.categoryTitle, { color: colors.TEXT_PRIMARY }]}>
        {title}
      </Text>
      <Text style={[styles.categorySubtitle, { color: colors.TEXT_SECONDARY }]}>
        {subtitle}
      </Text>
    </View>
    <Text style={[styles.chevron, { color: colors.TEXT_SECONDARY }]}>›</Text>
  </TouchableOpacity>
);

const ArticleRow: React.FC<ArticleRowProps> = ({ title, onPress, colors }) => (
  <TouchableOpacity
    style={[styles.articleRow, { backgroundColor: colors.SURFACE }]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={[styles.articleTitle, { color: colors.TEXT_PRIMARY }]}>
      {title}
    </Text>
    {/* ✅ open_in_new.png replaces ↗ emoji */}
    <Image
      source={require('../../../assets/images/open_in_new.png')}
      style={[styles.articleIconImage, { tintColor: colors.TEXT_SECONDARY }]}
      resizeMode="contain"
    />
  </TouchableOpacity>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────

const HelpCenterScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors, isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleChatWithSupport = () => {
    Alert.alert('Support', 'Connecting you to our support team...');
  };

  const handleArticle = (title: string) => {
    Alert.alert('Article', `Opening: ${title}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.BACKGROUND }]}>
      {/* ── Header ── */}
      <View style={[styles.header, { backgroundColor: colors.BACKGROUND }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={[styles.backArrow, { color: colors.TEXT_PRIMARY }]}>
            ←
          </Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.TEXT_PRIMARY }]}>
          Help Center
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Search Bar ── */}
        <View
          style={[
            styles.searchBar,
            {
              backgroundColor: colors.SURFACE,
              shadowColor: colors.TEXT_PRIMARY,
            },
          ]}
        >
          {/* Search icon — tinted to match theme */}
          <Image
            source={require('../../../assets/images/help_outline.png')}
            style={[
              styles.searchIconImage,
              { tintColor: colors.TEXT_TERTIARY },
            ]}
            resizeMode="contain"
          />
          <TextInput
            style={[styles.searchInput, { color: colors.TEXT_PRIMARY }]}
            placeholder="Search for help..."
            placeholderTextColor={colors.TEXT_TERTIARY}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
        </View>

        {/* ── Categories ── */}
        <Text style={[styles.sectionLabel, { color: colors.TEXT_SECONDARY }]}>
          Categories
        </Text>

        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.SURFACE,
              shadowColor: colors.TEXT_PRIMARY,
            },
          ]}
        >
          <CategoryRow
            iconSource={require('../../../assets/images/rocket_launch.png')}
            title="Getting Started"
            subtitle="Setup your robot in minutes"
            onPress={() => {
              /* TODO */
            }}
            colors={colors}
          />
          <View
            style={[styles.divider, { backgroundColor: colors.BORDER_LIGHT }]}
          />
          <CategoryRow
            iconSource={require('../../../assets/images/build.png')}
            title="Troubleshooting"
            subtitle="Solve common issues & errors"
            onPress={() => {
              /* TODO */
            }}
            colors={colors}
          />
          <View
            style={[styles.divider, { backgroundColor: colors.BORDER_LIGHT }]}
          />
          <CategoryRow
            iconSource={require('../../../assets/images/help_outline.png')}
            title="FAQs"
            subtitle="Frequently asked questions"
            onPress={() => {
              /* TODO */
            }}
            colors={colors}
          />
        </View>

        {/* ── Popular Articles ── */}
        <Text style={[styles.sectionLabel, { color: colors.TEXT_SECONDARY }]}>
          Popular Articles
        </Text>

        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.SURFACE,
              shadowColor: colors.TEXT_PRIMARY,
            },
          ]}
        >
          <ArticleRow
            title="How to sync your Robot via Bluetooth?"
            onPress={() =>
              handleArticle('How to sync your Robot via Bluetooth?')
            }
            colors={colors}
          />
          <View
            style={[styles.divider, { backgroundColor: colors.BORDER_LIGHT }]}
          />
          <ArticleRow
            title="Maximizing battery life tips"
            onPress={() => handleArticle('Maximizing battery life tips')}
            colors={colors}
          />
          <View
            style={[styles.divider, { backgroundColor: colors.BORDER_LIGHT }]}
          />
          <ArticleRow
            title="Connecting to 5GHz Wi-Fi networks"
            onPress={() => handleArticle('Connecting to 5GHz Wi-Fi networks')}
            colors={colors}
          />
        </View>

        {/* ── Still Need Help Banner ── */}
        {/* ✅ Dark mode: slightly lighter surface; light mode: gray bg */}
        <View
          style={[
            styles.supportBanner,
            { backgroundColor: isDark ? colors.SURFACE : '#E5E7EB' },
          ]}
        >
          <Text
            style={[styles.supportBannerTitle, { color: colors.TEXT_PRIMARY }]}
          >
            Still need help?
          </Text>
          <Text
            style={[
              styles.supportBannerSubtitle,
              { color: colors.TEXT_SECONDARY },
            ]}
          >
            Our support team is available 24/7 to assist you with any robot
            related issues.
          </Text>
          <TouchableOpacity
            style={styles.chatButton}
            onPress={handleChatWithSupport}
            activeOpacity={0.85}
          >
            {/* ✅ signup-page.png replaces 🤖 emoji — tinted white */}
            <Image
              source={require('../../../assets/images/signup-page.png')}
              style={styles.chatButtonIconImage}
              resizeMode="contain"
            />
            <Text style={styles.chatButtonText}>Chat with Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default HelpCenterScreen;

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1 },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 56,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  backBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: { fontSize: 22 },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  headerSpacer: { width: 36 },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  // Search bar
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  // ✅ help_outline.png as search icon
  searchIconImage: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    padding: 0,
  },

  // Section label
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 24,
    marginBottom: 10,
  },

  // Card
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  // Category row
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  // ✅ Green background stays fixed — matches Figma in both themes
  categoryIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#4ADE80',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  // ✅ White tint so icons pop on green background
  categoryIconImage: {
    width: 22,
    height: 22,
    tintColor: '#FFFFFF',
  },
  categoryTextWrap: { flex: 1, marginRight: 10 },
  categoryTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 3,
  },
  categorySubtitle: {
    fontSize: 12,
    lineHeight: 17,
  },
  chevron: {
    fontSize: 22,
    marginTop: -2,
  },

  // Article row
  articleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  articleTitle: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    marginRight: 12,
  },
  // ✅ open_in_new.png replaces ↗
  articleIconImage: {
    width: 16,
    height: 16,
  },

  // Divider
  divider: {
    height: 1,
    marginLeft: 16,
  },

  // Support banner
  supportBanner: {
    marginTop: 24,
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  supportBannerTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  supportBannerSubtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4ADE80',
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 28,
    shadowColor: '#4ADE80',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  // ✅ signup-page.png — white tint to show on green button
  chatButtonIconImage: {
    width: 22,
    height: 22,
    marginRight: 10,
    tintColor: '#FFFFFF',
  },
  chatButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
});
