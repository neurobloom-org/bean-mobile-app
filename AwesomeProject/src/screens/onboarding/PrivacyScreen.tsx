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

const PrivacyScreen = ({ navigation }: any) => {
  const handleContinue = () => {
    navigation.navigate('RoleSelection');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        {/* Privacy Icon */}
        <View style={styles.iconContainer}>
          <Image
            source={require('../../assets/images/privacy-page-image.png')}
            style={styles.privacyIcon}
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>Your Privacy Really Matters for US !</Text>

        {/* Terms Box - No internal scrolling, just taller */}
        <View style={styles.termsBox}>
          <Text style={styles.termsText}>
            By continuing to access or use the Bean Robot, its software, and
            related services, you expressly acknowledge that you have read,
            understood, and agree to be legally bound by these Terms and
            Conditions and the Privacy Policy, which together form a binding
            agreement between you and the service provider. You consent to the
            collection, use, storage, and processing of your personal data in
            accordance with the Privacy Policy and applicable laws. Your
            continued use of the service constitutes your full, informed, and
            voluntary acceptance of all terms, obligations, limitations, and
            disclaimers set forth herein.
          </Text>

          {/* Bottom Text */}
          <Text style={styles.bottomText}>
            By <Text style={styles.linkText}>continuing</Text>, you agree to our
            Terms & Privacy Policy
          </Text>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        {/* Pagination Dots */}
        <View style={styles.paginationContainer}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: 20,
  },
  backArrow: {
    fontSize: 28,
    color: '#000000',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  privacyIcon: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  termsBox: {
    backgroundColor: '#D5F5E8',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  termsText: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 22,
    textAlign: 'justify',
    marginBottom: 20,
  },
  bottomText: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    marginTop: 4,
  },
  linkText: {
    color: '#E74C3C',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#4ECCA3',
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#4ECCA3',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D3D3D3',
  },
  activeDot: {
    backgroundColor: '#4ECCA3',
    width: 24,
  },
});

export default PrivacyScreen;
