/**
 * @file components/focus/CognitiveTrendMultiBandChart.tsx
 * @description Multi-band cognitive trend graph showing session alertness over time.
 * Matches Figma s24 ("Chi tiết phiên"): 3 colored bands (Tỉnh táo, Hơi giảm, Mệt)
 * with continuous smooth Bezier curve and alert landmark point.
 */

import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Rect, Path, Circle, Text as SvgText, Line } from 'react-native-svg';

export interface CognitiveTrendMultiBandChartProps {
  /** Chart height */
  height?: number;
  /** Custom class names */
  className?: string;
}

/**
 * CognitiveTrendMultiBandChart Component
 * @param props CognitiveTrendMultiBandChartProps
 * @returns JSX.Element
 */
export const CognitiveTrendMultiBandChart: React.FC<CognitiveTrendMultiBandChartProps> = ({
  height = 160,
  className = '',
}) => {
  const chartWidth = 320;
  const bandHeight = height / 3;

  return (
    <View className={`w-full bg-white rounded-3xl p-4 border border-[#E1EBEA] shadow-sm mb-4 ${className}`}>
      {/* Title */}
      <Text className="text-sm font-bold text-[#0D2B34] mb-3">
        Mức tỉnh táo theo thời gian
      </Text>

      {/* SVG Canvas */}
      <View style={{ height, width: '100%', overflow: 'hidden', borderRadius: 16 }}>
        <Svg width="100%" height={height} viewBox={`0 0 ${chartWidth} ${height}`} preserveAspectRatio="none">
          {/* Top Zone: Tỉnh táo (Green) */}
          <Rect
            x="0"
            y="0"
            width={chartWidth}
            height={bandHeight}
            fill="#E6F8EF"
          />
          {/* Middle Zone: Hơi giảm (Yellow) */}
          <Rect
            x="0"
            y={bandHeight}
            width={chartWidth}
            height={bandHeight}
            fill="#FEF8E7"
          />
          {/* Bottom Zone: Mệt (Coral/Red) */}
          <Rect
            x="0"
            y={bandHeight * 2}
            width={chartWidth}
            height={bandHeight}
            fill="#FDF0ED"
          />

          {/* Zone Divider Lines */}
          <Line
            x1="0"
            y1={bandHeight}
            x2={chartWidth}
            y2={bandHeight}
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          <Line
            x1="0"
            y1={bandHeight * 2}
            x2={chartWidth}
            y2={bandHeight * 2}
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />

          {/* Zone Text Labels */}
          <SvgText
            x="12"
            y="22"
            fill="#2DB872"
            fontSize="10"
            fontWeight="600"
          >
            Tỉnh táo
          </SvgText>

          <SvgText
            x="12"
            y={bandHeight + 22}
            fill="#C48800"
            fontSize="10"
            fontWeight="600"
          >
            Hơi giảm
          </SvgText>

          <SvgText
            x="12"
            y={bandHeight * 2 + 22}
            fill="#E06D53"
            fontSize="10"
            fontWeight="600"
          >
            Mệt
          </SvgText>

          {/* Smooth Alertness Curve */}
          {/* Path starts in Tỉnh táo (y=28), dips through Hơi giảm down to Mệt (x=150, y=120), rises to Hơi giảm (x=240, y=70), and ends (x=305, y=95) */}
          <Path
            d="M 12 32 C 60 38, 100 55, 140 105 C 150 118, 160 120, 175 105 C 205 78, 235 68, 265 80 C 285 88, 295 92, 305 95"
            fill="none"
            stroke="#0D2B34"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Landmark 1: Fatigue Alert Point at 09:48 (amber dot) */}
          <Circle
            cx="148"
            cy="114"
            r="5"
            fill="#EAA01B"
            stroke="#FFFFFF"
            strokeWidth="2"
          />

          {/* Landmark 2: End session Point (slate dot) */}
          <Circle
            cx="305"
            cy="95"
            r="4.5"
            fill="#5E7A85"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
        </Svg>
      </View>
    </View>
  );
};
