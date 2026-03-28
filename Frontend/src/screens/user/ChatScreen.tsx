// src/screens/user/ChatScreen.tsx
// ✅ Dark theme aware + white bean icon in dark mode

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
import { SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';
import { useTheme } from '../../context/ThemeContext';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bean';
  timestamp: string;
}

const ChatScreen = ({ navigation }: any) => {
  const { colors, isDark } = useTheme(); // ✅ added isDark
  const scrollRef = useRef<ScrollView>(null);

  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const quickReplies = ['Yes, please', 'Maybe later', 'Tell me a joke'];

  const handleSend = async () => {
    if (!message.trim()) return;

    // 1. Save the text and clear the input instantly for a snappy UI
    const userText = message;
    setMessage('');
    setIsTyping(true);

    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    // 2. Add User Message to the screen
    const userMsg: Message = {
      id: Date.now(),
      text: userText,
      sender: 'user',
      timestamp: now,
    };
    setMessages(prev => [...prev, userMsg]);
    
    // Scroll down after user types
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);

    try {
      // 3. Send the message to your Flask Backend
      // TODO: Replace with your actual Server IP and dynamically fetch the logged-in User's ID
      const response = await fetch('http://192.168.8.146:5001/api/app/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: "REPLACE_WITH_REAL_USER_ID", // e.g., auth.currentUser.id
          message: userText
        }),
      });

      const data = await response.json();

      // 4. Add Bean's AI response to the screen
      if (response.ok && data.status === "success") {
        const beanMsg: Message = {
          id: Date.now() + 1,
          text: data.response, // The text returned from Flask
          sender: 'bean',
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, beanMsg]);
      } else {
        console.error("Backend Error:", data.message);
      }

    } catch (error) {
      console.error("Network Error: Could not reach Bean's brain.", error);
    } finally {
      // 5. Turn off the typing indicator and scroll to bottom
      setIsTyping(false);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  const handleQuickReply = (reply: string) => setMessage(reply);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.SURFACE }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
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
          >
            <Text style={[styles.backIcon, { color: colors.TEXT_PRIMARY }]}>
              ‹
            </Text>
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            {/* ✅ White bean icon in dark mode only */}
            <Image
              source={require('../../../assets/images/login-page.png')}
              style={[
                styles.headerBeanIcon,
                isDark && { tintColor: '#FFFFFF' },
              ]}
              resizeMode="contain"
            />
            <Text style={[styles.headerTitle, { color: colors.TEXT_PRIMARY }]}>
              Let's Chat
            </Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollRef}
          style={[styles.msgList, { backgroundColor: colors.SURFACE }]}
          contentContainerStyle={styles.msgContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            scrollRef.current?.scrollToEnd({ animated: false })
          }
        >
          <Text style={[styles.dateLabel, { color: colors.TEXT_TERTIARY }]}>
            Today, 10:24 AM
          </Text>

          {messages.map(msg => (
            <View
              key={msg.id}
              style={[
                styles.row,
                msg.sender === 'user' ? styles.rowUser : styles.rowBean,
              ]}
            >
              {msg.sender === 'bean' && (
                <Image
                  source={require('../../../assets/images/login-page.png')}
                  style={[
                    styles.beanAvatar,
                    isDark && { tintColor: '#FFFFFF' },
                  ]}
                  resizeMode="contain"
                />
              )}

              <View
                style={[
                  styles.bubble,
                  msg.sender === 'bean'
                    ? styles.beanBubble
                    : [
                        styles.userBubble,
                        { backgroundColor: colors.BACKGROUND_LIGHT },
                      ],
                ]}
              >
                <Text
                  style={[
                    styles.bubbleText,
                    {
                      color:
                        msg.sender === 'bean' ? '#FFFFFF' : colors.TEXT_PRIMARY,
                    },
                  ]}
                >
                  {msg.text}
                </Text>
              </View>

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
                style={[styles.beanAvatar, isDark && { tintColor: '#FFFFFF' }]}
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

        {/* Quick Replies */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={[styles.quickRow, { backgroundColor: colors.SURFACE }]}
          contentContainerStyle={styles.quickContent}
        >
          {quickReplies.map((reply, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.quickBtn,
                { borderColor: colors.BORDER, backgroundColor: colors.SURFACE },
              ]}
              onPress={() => handleQuickReply(reply)}
              activeOpacity={0.7}
            >
              <Text
                style={[styles.quickBtnText, { color: colors.TEXT_PRIMARY }]}
              >
                {reply}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Input Bar */}
        <View
          style={[
            styles.inputBar,
            {
              backgroundColor: colors.SURFACE,
              borderTopColor: colors.BORDER_LIGHT,
            },
          ]}
        >
          <View
            style={[
              styles.inputWrap,
              { borderColor: colors.PRIMARY, backgroundColor: colors.SURFACE },
            ]}
          >
            <TextInput
              style={[styles.textInput, { color: colors.TEXT_PRIMARY }]}
              placeholder="Type a message..."
              placeholderTextColor={colors.TEXT_TERTIARY}
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <TouchableOpacity style={styles.plusBtn}>
              <Image
                source={require('../../../assets/images/add-button.png')}
                style={styles.plusIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.micBtn}>
            <Image
              source={require('../../../assets/images/voice-button.png')}
              style={styles.micIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSend}
            style={styles.sendBtn}
            disabled={!message.trim()}
          >
            <Text
              style={[
                styles.sendIcon,
                { color: message.trim() ? colors.PRIMARY : colors.GRAY_400 },
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
  headerCenter: { alignItems: 'center', gap: 2 },
  headerBeanIcon: { width: 32, height: 32, borderRadius: 16 },
  headerTitle: { fontSize: 16, fontWeight: '700' as const },
  msgList: { flex: 1 },
  msgContent: {
    paddingHorizontal: SPACING.LG,
    paddingTop: SPACING.MD,
    paddingBottom: SPACING.LG,
  },
  dateLabel: { fontSize: 11, textAlign: 'center', marginBottom: SPACING.LG },
  row: {
    flexDirection: 'row',
    marginBottom: SPACING.MD,
    alignItems: 'flex-end',
    gap: SPACING.SM,
  },
  rowBean: { justifyContent: 'flex-start' },
  rowUser: { justifyContent: 'flex-end' },
  beanAvatar: { width: 28, height: 28, borderRadius: 14, flexShrink: 0 },
  userAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#7C83D1',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  userAvatarText: {
    fontSize: 13,
    fontWeight: '700' as const,
    color: '#FFFFFF',
  },
  bubble: {
    maxWidth: '72%',
    borderRadius: BORDER_RADIUS.XL,
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
  },
  beanBubble: { backgroundColor: '#22C55E', borderBottomLeftRadius: 4 },
  userBubble: { borderBottomRightRadius: 4 },
  bubbleText: { fontSize: 14, lineHeight: 20 },
  typingBubble: { paddingVertical: SPACING.SM },
  typingDots: { fontSize: 16, color: '#FFFFFF', letterSpacing: 2 },
  quickRow: {
    flexGrow: 0,
    flexShrink: 0,
    maxHeight: 52,
    paddingVertical: SPACING.SM,
  },
  quickContent: {
    paddingHorizontal: SPACING.LG,
    gap: SPACING.SM,
    alignItems: 'center',
  },
  quickBtn: {
    borderWidth: 1.5,
    borderRadius: BORDER_RADIUS.ROUND,
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.SM,
    height: 36,
    justifyContent: 'center',
  },
  quickBtnText: { fontSize: 13, fontWeight: '500' as const },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
    borderTopWidth: 1,
    gap: SPACING.SM,
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.ROUND,
    borderWidth: 1.5,
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.SM,
    minHeight: 46,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    maxHeight: 80,
    paddingTop: 0,
    paddingBottom: 0,
  },
  plusBtn: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.XS,
  },
  plusIcon: { width: 28, height: 28 },
  micBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micIcon: { width: 46, height: 46 },
  sendBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: { fontSize: 22 },
});

export default ChatScreen;
