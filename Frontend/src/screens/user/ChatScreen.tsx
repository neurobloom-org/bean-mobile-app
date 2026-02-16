// src/screens/user/ChatScreen.tsx
// ✅ REFACTORED VERSION

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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { BackButton } from '../../components';
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
      text: "Hi! I'm Bean, your mental health companion. How can I help you today?",
      sender: 'bean',
      timestamp: '10:00 AM',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    setIsTyping(true);
    setTimeout(() => {
      const beanResponse: Message = {
        id: messages.length + 2,
        text: "I understand. Can you tell me more about how you're feeling?",
        sender: 'bean',
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages(prev => [...prev, beanResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const quickReplies = [
    'I feel anxious',
    'I feel stressed',
    'I need help',
    'Tell me more',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Header */}
        <View style={styles.header}>
          <BackButton />
          <View style={styles.headerCenter}>
            <Image
              source={require('../../../assets/images/robot-first-page.png')}
              style={styles.headerImage}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.headerTitle}>Bean</Text>
              <Text style={styles.headerStatus}>Online</Text>
            </View>
          </View>
          <View style={{ width: 40 }} />
        </View>

        {/* Messages */}
        <ScrollView
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map(msg => (
            <View
              key={msg.id}
              style={[
                styles.messageBubble,
                msg.sender === 'user' ? styles.userBubble : styles.beanBubble,
              ]}
            >
              {msg.sender === 'bean' && (
                <Image
                  source={require('../../../assets/images/robot-first-page.png')}
                  style={styles.beanAvatar}
                  resizeMode="contain"
                />
              )}
              <View
                style={[
                  styles.bubbleContent,
                  msg.sender === 'user'
                    ? styles.userBubbleContent
                    : styles.beanBubbleContent,
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
                <Text
                  style={[
                    styles.timestamp,
                    msg.sender === 'user' && styles.userTimestamp,
                  ]}
                >
                  {msg.timestamp}
                </Text>
              </View>
            </View>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <View style={[styles.messageBubble, styles.beanBubble]}>
              <Image
                source={require('../../../assets/images/robot-first-page.png')}
                style={styles.beanAvatar}
                resizeMode="contain"
              />
              <View style={styles.typingIndicator}>
                <Text style={styles.typingDot}>●</Text>
                <Text style={styles.typingDot}>●</Text>
                <Text style={styles.typingDot}>●</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Quick Replies */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.quickRepliesContainer}
        >
          {quickReplies.map((reply, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickReplyButton}
              onPress={() => setMessage(reply)}
            >
              <Text style={styles.quickReplyText}>{reply}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Type your message..."
              placeholderTextColor={COLORS.TEXT_TERTIARY}
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
              <Text style={styles.sendIcon}>➤</Text>
            </TouchableOpacity>
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
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.SM,
  },
  headerImage: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    ...TYPOGRAPHY.H4,
    color: COLORS.TEXT_PRIMARY,
  },
  headerStatus: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.SUCCESS,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  messagesContent: {
    padding: SPACING.LG,
  },
  messageBubble: {
    flexDirection: 'row',
    marginBottom: SPACING.LG,
    alignItems: 'flex-end',
  },
  userBubble: {
    justifyContent: 'flex-end',
  },
  beanBubble: {
    justifyContent: 'flex-start',
  },
  beanAvatar: {
    width: 30,
    height: 30,
    marginRight: SPACING.SM,
  },
  bubbleContent: {
    maxWidth: '75%',
    borderRadius: SPACING.LG,
    padding: SPACING.MD,
  },
  userBubbleContent: {
    backgroundColor: COLORS.PRIMARY,
    borderBottomRightRadius: 4,
  },
  beanBubbleContent: {
    backgroundColor: COLORS.WHITE,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XS,
  },
  userMessageText: {
    color: COLORS.WHITE,
  },
  timestamp: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_TERTIARY,
    fontSize: 10,
  },
  userTimestamp: {
    color: COLORS.WHITE,
    opacity: 0.8,
  },
  typingIndicator: {
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    borderRadius: SPACING.LG,
    padding: SPACING.MD,
    gap: SPACING.XS,
  },
  typingDot: {
    fontSize: 20,
    color: COLORS.PRIMARY,
  },
  quickRepliesContainer: {
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.SM,
    backgroundColor: COLORS.WHITE,
  },
  quickReplyButton: {
    backgroundColor: COLORS.SECONDARY_LIGHT,
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
    backgroundColor: COLORS.GRAY_50,
    borderRadius: SPACING.XL,
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.SM,
  },
  input: {
    flex: 1,
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_PRIMARY,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.SM,
  },
  sendIcon: {
    fontSize: 18,
    color: COLORS.WHITE,
  },
});

export default ChatScreen;
