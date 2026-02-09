// src/components/common/PaginationDots.tsx
// Reusable pagination dots component

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../constants';

interface PaginationDotsProps {
  currentStep: number;
  totalSteps: number;
}

export const PaginationDots: React.FC<PaginationDotsProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[styles.dot, index === currentStep && styles.activeDot]}
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
    backgroundColor: COLORS.GRAY_300,
  },
  activeDot: {
    backgroundColor: COLORS.PRIMARY,
    width: 24,
  },
});
