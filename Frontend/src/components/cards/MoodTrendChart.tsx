// src/components/cards/MoodTrendChart.tsx
// ✅ Pure View-based line chart — no external library needed

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS, SPACING } from '../../constants';

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - SPACING.XL * 2 - SPACING.LG * 2 - 2; // card padding
const CHART_HEIGHT = 80;
const DAYS = ['Mon', 'Tu', 'Wed', 'Th', 'Fr', 'Sat', 'Sun'];

interface MoodTrendChartProps {
  // scores: 0–10 for each day. Defaults to all zeros.
  scores?: number[];
}

const MoodTrendChart = ({
  scores = [0, 0, 0, 0, 0, 0, 0],
}: MoodTrendChartProps) => {
  const pts = scores.map((s, i) => ({
    x: (i / (scores.length - 1)) * CHART_WIDTH,
    y: CHART_HEIGHT - (s / 10) * CHART_HEIGHT,
  }));

  // Build SVG-style polyline points string — rendered as View segments
  const segments = pts.slice(0, -1).map((p, i) => {
    const next = pts[i + 1];
    const dx = next.x - p.x;
    const dy = next.y - p.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    return { x: p.x, y: p.y, len, angle };
  });

  const allZero = scores.every(s => s === 0);

  return (
    <View style={styles.wrapper}>
      {/* Label */}
      <Text style={styles.chartLabel}>Weekly Emotional Well-being</Text>

      {/* Status */}
      <View style={styles.statusRow}>
        <Text style={styles.statusWord}>Stable</Text>
        <Text style={styles.statusChange}>
          {allZero ? '  No data yet' : '  +0.0% improved'}
        </Text>
      </View>

      {/* Chart area */}
      <View style={[styles.chartArea, { height: CHART_HEIGHT + 16 }]}>
        {allZero ? (
          // Flat baseline when no data
          <View style={styles.flatLine} />
        ) : (
          // Render line segments
          segments.map((seg, i) => (
            <View
              key={i}
              style={[
                styles.segment,
                {
                  left: seg.x,
                  top: seg.y,
                  width: seg.len,
                  transform: [{ rotate: `${seg.angle}deg` }],
                },
              ]}
            />
          ))
        )}

        {/* Dots */}
        {pts.map((p, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { left: p.x - 4, top: p.y - 4 },
              allZero && styles.dotInactive,
            ]}
          />
        ))}
      </View>

      {/* Day labels */}
      <View style={styles.dayRow}>
        {DAYS.map(d => (
          <Text key={d} style={styles.dayLabel}>
            {d}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  chartLabel: {
    fontSize: 11,
    color: COLORS.TEXT_TERTIARY,
    marginBottom: SPACING.XS,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: SPACING.MD,
  },
  statusWord: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: COLORS.TEXT_PRIMARY,
  },
  statusChange: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: COLORS.PRIMARY,
  },
  chartArea: {
    position: 'relative',
    width: '100%',
    marginBottom: SPACING.XS,
  },
  // Flat line for zero state
  flatLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: CHART_HEIGHT / 2 + 8,
    height: 2,
    borderRadius: 1,
    backgroundColor: COLORS.GRAY_200,
  },
  // Line segment
  segment: {
    position: 'absolute',
    height: 2,
    borderRadius: 1,
    backgroundColor: COLORS.PRIMARY, // green line ✅
    transformOrigin: 'left center' as any,
  },
  // Data point dot
  dot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.PRIMARY,
    borderWidth: 2,
    borderColor: COLORS.WHITE,
  },
  dotInactive: {
    backgroundColor: COLORS.GRAY_300,
    borderColor: COLORS.WHITE,
  },
  dayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayLabel: {
    fontSize: 10,
    color: COLORS.TEXT_TERTIARY,
    textAlign: 'center',
    flex: 1,
  },
});

export default MoodTrendChart;
