/**
 * @file components/focus/SessionTimelineBar.tsx
 * @description Segmented timeline bar showing cognitive state progression throughout a focus session.
 * Used in Figma s21 ("Diễn biến trong phiên") and s23 ("Phiên trong ngày").
 * Renders SVG patterns for Alert (green dots), Reduced (yellow diagonal stripes), and Fatigued (orange cross-hatch).
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Defs, Pattern, Rect, Line, Circle, G } from 'react-native-svg';

export interface TimelineSegment {
  /** Cognitive state for this segment */
  state: 'alert' | 'reduced' | 'fatigued';
  /** Proportional weight / duration */
  weight: number;
}

export interface SessionTimelineBarProps {
  /** Ordered segments of the session */
  segments?: TimelineSegment[];
  /** Height of the bar */
  height?: number;
  /** Optional custom class name */
  className?: string;
  /** Unique ID prefix for SVG pattern definitions */
  idPrefix?: string;
}

const DEFAULT_SEGMENTS: TimelineSegment[] = [
  { state: 'alert', weight: 40 },
  { state: 'reduced', weight: 30 },
  { state: 'fatigued', weight: 20 },
  { state: 'alert', weight: 22 },
];

/**
 * SessionTimelineBar Component
 * @param props SessionTimelineBarProps
 * @returns JSX.Element
 */
export const SessionTimelineBar: React.FC<SessionTimelineBarProps> = ({
  segments = DEFAULT_SEGMENTS,
  height = 24,
  className = '',
  idPrefix = 'bar',
}) => {
  const totalWeight = segments.reduce((sum, seg) => sum + seg.weight, 0);

  // Calculate segment layout in 300 unit coordinate space
  const chartWidth = 300;
  let currentX = 0;

  const renderedSegments = segments.map((seg, idx) => {
    const segWidth = (seg.weight / totalWeight) * chartWidth;
    const xPos = currentX;
    currentX += segWidth;

    return {
      id: `${idPrefix}-seg-${idx}`,
      x: xPos,
      width: segWidth,
      state: seg.state,
    };
  });

  return (
    <View
      className={`w-full overflow-hidden rounded-full ${className}`}
      style={{ height, borderRadius: height / 2 }}
    >
      <Svg width="100%" height={height} viewBox={`0 0 ${chartWidth} ${height}`} preserveAspectRatio="none">
        <Defs>
          {/* Pattern 1: Alert (Green dots) */}
          <Pattern
            id={`${idPrefix}-alert-pattern`}
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <Rect width="10" height="10" fill="#E6F8EF" />
            <Circle cx="5" cy="5" r="1.5" fill="#2DB872" />
          </Pattern>

          {/* Pattern 2: Reduced (Yellow diagonal stripes) */}
          <Pattern
            id={`${idPrefix}-reduced-pattern`}
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <Rect width="8" height="8" fill="#FEF9E7" />
            <Line x1="0" y1="0" x2="0" y2="8" stroke="#F5C744" strokeWidth="2.5" />
          </Pattern>

          {/* Pattern 3: Fatigued (Orange criss-cross lattice) */}
          <Pattern
            id={`${idPrefix}-fatigued-pattern`}
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <Rect width="8" height="8" fill="#FDF1ED" />
            <Line x1="0" y1="0" x2="8" y2="8" stroke="#F18E76" strokeWidth="1.2" />
            <Line x1="8" y1="0" x2="0" y2="8" stroke="#F18E76" strokeWidth="1.2" />
          </Pattern>
        </Defs>

        {renderedSegments.map((item) => {
          let patternUrl = `url(#${idPrefix}-alert-pattern)`;
          if (item.state === 'reduced') patternUrl = `url(#${idPrefix}-reduced-pattern)`;
          if (item.state === 'fatigued') patternUrl = `url(#${idPrefix}-fatigued-pattern)`;

          return (
            <Rect
              key={item.id}
              x={item.x}
              y={0}
              width={item.width}
              height={height}
              fill={patternUrl}
            />
          );
        })}
      </Svg>
    </View>
  );
};

/**
 * Legend Item Component with matching SVG patterned badge icon
 */
export const TimelineLegend: React.FC = () => {
  return (
    <View className="flex-row items-center gap-4 mt-3">
      {/* Alert Legend */}
      <View className="flex-row items-center gap-1.5">
        <View className="w-3.5 h-3.5 rounded-sm overflow-hidden border border-[#A7F3D0]">
          <Svg width="14" height="14">
            <Rect width="14" height="14" fill="#E6F8EF" />
            <Circle cx="7" cy="7" r="2" fill="#2DB872" />
          </Svg>
        </View>
        <Text className="text-xs text-[#5E7A85] font-medium">Tỉnh táo</Text>
      </View>

      {/* Reduced Legend */}
      <View className="flex-row items-center gap-1.5">
        <View className="w-3.5 h-3.5 rounded-sm overflow-hidden border border-[#FDE68A]">
          <Svg width="14" height="14">
            <Rect width="14" height="14" fill="#FEF9E7" />
            <Line x1="0" y1="0" x2="14" y2="14" stroke="#F5C744" strokeWidth="2.5" />
          </Svg>
        </View>
        <Text className="text-xs text-[#5E7A85] font-medium">Hơi giảm</Text>
      </View>

      {/* Fatigued Legend */}
      <View className="flex-row items-center gap-1.5">
        <View className="w-3.5 h-3.5 rounded-sm overflow-hidden border border-[#FED7AA]">
          <Svg width="14" height="14">
            <Rect width="14" height="14" fill="#FDF1ED" />
            <Line x1="0" y1="0" x2="14" y2="14" stroke="#F18E76" strokeWidth="1.5" />
            <Line x1="14" y1="0" x2="0" y2="14" stroke="#F18E76" strokeWidth="1.5" />
          </Svg>
        </View>
        <Text className="text-xs text-[#5E7A85] font-medium">Mệt</Text>
      </View>
    </View>
  );
};
