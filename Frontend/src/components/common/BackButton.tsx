// src/components/common/BackButton.tsx
// ✅ Dark theme aware

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';

interface BackButtonProps {
  onPress?: () => void;
  color?: string;
  size?: number;
}

export const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  color,
  size = 28,
}) => {
  const { colors } = useTheme(); // ✅
  const navigation = useNavigation();

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
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  arrow: { fontWeight: '600' },
});
