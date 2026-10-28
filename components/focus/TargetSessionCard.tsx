/**
 * @file components/focus/TargetSessionCard.tsx
 * @description Session target duration selector card with science-backed break suggestions.
 * Matches Figma s9 "Mục tiêu phiên" card element with pill capsules and lightbulb hint.
 */

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Lightbulb } from 'lucide-react-native';

export interface TargetSessionCardProps {
  /** Selected duration in minutes */
  selectedMinutes: number;
  /** Selection change event handler */
  onSelectDuration: (minutes: number) => void;
  /** Custom duration modal trigger */
  onPressCustom?: () => void;
}

const PRESET_DURATIONS = [
  { label: '30p', value: 30 },
  { label: '60p', value: 60 },
  { label: '120p', value: 120 },
];

/**
 * TargetSessionCard Component
 * @param props TargetSessionCardProps
 * @returns JSX.Element
 */
export const TargetSessionCard: React.FC<TargetSessionCardProps> = ({
  selectedMinutes,
  onSelectDuration,
  onPressCustom,
}) => {
  const isCustom = !PRESET_DURATIONS.some((p) => p.value === selectedMinutes);

  return (
    <View className="bg-white rounded-3xl p-5 border border-[#E1EBEA] shadow-sm mb-5">
      <Text className="text-base font-bold text-[#0D2B34] mb-3.5">
        Mục tiêu phiên
      </Text>

      {/* Preset Pill Buttons */}
      <View className="flex-row items-center gap-2.5">
        {PRESET_DURATIONS.map((preset) => {
          const isSelected = selectedMinutes === preset.value;
          return (
            <Pressable
              key={preset.value}
              onPress={() => onSelectDuration(preset.value)}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              className={`flex-1 py-3 rounded-full items-center justify-center border active:opacity-75 ${
                isSelected
                  ? 'bg-[#0D2B34] border-[#0D2B34]'
                  : 'bg-white border-[#CBDAD8]'
              }`}
            >
              <Text
                className={`text-sm font-bold ${
                  isSelected ? 'text-white' : 'text-[#0D2B34]'
                }`}
              >
                {preset.label}
              </Text>
            </Pressable>
          );
        })}

        {/* 'Khác' (Custom) button */}
        <Pressable
          onPress={onPressCustom}
          accessibilityRole="button"
          accessibilityState={{ selected: isCustom }}
          className={`flex-1 py-3 rounded-full items-center justify-center border active:opacity-75 ${
            isCustom
              ? 'bg-[#0D2B34] border-[#0D2B34]'
              : 'bg-white border-[#CBDAD8]'
          }`}
        >
          <Text
            className={`text-sm font-bold ${
              isCustom ? 'text-white' : 'text-[#0D2B34]'
            }`}
          >
            {isCustom ? `${selectedMinutes}p` : 'Khác'}
          </Text>
        </Pressable>
      </View>

      {/* Recommendation banner based on cognitive science */}
      <View className="flex-row items-center gap-2 mt-4 pt-3.5 border-t border-[#F0F4F4]">
        <Lightbulb size={16} color="#EAA01B" />
        <Text className="text-xs text-[#5E7A85] flex-1 leading-4">
          Gợi ý: nghỉ 5 phút sau mỗi 45–60 phút
        </Text>
      </View>
    </View>
  );
};
