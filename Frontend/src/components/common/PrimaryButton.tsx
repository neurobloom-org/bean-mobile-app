// src/components/common/PrimaryButton.tsx
// Reusable primary button component with variants and sizes

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';

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
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    // Size styles
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

    // Full width
    if (fullWidth) {
      baseStyle.width = '100%';
    }

    // Variant styles
    if (variant === 'primary') {
      baseStyle.backgroundColor = COLORS.PRIMARY;
      baseStyle.shadowColor = COLORS.PRIMARY;
      baseStyle.shadowOffset = { width: 0, height: 4 };
      baseStyle.shadowOpacity = 0.3;
      baseStyle.shadowRadius = 8;
      baseStyle.elevation = 5;
    } else if (variant === 'secondary') {
      baseStyle.backgroundColor = COLORS.SECONDARY;
      baseStyle.shadowColor = COLORS.SECONDARY;
      baseStyle.shadowOffset = { width: 0, height: 4 };
      baseStyle.shadowOpacity = 0.3;
      baseStyle.shadowRadius = 8;
      baseStyle.elevation = 5;
    } else {
      baseStyle.backgroundColor = COLORS.TRANSPARENT;
      baseStyle.borderWidth = 2;
      baseStyle.borderColor = COLORS.PRIMARY;
    }

    // Disabled style
    if (disabled || loading) {
      baseStyle.backgroundColor = COLORS.GRAY_300;
      baseStyle.shadowOpacity = 0;
      baseStyle.elevation = 0;
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontWeight: '600',
    };

    // Size styles
    if (size === 'small') {
      baseStyle.fontSize = 14;
    } else if (size === 'medium') {
      baseStyle.fontSize = 16;
    } else {
      baseStyle.fontSize = 18;
    }

    // Variant styles
    if (variant === 'outline') {
      baseStyle.color = disabled || loading ? COLORS.GRAY_600 : COLORS.PRIMARY;
    } else {
      baseStyle.color = COLORS.WHITE;
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
          color={variant === 'outline' ? COLORS.PRIMARY : COLORS.WHITE}
          size="small"
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
