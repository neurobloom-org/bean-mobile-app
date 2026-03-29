// First step of the guardian onboarding flow.
// Collects the patient's registered email address, masks it for display,
// then navigates to the patient email verification screen.

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator, // Added for the loading spinner
} from 'react-native';
import { BackButton, Input, PrimaryButton } from '../../components';
import { SPACING, TYPOGRAPHY } from '../../constants';
import { useTheme } from '../../context/ThemeContext';

const EnterWardEmailScreen = ({ navigation }: any) => {
  const { colors } = useTheme();
  
  const [wardEmail, setWardEmail] = useState('');
  const [isWaiting, setIsWaiting] = useState(false); // Tracks if we are waiting for the click
  
  // For the MVP, we hardcode a test guardian ID. In production, this comes from your Auth state.
  const [guardianId] = useState("073ae6aa-c5c0-4096-b168-9f69212522ec"); 

  const isValidEmail = wardEmail.trim().length > 0 && wardEmail.includes('@');

  // --- THE WATCHER: Polls the server every 3 seconds while waiting ---
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (isWaiting) {
      intervalId = setInterval(async () => {
        try {
          const response = await fetch(`http://192.168.8.146:5001/api/guardian/status/${guardianId}`);
          const data = await response.json();

          if (response.ok && data.verification_status === 'verified') {
            clearInterval(intervalId); // Stop asking the server
            setIsWaiting(false);       // Stop the loading spinner
            navigation.navigate('VerificationSuccessful'); // Move to the next screen!
          }
        } catch (error) {
          console.log("Polling check failed (network issue), will try again in 3s...", error);
        }
      }, 3000); // 3000 milliseconds = 3 seconds
    }

    // Cleanup the timer if the user leaves the screen
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isWaiting, guardianId, navigation]);


  // --- THE POSTMAN: Sends the email request ---
  const handleSend = async () => {
    if (!isValidEmail) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    try {
      // 1. Send request to your Flask Backend
      const response = await fetch('http://192.168.8.146:5001/api/guardian/request-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guardian_id: guardianId,
          patient_email: wardEmail.toLowerCase()
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 2. Success! The email is in their inbox. Start the watcher.
        setIsWaiting(true);
      } else {
        // e.g., "No NeuroBloom user found with that email."
        Alert.alert('Wait a second...', data.message); 
      }
    } catch (error) {
      Alert.alert('Network Error', 'Could not reach the NeuroBloom server. Check your connection.');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.BACKGROUND_LIGHT }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <BackButton disabled={isWaiting} />

          <Text style={[styles.title, { color: colors.TEXT_PRIMARY }]}>
            Ward's Email Address
          </Text>
          <Text style={[styles.subtitle, { color: colors.TEXT_SECONDARY }]}>
            Enter the email address of the person you are caring for. We will send them a secure verification code to link your accounts.
          </Text>

          {/* Hide the input field if we are already waiting for them to click */}
          {!isWaiting ? (
            <>
              <Text style={[styles.label, { color: colors.TEXT_PRIMARY }]}>Ward's Email</Text>
              <Input
                placeholder="ward@example.com"
                value={wardEmail}
                onChangeText={setWardEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <View style={styles.hintRow}>
                <Text style={styles.hintDot}>●</Text>
                <Text style={styles.hintText}>This must be the email they used to register their profile.</Text>
              </View>
            </>
          ) : (
             <View style={styles.waitingContainer}>
               <ActivityIndicator size="large" color={colors.PRIMARY} />
               <Text style={[styles.waitingTitle, { color: colors.TEXT_PRIMARY }]}>Email Sent!</Text>
               <Text style={[styles.waitingText, { color: colors.TEXT_SECONDARY }]}>
                 Waiting for {wardEmail} to click the verification link in their inbox...
               </Text>
             </View>
          )}

          <View style={{ flex: 1 }} />

          {!isWaiting && (
            <PrimaryButton
              title="Send Verification Code ➤"
              onPress={handleSend}
              variant="primary"
              size="large"
              fullWidth
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.XS,
    paddingBottom: SPACING.XL,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: SPACING.SM,
    marginTop: SPACING.MD,
  },
  subtitle: { ...TYPOGRAPHY.BODY_SMALL, lineHeight: 20, marginBottom: SPACING.XL },
  label: { fontSize: 13, fontWeight: '600', marginBottom: SPACING.XS },
  hintRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginTop: SPACING.XS, marginBottom: SPACING.XL },
  hintDot: { fontSize: 8, color: '#E53935', marginTop: 3 },
  hintText: { fontSize: 12, color: '#E53935', flex: 1, lineHeight: 17 },
  
  // New styles for the waiting state
  waitingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.XL,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  waitingTitle: { fontSize: 18, fontWeight: '700', marginTop: SPACING.MD, marginBottom: SPACING.XS },
  waitingText: { fontSize: 14, textAlign: 'center', paddingHorizontal: SPACING.LG, lineHeight: 20 },
});

export default EnterWardEmailScreen;