/**
 * @file components/focus/HapticPromptPill.tsx
 * @description Renders the haptic alert and audio cue prompt card in active focus session (s11, s13-s16).
 * Follows calm technology principles to reassure the user without causing startled reactions.
 */

import React from 'react';
import { View, Text } from 'react-native';
import { Vibrate } from 'lucide-react-native';
import { CognitiveState } from '../../types/focus';
import { COGNITIVE_STATE_CONFIGS } from '../../mocks/focusMockData';

export interface HapticPromptPillProps {
  /** Current evaluated cognitive state */
  state: CognitiveState;
}

/**
 * HapticPromptPill Component
 * @param props HapticPromptPillProps
 * @returns JSX.Element
 */
export const HapticPromptPill: React.FC<HapticPromptPillProps> = ({ state }) => {
  const config = COGNITIVE_STATE_CONFIGS[state];

  return (
    <View className="w-full flex-row items-center gap-3 bg-[#12242E] border border-[#1E3542] px-4 py-3.5 rounded-2xl mb-6">
      <Vibrate size={18} color="#8DA6B2" />
      <Text className="text-sm font-medium text-white flex-1">
        {config.hapticPrompt}
      </Text>
    </View>
  );
};
