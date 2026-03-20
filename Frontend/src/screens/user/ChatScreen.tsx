// src/screens/user/ChatScreen.tsx
// ✅ FIGMA-MATCHED — Let's Chat header · Green Bean bubbles · Grey user bubbles · Quick replies · Mic input

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bean';
  timestamp: string;
}

const ChatScreen = ({ navigation }: any) => {
  const scrollRef = useRef<ScrollView>(null);

  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm here to listen. How are you feeling today?",
      sender: 'bean',
      timestamp: '10:24 AM',
    },
    {
      id: 2,
      text: "I'm feeling a bit overwhelmed with work today. It's hard to focus.",
      sender: 'user',
      timestamp: '10:25 AM',
    },
    {
      id: 3,
      text: "I understand. When things feel like a mountain, it's okay to take one step at a time.",
      sender: 'bean',
      timestamp: '10:25 AM',
    },
  ]);

  const quickReplies = ['Yes, please', 'Maybe later', 'Tell me a joke'];

  const handleSend = () => {
    if (!message.trim()) return;

    const now = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const userMsg: Message = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: now,
    };

    setMessages(prev => [...prev, userMsg]);
    setMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const beanMsg: Message = {
        id: Date.now() + 1,
        text: "I understand. Can you tell me more about how you're feeling?",
        sender: 'bean',
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages(prev => [...prev, beanMsg]);
      setIsTyping(false);
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 1500);

    scrollRef.current?.scrollToEnd({ animated: true });
  };

  const handleQuickReply = (reply: string) => {
    setMessage(reply);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>

          {/* Centered Bean icon + title */}
          <View style={styles.headerCenter}>
            <Image
              source={require('../../../assets/images/login-page.png')}
              style={styles.headerBeanIcon}
              resizeMode="contain"
            />
            <Text style={styles.headerTitle}>Let's Chat</Text>
          </View>

          <View style={{ width: 40 }} />
        </View>

        {/* ── Messages ── */}
        <ScrollView
          ref={scrollRef}
          style={styles.msgList}
          contentContainerStyle={styles.msgContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            scrollRef.current?.scrollToEnd({ animated: false })
          }
        >
          {/* Date label */}
          <Text style={styles.dateLabel}>Today, 10:24 AM</Text>

          {messages.map(msg => (
            <View
              key={msg.id}
              style={[
                styles.row,
                msg.sender === 'user' ? styles.rowUser : styles.rowBean,
              ]}
            >
              {/* Bean avatar — left side */}
              {msg.sender === 'bean' && (
                <Image
                  source={require('../../../assets/images/login-page.png')}
                  style={styles.beanAvatar}
                  resizeMode="contain"
                />
              )}

              {/* Bubble */}
              <View
                style={[
                  styles.bubble,
                  msg.sender === 'bean' ? styles.beanBubble : styles.userBubble,
                ]}
              >
                <Text
                  style={[
                    styles.bubbleText,
                    msg.sender === 'user' && styles.userBubbleText,
                  ]}
                >
                  {msg.text}
                </Text>
              </View>

              {/* User avatar — right side — purple circle "A" */}
              {msg.sender === 'user' && (
                <View style={styles.userAvatar}>
                  <Text style={styles.userAvatarText}>A</Text>
                </View>
              )}
            </View>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <View style={[styles.row, styles.rowBean]}>
              <Image
                source={require('../../../assets/images/login-page.png')}
                style={styles.beanAvatar}
                resizeMode="contain"
              />
              <View
                style={[styles.bubble, styles.beanBubble, styles.typingBubble]}
              >
                <Text style={styles.typingDots}>• • •</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* ── Quick Replies ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.quickRow}
          contentContainerStyle={styles.quickContent}
        >
          {quickReplies.map((reply, i) => (
            <TouchableOpacity
              key={i}
              style={styles.quickBtn}
              onPress={() => handleQuickReply(reply)}
              activeOpacity={0.7}
            >
              <Text style={styles.quickBtnText}>{reply}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Input Bar ── */}
        <View style={styles.inputBar}>
          {/* Input with green border + + button inside right */}
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.textInput}
              placeholder="Type a message..."
              placeholderTextColor={COLORS.TEXT_TERTIARY}
              value={message}
              onChangeText={setMessage}
              multiline
            />
            {/* + button inside input — right side */}
            <TouchableOpacity style={styles.plusBtn}>
              <Image
                source={require('../../../assets/images/add-button.png')}
                style={styles.plusIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* Mic button — green circle outside */}
          <TouchableOpacity style={styles.micBtn}>
            <Image
              source={require('../../../assets/images/voice-button.png')}
              style={styles.micIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Send arrow — green when typing, grey when empty ✅ */}
          <TouchableOpacity
            onPress={handleSend}
            style={styles.sendBtn}
            disabled={!message.trim()}
          >
            <Text
              style={[
                styles.sendIcon,
                message.trim()
                  ? styles.sendIconActive
                  : styles.sendIconInactive,
              ]}
            >
              ➤
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },

  // ── Header
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
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 28,
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 32,
  },
  headerCenter: {
    alignItems: 'center',
    gap: 2,
  },
  headerBeanIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: COLORS.TEXT_PRIMARY,
  },

  // ── Messages list
  msgList: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  msgContent: {
    paddingHorizontal: SPACING.LG,
    paddingTop: SPACING.MD,
    paddingBottom: SPACING.LG,
  },

  // Date label
  dateLabel: {
    fontSize: 11,
    color: COLORS.TEXT_TERTIARY,
    textAlign: 'center',
    marginBottom: SPACING.LG,
  },

  // Message row
  row: {
    flexDirection: 'row',
    marginBottom: SPACING.MD,
    alignItems: 'flex-end',
    gap: SPACING.SM,
  },
  rowBean: {
    justifyContent: 'flex-start',
  },
  rowUser: {
    justifyContent: 'flex-end',
  },

  // Bean avatar
  beanAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    flexShrink: 0,
  },

  // User avatar — purple circle
  userAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#7C83D1', // ✅ purple "A" like Figma
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  userAvatarText: {
    fontSize: 13,
    fontWeight: '700' as const,
    color: COLORS.WHITE,
  },

  // Bubble base
  bubble: {
    maxWidth: '72%',
    borderRadius: BORDER_RADIUS.XL,
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
  },

  // Bean bubble — green ✅
  beanBubble: {
    backgroundColor: '#22C55E', // ✅ vivid green like Figma
    borderBottomLeftRadius: 4,
  },

  // User bubble — light grey ✅
  userBubble: {
    backgroundColor: '#F1F5F9', // ✅ light slate grey like Figma
    borderBottomRightRadius: 4,
  },

  bubbleText: {
    fontSize: 14,
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 20,
  },
  userBubbleText: {
    color: COLORS.TEXT_PRIMARY, // dark text on grey bubble ✅
  },

  // Typing
  typingBubble: {
    paddingVertical: SPACING.SM,
  },
  typingDots: {
    fontSize: 16,
    color: COLORS.WHITE,
    letterSpacing: 2,
  },

  // ── Quick replies
  quickRow: {
    backgroundColor: COLORS.WHITE,
    paddingVertical: SPACING.SM,
    flexGrow: 0, // ✅ prevents stretching full height
    flexShrink: 0, // ✅ stays compact
    maxHeight: 52, // ✅ fixed height — just the pill buttons
  },
  quickContent: {
    paddingHorizontal: SPACING.LG,
    gap: SPACING.SM,
    alignItems: 'center', // ✅ vertically centre pills
  },
  quickBtn: {
    borderWidth: 1.5,
    borderColor: COLORS.BORDER,
    borderRadius: BORDER_RADIUS.ROUND,
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.SM,
    backgroundColor: COLORS.WHITE,
    height: 36, // ✅ fixed pill height
    justifyContent: 'center',
  },
  quickBtnText: {
    fontSize: 13,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '500' as const,
  },

  // ── Input bar
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
    backgroundColor: COLORS.WHITE,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER_LIGHT,
    gap: SPACING.SM,
  },

  // ✅ Green bordered input — + button inside on right
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.ROUND,
    borderWidth: 1.5,
    borderColor: COLORS.PRIMARY, // ✅ green border like Figma
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.SM,
    minHeight: 46,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.TEXT_PRIMARY,
    maxHeight: 80,
    paddingTop: 0,
    paddingBottom: 0,
  },

  // ✅ + button inside input — right side
  plusBtn: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.XS,
  },
  plusIcon: {
    width: 28,
    height: 28,
  },

  // ✅ Mic — green circle outside input
  micBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micIcon: {
    width: 46,
    height: 46,
  },

  // ✅ Send arrow — text icon, color changes with input
  sendBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    fontSize: 22,
  },
  sendIconActive: {
    color: '#22C55E', // ✅ green when typing
  },
  sendIconInactive: {
    color: COLORS.GRAY_400, // ✅ grey when empty
  },
});

export default ChatScreen;
