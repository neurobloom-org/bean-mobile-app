import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window'); // Get device width & height

const WelcomeScreen = ({ navigation }: any) => {
  const handleGetStarted = () => {
    navigation.navigate('Features');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Robot Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/robot-first-page.png')}
            style={styles.robotImage}
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>Hello, I'm Bean</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Your friendly companion for a calmer, focused mind. Let's take a breath and start our journey together.
        </Text>

        {/* Get Started Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        {/* Pagination Dots */}
        <View style={styles.paginationContainer}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  imageContainer: {
    marginBottom: 20,
    width: width * 0.9,       // 90% of screen width
    height: height * 0.55,    // 55% of screen height
    alignItems: 'center',
    justifyContent: 'center',
  },
  robotImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',    // ensures the robot scales without distortion
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#4ECCA3',
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#4ECCA3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  paginationContainer: {
    flexDirection: 'row',
    marginTop: 10,
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

export default WelcomeScreen;
