// Flexible button component supporting three visual variants (primary, secondary, outline),
// three size presets, a loading spinner state, and an optional full-width layout.

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
  // Controls background and border appearance. Defaults to 'primary'.
  variant?: 'primary' | 'secondary' | 'outline';
  // Controls padding and font size. Defaults to 'medium'.
  size?: 'small' | 'medium' | 'large';
  // When true, replaces the label with an ActivityIndicator and disables presses.
  loading?: boolean;
  // When true, greys out the button and prevents interaction.
  disabled?: boolean;
  // When true, stretches the button to fill its parent container.
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
  const { colors } = useTheme();

  // Builds the container style by composing size, variant, and state overrides.
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    // Apply padding based on the selected size preset.
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

    // Apply background and shadow based on the selected variant.
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
      // Outline variant: transparent fill with a coloured border.
      baseStyle.backgroundColor = colors.TRANSPARENT;
      baseStyle.borderWidth = 2;
      baseStyle.borderColor = colors.PRIMARY;
    }

    // Disabled and loading states share the same muted appearance.
    if (disabled || loading) {
      baseStyle.backgroundColor = colors.GRAY_300;
      baseStyle.shadowOpacity = 0;
      baseStyle.elevation = 0;
    }

    return baseStyle;
  };

  // Builds the label style based on size and variant, with a muted override when inactive.
  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = { fontWeight: '600' };

    if (size === 'small') baseStyle.fontSize = 14;
    else if (size === 'medium') baseStyle.fontSize = 16;
    else baseStyle.fontSize = 18;

    // Outline labels use the primary colour; all other variants use white.
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
        // Spinner colour matches the variant so it remains visible against the background.
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
