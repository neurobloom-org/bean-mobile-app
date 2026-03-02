// src/components/common/Input.tsx
// ✅ UPDATED - Reusable input component with professional colorless eye icon

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

// Professional Eye Icon Component - Colorless
const EyeIcon = ({ visible }: { visible: boolean }) => (
  <View style={styles.eyeIconSvg}>
    {visible ? (
      // Eye Open Icon
      <View style={styles.eyeOpen}>
        <View style={styles.eyeOutline}>
          <View style={styles.eyePupil} />
        </View>
      </View>
    ) : (
      // Eye Closed Icon with slash
      <View style={styles.eyeClosed}>
        <View style={styles.eyeOutline}>
          <View style={styles.eyePupil} />
        </View>
        <View style={styles.eyeSlash} />
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

        {/* Password Toggle - Professional Eye Icon */}
        {isPassword && showPasswordToggle && (
          <TouchableOpacity
            style={styles.eyeIconContainer}
            onPress={togglePasswordVisibility}
            activeOpacity={0.7}
          >
            <EyeIcon visible={!secureTextEntry} />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.ERROR,
    marginTop: SPACING.XS,
  },
  // Professional Eye Icon Styles
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
    borderColor: COLORS.GRAY_400,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyePupil: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.GRAY_400,
  },
  eyeClosed: {
    width: 24,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeSlash: {
    position: 'absolute',
    width: 26,
    height: 2,
    backgroundColor: COLORS.GRAY_400,
    transform: [{ rotate: '45deg' }],
    top: 7,
  },
});
