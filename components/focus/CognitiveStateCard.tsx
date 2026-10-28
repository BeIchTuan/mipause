/**
 * @file components/focus/CognitiveStateCard.tsx
 * @description Dynamic real-time cognitive state card for the active focus screen (s11, s13-s16).
 * Features pixel-perfect patterned outer frames (diagonal stripes, cross-hatch, dashed, dots),
 * inner white surface, custom emoji faces, and Figma typography.
 */

import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Svg, { Defs, Pattern, Rect, Line, Circle, Path } from 'react-native-svg';
import { Bluetooth } from 'lucide-react-native';
import { CognitiveState } from '../../types/focus';
import { COGNITIVE_STATE_CONFIGS } from '../../mocks/focusMockData';

export interface CognitiveStateCardProps {
  /** Current evaluated brainwave state */
  state: CognitiveState;
  /** Optional click handler (e.g. to switch demo states or open explanation modal) */
  onPress?: () => void;
}

/**
 * Custom Avatar component rendering the exact face emoji or bluetooth icon from Figma
 */
const StateAvatar: React.FC<{ state: CognitiveState; color: string }> = ({ state, color }) => {
  if (state === 'lost_signal') {
    return (
      <View
        className="w-14 h-14 rounded-full items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <Bluetooth size={26} color="#FFFFFF" strokeWidth={2.5} />
      </View>
    );
  }

  // Draw expressive face with SVG
  return (
    <View className="w-14 h-14 rounded-full overflow-hidden items-center justify-center" style={{ backgroundColor: color }}>
      <Svg width={44} height={44} viewBox="0 0 44 44">
        {/* Left eye */}
        <Circle cx={14} cy={16} r={2.5} fill="#0D2B34" />
        {/* Right eye */}
        <Circle cx={30} cy={16} r={2.5} fill="#0D2B34" />

        {/* Mouth matching state */}
        {state === 'alert' && (
          // Smiling curve
          <Path
            d="M 13 25 Q 22 34 31 25"
            stroke="#0D2B34"
            strokeWidth={3}
            strokeLinecap="round"
            fill="none"
          />
        )}

        {state === 'reduced' && (
          // Straight neutral line
          <Line
            x1={14}
            y1={27}
            x2={30}
            y2={27}
            stroke="#0D2B34"
            strokeWidth={3}
            strokeLinecap="round"
          />
        )}

        {state === 'fatigued' && (
          // Frowning downward curve
          <Path
            d="M 13 30 Q 22 22 31 30"
            stroke="#0D2B34"
            strokeWidth={3}
            strokeLinecap="round"
            fill="none"
          />
        )}
      </Svg>
    </View>
  );
};

/**
 * Renders the distinctive patterned background frame defined in Figma s13-s16
 */
const PatternedBorderBackground: React.FC<{ state: CognitiveState }> = ({ state }) => {
  switch (state) {
    case 'reduced':
      // Yellow diagonal stripes / / / /
      return (
        <Svg style={StyleSheet.absoluteFillObject} width="100%" height="100%">
          <Defs>
            <Pattern
              id="reducedStripes"
              width="12"
              height="12"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <Rect width="12" height="12" fill="#FEF9E7" />
              <Line x1="0" y1="0" x2="0" y2="12" stroke="#F5C744" strokeWidth="4" />
            </Pattern>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#reducedStripes)" rx="24" />
        </Svg>
      );

    case 'fatigued':
      // Orange cross-hatch / criss-cross lattice
      return (
        <Svg style={StyleSheet.absoluteFillObject} width="100%" height="100%">
          <Defs>
            <Pattern
              id="fatiguedLattice"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <Rect width="10" height="10" fill="#FDF1ED" />
              <Line x1="0" y1="0" x2="10" y2="10" stroke="#F18E76" strokeWidth="1.5" />
              <Line x1="10" y1="0" x2="0" y2="10" stroke="#F18E76" strokeWidth="1.5" />
            </Pattern>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#fatiguedLattice)" rx="24" />
        </Svg>
      );

    case 'lost_signal':
      // Grey dashed border
      return (
        <Svg style={StyleSheet.absoluteFillObject} width="100%" height="100%">
          <Rect
            x="2"
            y="2"
            width="98%"
            height="98%"
            fill="#EAF0F2"
            stroke="#6B828D"
            strokeWidth="2"
            strokeDasharray="6, 5"
            rx="24"
          />
        </Svg>
      );

    case 'alert':
    default:
      // Green subtle mint wave/dots border
      return (
        <Svg style={StyleSheet.absoluteFillObject} width="100%" height="100%">
          <Defs>
            <Pattern
              id="alertDots"
              width="14"
              height="14"
              patternUnits="userSpaceOnUse"
            >
              <Rect width="14" height="14" fill="#E6F8EF" />
              <Circle cx="7" cy="7" r="1.5" fill="#2DB872" />
            </Pattern>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#alertDots)" rx="24" />
        </Svg>
      );
  }
};

/**
 * CognitiveStateCard Component
 * @param props CognitiveStateCardProps
 * @returns JSX.Element
 */
export const CognitiveStateCard: React.FC<CognitiveStateCardProps> = ({ state, onPress }) => {
  const config = COGNITIVE_STATE_CONFIGS[state];

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Trạng thái nhận thức: ${config.label}. ${config.subtext}`}
      className="w-full rounded-[24px] p-2 mb-4 active:opacity-90 overflow-hidden relative"
      style={{ minHeight: 104 }}
    >
      {/* Patterned Frame Banner Background */}
      <PatternedBorderBackground state={state} />

      {/* Inner White Content Card */}
      <View className="bg-white rounded-[18px] p-4 flex-row items-center gap-4 shadow-sm">
        {/* Avatar Icon */}
        <StateAvatar state={state} color={config.themeColor} />

        {/* Text Details */}
        <View className="flex-1 justify-center">
          <Text className="text-xl font-black text-[#0D2B34] tracking-wider mb-0.5">
            {config.label}
          </Text>
          <Text className="text-sm font-medium text-[#46606B] mb-0.5">
            {config.subtext}
          </Text>
          <Text className="text-[11px] font-normal text-[#8A9FA8]">
            {config.patternLabel}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
