/**
 * @file components/focus/FocusWaveformChart.tsx
 * @description Real-time EEG trendline sparkline graph showing alertness over the last 15 minutes.
 * Matches Figma s11, s13-s16 "Mức tỉnh táo · 15 phút gần nhất" card.
 * Uses react-native-svg smooth cubic bezier curve with linear gradient fill and lost-signal break.
 */

import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import { CognitiveState } from '../../types/focus';

export interface FocusWaveformChartProps {
  /** Cognitive state to reflect connection drops */
  currentState?: CognitiveState;
  /** Width of the chart */
  width?: number;
  /** Height of the graph */
  height?: number;
}

/**
 * FocusWaveformChart Component
 * @param props FocusWaveformChartProps
 * @returns JSX.Element
 */
export const FocusWaveformChart: React.FC<FocusWaveformChartProps> = ({
  currentState = 'alert',
  height = 80,
}) => {
  const isLostSignal = currentState === 'lost_signal';

  return (
    <View className="w-full bg-[#12242E] border border-[#1E3542] p-4 rounded-2xl mb-4">
      {/* Title */}
      <Text className="text-xs font-semibold text-[#8DA6B2] mb-3">
        Mức tỉnh táo · 15 phút gần nhất
      </Text>

      {/* SVG Smooth Curve Area */}
      <View style={{ height, width: '100%', overflow: 'hidden' }}>
        <Svg width="100%" height={height} viewBox="0 0 320 80" preserveAspectRatio="none">
          <Defs>
            <LinearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.28" />
              <Stop offset="100%" stopColor="#12242E" stopOpacity="0.0" />
            </LinearGradient>
          </Defs>

          {/* Gradient area under the line */}
          <Path
            d={
              isLostSignal
                ? 'M 10 32 C 80 32, 160 38, 230 40 L 230 80 L 10 80 Z'
                : 'M 10 24 C 90 28, 180 44, 310 52 L 310 80 L 10 80 Z'
            }
            fill="url(#waveGradient)"
          />

          {/* Main solid glowing curve */}
          <Path
            d={
              isLostSignal
                ? 'M 10 32 C 80 32, 160 38, 230 40'
                : 'M 10 24 C 90 28, 180 44, 310 52'
            }
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* If lost signal: draw amber break point and dashed tail */}
          {isLostSignal && (
            <>
              {/* Amber break point circle */}
              <Circle cx="230" cy="40" r="4.5" fill="#EAA01B" stroke="#FFFFFF" strokeWidth="1.5" />

              {/* Dashed line continuing after disconnection */}
              <Path
                d="M 235 40 L 310 40"
                fill="none"
                stroke="#6B828D"
                strokeWidth="2"
                strokeDasharray="4, 4"
                strokeLinecap="round"
              />
            </>
          )}
        </Svg>
      </View>
    </View>
  );
};
