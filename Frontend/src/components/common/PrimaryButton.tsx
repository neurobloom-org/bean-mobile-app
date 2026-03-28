// src/components/common/PrimaryButton.tsx
// ✅ Dark theme aware

import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = false,
}) => {
  const { colors } = useTheme(); // ✅

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    // Size
    if (size === 'small') {
      baseStyle.paddingVertical = 10;
      baseStyle.paddingHorizontal = 24;
    } else if (size === 'medium') {
      baseStyle.paddingVertical = 14;
      baseStyle.paddingHorizontal = 32;
    } else {
      baseStyle.paddingVertical = 16;
      baseStyle.paddingHorizontal = 40;
    }

    if (fullWidth) baseStyle.width = '100%';

    // Variant
    if (variant === 'primary') {
      baseStyle.backgroundColor = colors.PRIMARY;
      baseStyle.shadowColor = colors.PRIMARY;
      baseStyle.shadowOffset = { width: 0, height: 4 };
      baseStyle.shadowOpacity = 0.3;
      baseStyle.shadowRadius = 8;
      baseStyle.elevation = 5;
    } else if (variant === 'secondary') {
      baseStyle.backgroundColor = colors.SECONDARY;
      baseStyle.shadowColor = colors.SECONDARY;
      baseStyle.shadowOffset = { width: 0, height: 4 };
      baseStyle.shadowOpacity = 0.3;
      baseStyle.shadowRadius = 8;
      baseStyle.elevation = 5;
    } else {
      baseStyle.backgroundColor = colors.TRANSPARENT;
      baseStyle.borderWidth = 2;
      baseStyle.borderColor = colors.PRIMARY;
    }

    // Disabled
    if (disabled || loading) {
      baseStyle.backgroundColor = colors.GRAY_300;
      baseStyle.shadowOpacity = 0;
      baseStyle.elevation = 0;
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = { fontWeight: '600' };

    if (size === 'small') baseStyle.fontSize = 14;
    else if (size === 'medium') baseStyle.fontSize = 16;
    else baseStyle.fontSize = 18;

    if (variant === 'outline') {
      baseStyle.color = disabled || loading ? colors.GRAY_600 : colors.PRIMARY;
    } else {
      baseStyle.color = colors.WHITE;
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? colors.PRIMARY : colors.WHITE}
          size="small"
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
