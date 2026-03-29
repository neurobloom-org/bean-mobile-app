// Renders a weekly mood trend line chart using absolute-positioned segments and dots.

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SPACING } from '../../constants';
import { useTheme } from '../../context/ThemeContext';

const { width } = Dimensions.get('window');

// Chart dimensions derived from available horizontal space after padding
const CHART_WIDTH = width - SPACING.XL * 2 - SPACING.LG * 2 - 2;
const CHART_HEIGHT = 80;

// Day labels rendered beneath the chart
const DAYS = ['Mon', 'Tu', 'Wed', 'Th', 'Fr', 'Sat', 'Sun'];

interface MoodTrendChartProps {
  // Array of 7 mood scores (0–10), one per day. Defaults to all zeros.
  scores?: number[];
}

const MoodTrendChart = ({
  scores = [0, 0, 0, 0, 0, 0, 0],
}: MoodTrendChartProps) => {
  const { colors } = useTheme();

  // Convert each score to an (x, y) canvas coordinate.
  // x spreads evenly across CHART_WIDTH; y inverts the score so higher = higher on screen.
  const pts = scores.map((s, i) => ({
    x: (i / (scores.length - 1)) * CHART_WIDTH,
    y: CHART_HEIGHT - (s / 10) * CHART_HEIGHT,
  }));

  // Build line segments between consecutive points using length and rotation angle.
  const segments = pts.slice(0, -1).map((p, i) => {
    const next = pts[i + 1];
    const dx = next.x - p.x;
    const dy = next.y - p.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    return { x: p.x, y: p.y, len, angle };
  });

  // When all scores are zero, render a flat placeholder line instead of segments.
  const allZero = scores.every(s => s === 0);

  return (
    <View style={styles.wrapper}>
      {/* Chart title */}
      <Text style={[styles.chartLabel, { color: colors.TEXT_TERTIARY }]}>
        Weekly Emotional Well-being
      </Text>

      {/* Summary row: overall status and percentage change */}
      <View style={styles.statusRow}>
        <Text style={[styles.statusWord, { color: colors.TEXT_PRIMARY }]}>
          Stable
        </Text>
        <Text style={[styles.statusChange, { color: colors.PRIMARY }]}>
          {allZero ? '  No data yet' : '  +0.0% improved'}
        </Text>
      </View>

      {/* Canvas area holding line segments and data-point dots */}
      <View style={[styles.chartArea, { height: CHART_HEIGHT + 16 }]}>
        {allZero ? (
          // Flat centre line shown when no mood data is available
          <View style={[styles.flatLine, { backgroundColor: colors.BORDER }]} />
        ) : (
          // Rotated rectangles form the polyline between data points
          segments.map((seg, i) => (
            <View
              key={i}
              style={[
                styles.segment,
                {
                  left: seg.x,
                  top: seg.y,
                  width: seg.len,
                  backgroundColor: colors.PRIMARY,
                  transform: [{ rotate: `${seg.angle}deg` }],
                },
              ]}
            />
          ))
        )}

        {/* Data-point dots rendered on top of the line */}
        {pts.map((p, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              {
                left: p.x - 4,
                top: p.y - 4,
                backgroundColor: allZero ? colors.BORDER : colors.PRIMARY,
                borderColor: colors.SURFACE,
              },
            ]}
          />
        ))}
      </View>

      {/* Day-of-week labels aligned below each data point */}
      <View style={styles.dayRow}>
        {DAYS.map(d => (
          <Text
            key={d}
            style={[styles.dayLabel, { color: colors.TEXT_TERTIARY }]}
          >
            {d}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { width: '100%' },
  chartLabel: { fontSize: 11, marginBottom: SPACING.XS },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: SPACING.MD,
  },
  statusWord: { fontSize: 22, fontWeight: '700' as const },
  statusChange: { fontSize: 13, fontWeight: '600' as const },

  // Relative container; segments and dots are positioned absolutely inside
  chartArea: { position: 'relative', width: '100%', marginBottom: SPACING.XS },

  // Shown only when all scores are zero
  flatLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: CHART_HEIGHT / 2 + 8,
    height: 2,
    borderRadius: 1,
  },

  // Each segment is a thin horizontal bar rotated to the correct angle
  segment: {
    position: 'absolute',
    height: 2,
    borderRadius: 1,
    transformOrigin: 'left center' as any,
  },

  // Small circular marker at each data point
  dot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 2,
  },

  dayRow: { flexDirection: 'row', justifyContent: 'space-between' },
  dayLabel: { fontSize: 10, textAlign: 'center', flex: 1 },
});

export default MoodTrendChart;
