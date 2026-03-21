// src/components/common/Input.tsx
// ✅ Dark theme aware

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
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  isPassword?: boolean;
  showPasswordToggle?: boolean;
}

// ✅ Eye icon now accepts color prop
const EyeIcon = ({ visible, color }: { visible: boolean; color: string }) => (
  <View style={styles.eyeIconSvg}>
    {visible ? (
      <View style={styles.eyeOpen}>
        <View style={[styles.eyeOutline, { borderColor: color }]}>
          <View style={[styles.eyePupil, { backgroundColor: color }]} />
        </View>
      </View>
    ) : (
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
  const { colors } = useTheme(); // ✅
  const [secureTextEntry, setSecureTextEntry] = useState(isPassword);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {/* Label */}
      {label && (
        <Text style={[styles.label, { color: colors.TEXT_PRIMARY }]}>
          {label}
        </Text>
      )}

      {/* Input Container */}
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

      {error && (
        <Text style={[styles.errorText, { color: colors.ERROR }]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: SPACING.LG },
  label: { ...TYPOGRAPHY.LABEL, marginBottom: SPACING.XS },
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
  eyeSlash: {
    position: 'absolute',
    width: 26,
    height: 2,
    transform: [{ rotate: '45deg' }],
    top: 7,
  },
});
