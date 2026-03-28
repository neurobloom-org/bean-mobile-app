// Step indicator that renders a row of dots, expanding the active dot
// to a pill shape to show the current position in a multi-step flow.

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SPACING } from '../../constants';
import { useTheme } from '../../context/ThemeContext';

interface PaginationDotsProps {
  // Zero-based index of the currently active step.
  currentStep: number;
  // Total number of steps to render dots for.
  totalSteps: number;
}

export const PaginationDots: React.FC<PaginationDotsProps> = ({
  currentStep,
  totalSteps,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            // Inactive dots use the border colour as a subtle indicator.
            { backgroundColor: colors.BORDER },
            // Active dot expands to a pill and switches to the primary colour.
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
  // Base dot dimensions; width is overridden to 24 for the active step.
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
