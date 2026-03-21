// src/components/common/PaginationDots.tsx
// ✅ Dark theme aware

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SPACING } from '../../constants';
import { useTheme } from '../../context/ThemeContext';

interface PaginationDotsProps {
  currentStep: number;
  totalSteps: number;
}

export const PaginationDots: React.FC<PaginationDotsProps> = ({
  currentStep,
  totalSteps,
}) => {
  const { colors } = useTheme(); // ✅

  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            { backgroundColor: colors.BORDER },
            index === currentStep && {
              backgroundColor: colors.PRIMARY,
              width: 24,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: SPACING.MD,
    gap: SPACING.SM,
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
