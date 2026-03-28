// Reusable back navigation button that falls back to navigation.goBack()
// when no custom onPress handler is provided.

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';

interface BackButtonProps {
  // Optional custom handler; if omitted, navigation.goBack() is called instead.
  onPress?: () => void;
  // Override arrow colour; defaults to the current theme's primary text colour.
  color?: string;
  // Font size of the arrow character. Defaults to 28.
  size?: number;
}

export const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  color,
  size = 28,
}) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  // Use the provided handler if available, otherwise fall back to goBack.
  const handlePress = () => {
    if (onPress) onPress();
    else navigation.goBack();
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text
        style={[
          styles.arrow,
          { color: color ?? colors.TEXT_PRIMARY, fontSize: size },
        ]}
      >
        ←
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Fixed touch target size; arrow is left-aligned within the hit area.
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  arrow: { fontWeight: '600' },
});
