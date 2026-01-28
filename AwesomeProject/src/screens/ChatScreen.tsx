import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Animated,
} from 'react-native';

interface Message {
  id: string;
  text: string;
  sender: 'bean' | 'user';
  timestamp: Date;
}

interface QuickReply {
  id: string;
  text: string;
  emoji: string;
}

const ChatScreen = ({ navigation }: any) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! 👋 I'm Bean, your wellness companion. How are you feeling today?",
      sender: 'bean',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([
    { id: '1', text: 'Feeling good', emoji: '😊' },
    { id: '2', text: 'A bit stressed', emoji: '😰' },
    { id: '3', text: 'Need help', emoji: '🆘' },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setQuickReplies([]);
    Keyboard.dismiss();

    setIsTyping(true);
    setTimeout(() => {
      const beanResponse = generateBeanResponse(text);
      const beanMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: beanResponse,
        sender: 'bean',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, beanMessage]);
      setIsTyping(false);

      updateQuickReplies(text);
    }, 1500);
  };

  const updateQuickReplies = (userText: string) => {
    const lowerText = userText.toLowerCase();

    if (lowerText.includes('stressed') || lowerText.includes('anxious')) {
      setQuickReplies([
        { id: '1', text: 'Try breathing', emoji: '🫁' },
        { id: '2', text: 'Tell me more', emoji: '💭' },
        { id: '3', text: 'Distract me', emoji: '🎮' },
      ]);
    } else if (lowerText.includes('good') || lowerText.includes('great')) {
      setQuickReplies([
        { id: '1', text: 'Share more', emoji: '✨' },
        { id: '2', text: 'Set a goal', emoji: '🎯' },
        { id: '3', text: 'Track mood', emoji: '📊' },
      ]);
    } else {
      setQuickReplies([
        { id: '1', text: 'Yes', emoji: '👍' },
        { id: '2', text: 'Tell me more', emoji: '💬' },
        { id: '3', text: 'Maybe later', emoji: '⏰' },
      ]);
    }
  };

  const generateBeanResponse = (userText: string): string => {
    const lowerText = userText.toLowerCase();

    if (lowerText.includes('stressed') || lowerText.includes('overwhelm')) {
      return "I hear you. 💚 Feeling overwhelmed is really tough. Let's take this one step at a time. Would you like to try a quick breathing exercise?";
    } else if (lowerText.includes('anxious') || lowerText.includes('worried')) {
      return "It's completely okay to feel anxious. 🌟 You're not alone in this. Would you like me to guide you through some grounding techniques?";
    } else if (
      lowerText.includes('good') ||
      lowerText.includes('great') ||
      lowerText.includes('happy')
    ) {
      return "That's wonderful to hear! 🎉 I'm so glad you're feeling good! Would you like to capture this moment or set a positive intention for the day?";
    } else if (lowerText.includes('sad') || lowerText.includes('down')) {
      return "I'm here with you. 💙 It's okay to feel sad sometimes. Would you like to talk about what's on your mind, or would you prefer a gentle distraction?";
    } else if (lowerText.includes('help') || lowerText.includes('support')) {
      return "I'm here to help! 🤗 What would be most helpful for you right now - talking through your feelings, trying a calming activity, or learning some coping strategies?";
    } else if (
      lowerText.includes('breathing') ||
      lowerText.includes('breathe')
    ) {
      return "Perfect! Let's do this together. 🫁 Take a deep breath in for 4 counts... Hold for 4... And exhale for 4. Let me know how you feel after!";
    } else if (
      lowerText.includes('yes') ||
      lowerText.includes('sure') ||
      lowerText.includes('okay')
    ) {
      return "Awesome! 🌈 Let's start. I'm right here with you every step of the way. What would you like to focus on first?";
    } else if (lowerText.includes('no') || lowerText.includes('maybe later')) {
      return "That's perfectly fine! 😊 There's no pressure at all. I'm here whenever you're ready. Is there anything else I can help you with?";
    } else if (lowerText.includes('thank')) {
      return "You're so welcome! 💚 Remember, you're doing great just by being here and taking care of yourself. I'm always here for you!";
    } else {
      return "I'm listening. 👂 Take your time and tell me more about how you're feeling. Every feeling is valid and I'm here to support you.";
    }
  };

  const handleQuickReply = (text: string) => {
    sendMessage(text);
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const renderMessage = ({ item, index }: { item: Message; index: number }) => {
    const isBean = item.sender === 'bean';
    const messageAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.spring(messageAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start();
    }, []);

    return (
      <Animated.View
        style={[
          styles.messageContainer,
          isBean ? styles.beanMessageContainer : styles.userMessageContainer,
          {
            opacity: messageAnim,
            transform: [
              {
                translateY: messageAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          },
        ]}
      >
        {isBean && (
          <View style={styles.beanAvatar}>
            <Image
              source={require('../../assets/images/select-user.png')}
              style={styles.avatarImage}
            />
          </View>
        )}

        <View style={styles.messageBubbleContainer}>
          <View
            style={[
              styles.messageBubble,
              isBean ? styles.beanBubble : styles.userBubble,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                isBean ? styles.beanMessageText : styles.userMessageText,
              ]}
            >
              {item.text}
            </Text>
          </View>
          <Text
            style={[
              styles.timestamp,
              isBean ? styles.timestampLeft : styles.timestampRight,
            ]}
          >
            {formatTime(item.timestamp)}
          </Text>
        </View>

        {!isBean && (
          <View style={styles.userAvatar}>
            <Text style={styles.avatarLetter}>You</Text>
          </View>
        )}
      </Animated.View>
    );
  };

  const renderTypingIndicator = () => {
    if (!isTyping) return null;

    return (
      <View style={[styles.messageContainer, styles.beanMessageContainer]}>
        <View style={styles.beanAvatar}>
          <Image
            source={require('../../assets/images/select-user.png')}
            style={styles.avatarImage}
          />
        </View>
        <View
          style={[styles.messageBubble, styles.beanBubble, styles.typingBubble]}
        >
          <View style={styles.typingDots}>
            <View style={[styles.dot, styles.dot1]} />
            <View style={[styles.dot, styles.dot2]} />
            <View style={[styles.dot, styles.dot3]} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4ECCA3" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <View style={styles.headerAvatarContainer}>
            <Image
              source={require('../../assets/images/select-user.png')}
              style={styles.headerAvatarImage}
            />
            <View style={styles.onlineIndicator} />
          </View>
          <View>
            <Text style={styles.headerTitle}>Bean</Text>
            <Text style={styles.headerSubtitle}>Always here for you</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuIcon}>⋮</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Chat Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderTypingIndicator}
        />

        {/* Quick Replies */}
        {quickReplies.length > 0 && (
          <Animated.View
            style={[styles.quickRepliesContainer, { opacity: fadeAnim }]}
          >
            {quickReplies.map(reply => (
              <TouchableOpacity
                key={reply.id}
                style={styles.quickReplyButton}
                onPress={() => handleQuickReply(reply.text)}
                activeOpacity={0.7}
              >
                <Text style={styles.quickReplyEmoji}>{reply.emoji}</Text>
                <Text style={styles.quickReplyText}>{reply.text}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        )}

        {/* Input Section */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Share your thoughts..."
              placeholderTextColor="#999"
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.sendButton,
              !inputText.trim() && styles.sendButtonDisabled,
            ]}
            onPress={() => sendMessage(inputText)}
            disabled={!inputText.trim()}
            activeOpacity={0.7}
          >
            <Text style={styles.sendIcon}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#4ECCA3',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  headerAvatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  headerAvatarImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    padding: 4,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#4ECCA3',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#E0F2F1',
    marginTop: 2,
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  messagesContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  beanMessageContainer: {
    justifyContent: 'flex-start',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  beanAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0F2F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#4ECCA3',
  },
  avatarImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  avatarLetter: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  messageBubbleContainer: {
    maxWidth: '70%',
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  beanBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: '#4ECCA3',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 21,
  },
  beanMessageText: {
    color: '#1A1A1A',
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  timestamp: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
  },
  timestampLeft: {
    alignSelf: 'flex-start',
  },
  timestampRight: {
    alignSelf: 'flex-end',
  },
  typingBubble: {
    paddingVertical: 16,
  },
  typingDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4ECCA3',
    marginHorizontal: 2,
  },
  dot1: {
    opacity: 0.4,
  },
  dot2: {
    opacity: 0.6,
  },
  dot3: {
    opacity: 0.8,
  },
  quickRepliesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  quickReplyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    borderWidth: 1.5,
    borderColor: '#4ECCA3',
    gap: 6,
  },
  quickReplyEmoji: {
    fontSize: 16,
  },
  quickReplyText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2E7D32',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    gap: 10,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4ECCA3',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#4ECCA3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  sendButtonDisabled: {
    backgroundColor: '#BDBDBD',
    elevation: 0,
  },
  sendIcon: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});

export default ChatScreen;
