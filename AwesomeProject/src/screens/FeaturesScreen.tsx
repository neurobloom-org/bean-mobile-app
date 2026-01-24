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

interface FeatureItemProps {
  iconSource: any;
  title: string;
  subtitle: string;
}

const FeatureItem = ({ iconSource, title, subtitle }: FeatureItemProps) => (
  <View style={styles.featureCard}>
    <View style={styles.iconContainer}>
      <Image 
        source={iconSource} 
        style={styles.iconImage}
        resizeMode="contain"
      />
    </View>
    <View style={styles.featureTextContainer}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureSubtitle}>{subtitle}</Text>
    </View>
  </View>
);

const FeaturesScreen = ({ navigation }: any) => {
  const handleContinue = () => {
  navigation.navigate('Privacy');
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

        {/* Title */}
        <Text style={styles.title}>What Bean can do...</Text>

        {/* Features List */}
        <View style={styles.featuresContainer}>
          <FeatureItem
            iconSource={require('../../assets/images/mood-tracking.png')}
            title="Mood Tracking"
            subtitle="Track how you feel daily"
          />
          <FeatureItem
            iconSource={require('../../assets/images/tasks-and-routines.png')}
            title="Tasks & Routines"
            subtitle="Stay organized"
          />
          <FeatureItem
            iconSource={require('../../assets/images/focus-timer.png')}
            title="Focus Timer"
            subtitle="Stay productive"
          />
          <FeatureItem
            iconSource={require('../../assets/images/sos-alert.png')}
            title="SOS Alert"
            subtitle="Quick help when needed"
          />
          <FeatureItem
            iconSource={require('../../assets/images/meditation.png')}
            title="Meditation"
            subtitle="Find your calm"
          />
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
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
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
    marginBottom: 10,
  },
  backArrow: {
    fontSize: 28,
    color: '#000000',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 30,
  },
  featuresContainer: {
    flex: 1,
    gap: 16,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: '#E0F7F1',
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4ECCA3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    overflow: 'hidden',
  },
  iconImage: {
    width: 30,
    height: 30,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  featureSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  button: {
    backgroundColor: '#4ECCA3',
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
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

export default FeaturesScreen;