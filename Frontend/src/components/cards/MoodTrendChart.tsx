// src/components/cards/MoodTrendChart.tsx
// ✅ Dark theme aware

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SPACING } from '../../constants';
import { useTheme } from '../../context/ThemeContext';

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - SPACING.XL * 2 - SPACING.LG * 2 - 2;
const CHART_HEIGHT = 80;
const DAYS = ['Mon', 'Tu', 'Wed', 'Th', 'Fr', 'Sat', 'Sun'];

interface MoodTrendChartProps {
  scores?: number[];
}

const MoodTrendChart = ({
  scores = [0, 0, 0, 0, 0, 0, 0],
}: MoodTrendChartProps) => {
  const { colors } = useTheme(); // ✅

  const pts = scores.map((s, i) => ({
    x: (i / (scores.length - 1)) * CHART_WIDTH,
    y: CHART_HEIGHT - (s / 10) * CHART_HEIGHT,
  }));

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
      <Text style={[styles.chartLabel, { color: colors.TEXT_TERTIARY }]}>
        Weekly Emotional Well-being
      </Text>

      {/* Status */}
      <View style={styles.statusRow}>
        <Text style={[styles.statusWord, { color: colors.TEXT_PRIMARY }]}>
          Stable
        </Text>
        <Text style={[styles.statusChange, { color: colors.PRIMARY }]}>
          {allZero ? '  No data yet' : '  +0.0% improved'}
        </Text>
      </View>

      {/* Chart area */}
      <View style={[styles.chartArea, { height: CHART_HEIGHT + 16 }]}>
        {allZero ? (
          <View style={[styles.flatLine, { backgroundColor: colors.BORDER }]} />
        ) : (
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

        {/* Dots */}
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

      {/* Day labels */}
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
  chartArea: { position: 'relative', width: '100%', marginBottom: SPACING.XS },
  flatLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: CHART_HEIGHT / 2 + 8,
    height: 2,
    borderRadius: 1,
  },
  segment: {
    position: 'absolute',
    height: 2,
    borderRadius: 1,
    transformOrigin: 'left center' as any,
  },
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
