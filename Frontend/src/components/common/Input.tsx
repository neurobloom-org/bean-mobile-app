// Themed text input with optional label, error message, leading icon,
// and a password visibility toggle rendered as a custom SVG-style eye icon.

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { SPACING, TYPOGRAPHY } from '../../constants';
import { useTheme } from '../../context/ThemeContext';

interface InputProps extends TextInputProps {
  // Optional field label rendered above the input.
  label?: string;
  // Validation error message displayed below the input in red.
  error?: string;
  // Optional leading icon node rendered inside the input container.
  icon?: React.ReactNode;
  // When true, text is hidden by default and the toggle button is relevant.
  isPassword?: boolean;
  // When true, renders the eye icon button to reveal/hide the password.
  showPasswordToggle?: boolean;
}

// Draws a simple open or crossed-out eye using nested View shapes.
// Accepts a colour prop so it inherits the active theme's text colour.
const EyeIcon = ({ visible, color }: { visible: boolean; color: string }) => (
  <View style={styles.eyeIconSvg}>
    {visible ? (
      // Open eye: oval outline with a filled pupil
      <View style={styles.eyeOpen}>
        <View style={[styles.eyeOutline, { borderColor: color }]}>
          <View style={[styles.eyePupil, { backgroundColor: color }]} />
        </View>
      </View>
    ) : (
      // Closed eye: oval outline with a diagonal slash overlaid
      <View style={styles.eyeClosed}>
        <View style={[styles.eyeOutline, { borderColor: color }]}>
          <View style={[styles.eyePupil, { backgroundColor: color }]} />
        </View>
        <View style={[styles.eyeSlash, { backgroundColor: color }]} />
      </View>
    )}
  </View>
);

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  isPassword = false,
  showPasswordToggle = false,
  ...textInputProps
}) => {
  const { colors } = useTheme();

  // Tracks whether the password characters are currently hidden.
  const [secureTextEntry, setSecureTextEntry] = useState(isPassword);

  // Drives the focused border and background highlight.
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {/* Optional label above the field */}
      {label && (
        <Text style={[styles.label, { color: colors.TEXT_PRIMARY }]}>
          {label}
        </Text>
      )}

      {/* Input row: optional icon, text field, optional eye toggle */}
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: colors.BACKGROUND_LIGHT,
            borderColor: colors.TRANSPARENT,
          },
          isFocused && {
            borderColor: colors.PRIMARY,
            backgroundColor: colors.SURFACE,
          },
          error ? { borderColor: colors.ERROR } : null,
        ]}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}

        <TextInput
          style={[styles.input, { color: colors.TEXT_PRIMARY }]}
          placeholderTextColor={colors.TEXT_TERTIARY}
          secureTextEntry={isPassword && secureTextEntry}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...textInputProps}
        />

        {/* Password visibility toggle; only rendered when both flags are set */}
        {isPassword && showPasswordToggle && (
          <TouchableOpacity
            style={styles.eyeIconContainer}
            onPress={() => setSecureTextEntry(!secureTextEntry)}
            activeOpacity={0.7}
          >
            <EyeIcon visible={!secureTextEntry} color={colors.TEXT_TERTIARY} />
          </TouchableOpacity>
        )}
      </View>

      {/* Inline validation error */}
      {error && (
        <Text style={[styles.errorText, { color: colors.ERROR }]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: SPACING.LG },
  label: { ...TYPOGRAPHY.LABEL, marginBottom: SPACING.XS },

  // Border colour is transparent by default; overridden on focus or error.
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
    borderWidth: 1,
  },

  iconContainer: { marginRight: SPACING.SM },
  input: { flex: 1, ...TYPOGRAPHY.INPUT },
  eyeIconContainer: {
    padding: SPACING.XS,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: { ...TYPOGRAPHY.CAPTION, marginTop: SPACING.XS },

  // Eye icon geometry
  eyeIconSvg: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeOpen: {
    width: 24,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeOutline: {
    width: 24,
    height: 14,
    borderWidth: 2,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyePupil: { width: 8, height: 8, borderRadius: 4 },
  eyeClosed: {
    width: 24,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Diagonal bar that crosses out the eye shape when password is hidden
  eyeSlash: {
    position: 'absolute',
    width: 26,
    height: 2,
    transform: [{ rotate: '45deg' }],
    top: 7,
  },
});
