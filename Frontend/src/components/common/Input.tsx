// src/components/common/Input.tsx
// Reusable input component with label, error, and password toggle

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  isPassword?: boolean;
  showPasswordToggle?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  isPassword = false,
  showPasswordToggle = false,
  ...textInputProps
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(isPassword);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.container}>
      {/* Label */}
      {label && <Text style={styles.label}>{label}</Text>}

      {/* Input Container */}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError,
        ]}
      >
        {/* Icon (if provided) */}
        {icon && <View style={styles.iconContainer}>{icon}</View>}

        {/* Text Input */}
        <TextInput
          style={styles.input}
          placeholderTextColor={COLORS.GRAY_400}
          secureTextEntry={isPassword && secureTextEntry}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...textInputProps}
        />

        {/* Password Toggle */}
        {isPassword && showPasswordToggle && (
          <TouchableOpacity
            style={styles.eyeIconContainer}
            onPress={togglePasswordVisibility}
          >
            <Text style={styles.eyeIcon}>{secureTextEntry ? '👁️‍🗨️' : '👁️'}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Error Message */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.LG,
  },
  label: {
    ...TYPOGRAPHY.LABEL,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XS,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.GRAY_50,
    borderRadius: 12,
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
    borderWidth: 1,
    borderColor: COLORS.TRANSPARENT,
  },
  inputContainerFocused: {
    borderColor: COLORS.PRIMARY,
    backgroundColor: COLORS.WHITE,
  },
  inputContainerError: {
    borderColor: COLORS.ERROR,
  },
  iconContainer: {
    marginRight: SPACING.SM,
  },
  input: {
    flex: 1,
    ...TYPOGRAPHY.INPUT,
    color: COLORS.TEXT_PRIMARY,
  },
  eyeIconContainer: {
    padding: SPACING.XS,
  },
  eyeIcon: {
    fontSize: 20,
  },
  errorText: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.ERROR,
    marginTop: SPACING.XS,
  },
});
