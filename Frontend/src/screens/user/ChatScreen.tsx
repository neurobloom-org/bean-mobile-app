// src/screens/user/ChatScreen.tsx
// ✅ UPDATED - Using real image icons (chat-voice-icon, chat-add-file-icon)

import React, { useState, useRef, useEffect } from 'react';
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

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bean';
  timestamp: string;
}

const ChatScreen = ({ navigation }: any) => {
  const [message, setMessage] = useState('');
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
      timestamp: '10:24 AM',
    },
    {
      id: 3,
      text: "I understand. When things feel like a mountain, it's okay to take one step at a time.",
      sender: 'bean',
      timestamp: '10:24 AM',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Show typing indicator
    setIsTyping(true);
    setTimeout(() => {
      const beanResponse: Message = {
        id: messages.length + 2,
        text: "I'm here for you. Tell me more about what's on your mind.",
        sender: 'bean',
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }),
      };
      setMessages(prev => [...prev, beanResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const quickReplies = ['Yes, please', 'Maybe later', 'Tell me a joke'];

  const handleQuickReply = (reply: string) => {
    setMessage(reply);
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages, isTyping]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <View style={styles.headerIconContainer}>
              <Image
                source={require('../../../assets/images/select-user.png')}
                style={styles.headerIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.headerTitle}>Let's Chat</Text>
          </View>

          <View style={{ width: 40 }} />
        </View>

        {/* Date/Time Label */}
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>Today, 10:24 AM</Text>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map(msg => (
            <View
              key={msg.id}
              style={[
                styles.messageRow,
                msg.sender === 'user'
                  ? styles.userMessageRow
                  : styles.beanMessageRow,
              ]}
            >
              {/* Bean Avatar - Only for Bean messages */}
              {msg.sender === 'bean' && (
                <View style={styles.avatarContainer}>
                  <Image
                    source={require('../../../assets/images/select-user.png')}
                    style={styles.avatar}
                    resizeMode="contain"
                  />
                </View>
              )}

              {/* Message Bubble */}
              <View
                style={[
                  styles.messageBubble,
                  msg.sender === 'user' ? styles.userBubble : styles.beanBubble,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    msg.sender === 'user' && styles.userMessageText,
                  ]}
                >
                  {msg.text}
                </Text>
              </View>

              {/* User Avatar - Only for user messages */}
              {msg.sender === 'user' && (
                <View style={styles.avatarContainer}>
                  <View style={styles.userAvatar}>
                    <Text style={styles.userAvatarText}>A</Text>
                  </View>
                </View>
              )}
            </View>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <View style={[styles.messageRow, styles.beanMessageRow]}>
              <View style={styles.avatarContainer}>
                <Image
                  source={require('../../../assets/images/select-user.png')}
                  style={styles.avatar}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.typingIndicator}>
                <View style={styles.typingDot} />
                <View style={styles.typingDot} />
                <View style={styles.typingDot} />
              </View>
            </View>
          )}

          {/* Extra spacing at bottom */}
          <View style={{ height: 20 }} />
        </ScrollView>

        {/* Quick Replies */}
        <View style={styles.quickRepliesContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickRepliesContent}
          >
            {quickReplies.map((reply, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickReplyButton}
                onPress={() => handleQuickReply(reply)}
              >
                <Text style={styles.quickReplyText}>{reply}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Input Container */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              placeholderTextColor={COLORS.GRAY_400}
              value={message}
              onChangeText={setMessage}
              multiline
              maxLength={500}
            />

            <View style={styles.inputActions}>
              {/* Add File Icon - Using chat-add-file-icon.png */}
              <TouchableOpacity style={styles.actionButton}>
                <Image
                  source={require('../../../assets/images/chat-add-file-icon.png')}
                  style={styles.actionIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              {/* Voice Icon - Using chat-voice-icon.png */}
              <TouchableOpacity style={styles.voiceButton}>
                <Image
                  source={require('../../../assets/images/chat-voice-icon.png')}
                  style={styles.voiceIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              {/* Send Button */}
              <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                <Text style={styles.sendIcon}>➤</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: COLORS.TEXT_PRIMARY,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.XS,
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '600',
  },
  // Date Label
  dateContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.MD,
  },
  dateText: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    fontSize: 12,
  },
  // Messages
  messagesContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  messagesContent: {
    paddingHorizontal: SPACING.LG,
    paddingTop: SPACING.SM,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: SPACING.LG,
    alignItems: 'flex-end',
  },
  userMessageRow: {
    justifyContent: 'flex-end',
  },
  beanMessageRow: {
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    width: 32,
    height: 32,
    marginHorizontal: SPACING.SM,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.GRAY_100,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatarText: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.WHITE,
    fontWeight: 'bold',
  },
  messageBubble: {
    maxWidth: '70%',
    borderRadius: SPACING.LG,
    padding: SPACING.MD,
    paddingHorizontal: SPACING.LG,
  },
  beanBubble: {
    backgroundColor: COLORS.PRIMARY,
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: COLORS.GRAY_100,
    borderBottomRightRadius: 4,
  },
  messageText: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.WHITE,
    lineHeight: 20,
  },
  userMessageText: {
    color: COLORS.TEXT_PRIMARY,
  },
  // Typing Indicator
  typingIndicator: {
    flexDirection: 'row',
    backgroundColor: COLORS.GRAY_100,
    borderRadius: SPACING.LG,
    borderBottomLeftRadius: 4,
    padding: SPACING.MD,
    paddingHorizontal: SPACING.LG,
    gap: SPACING.XS,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.GRAY_400,
  },
  // Quick Replies
  quickRepliesContainer: {
    backgroundColor: COLORS.WHITE,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER,
    paddingVertical: SPACING.MD,
  },
  quickRepliesContent: {
    paddingHorizontal: SPACING.LG,
    gap: SPACING.SM,
  },
  quickReplyButton: {
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    borderRadius: SPACING.XL,
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.SM,
    marginRight: SPACING.SM,
  },
  quickReplyText: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.PRIMARY,
    fontWeight: '600',
  },
  // Input
  inputContainer: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: SPACING.XL,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.XS,
  },
  input: {
    flex: 1,
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_PRIMARY,
    maxHeight: 100,
    paddingVertical: SPACING.SM,
  },
  inputActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.XS,
  },
  actionButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    width: 24,
    height: 24,
  },
  voiceButton: {
    width: 38,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceIcon: {
    width: 38,
    height: 40,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    fontSize: 16,
    color: COLORS.WHITE,
  },
});

export default ChatScreen;
