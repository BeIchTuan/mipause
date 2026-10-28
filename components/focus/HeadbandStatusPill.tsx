/**
 * @file components/focus/HeadbandStatusPill.tsx
 * @description Displays real-time BLE headband connection status.
 * Directly maps to Figma's "● Headband đã kết nối" pill in s9, s11, and s12.
 */

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { HeadbandDevice } from '../../types/focus';

export interface HeadbandStatusPillProps {
  device: HeadbandDevice;
  onPress?: () => void;
  /** When true, formats styling for dark mode focus session (s11/s12) */
  isDarkTheme?: boolean;
}

/**
 * HeadbandStatusPill Component
 * @param props HeadbandStatusPillProps
 * @returns JSX.Element
 */
export const HeadbandStatusPill: React.FC<HeadbandStatusPillProps> = ({
  device,
  onPress,
  isDarkTheme = false,
}) => {
  const isConnected = device.isConnected;

  if (isDarkTheme) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`Trạng thái headband: ${isConnected ? 'Đã kết nối' : 'Chưa kết nối'}`}
        className="flex-row items-center px-3.5 py-1.5 rounded-full bg-[#152B35] border border-[#1E3845] active:opacity-75"
      >
        <View
          className={`w-2 h-2 rounded-full mr-2 ${
            isConnected ? 'bg-[#2DB872]' : 'bg-[#94A3B8]'
          }`}
        />
        <Text className="text-xs font-semibold text-white">
          {isConnected ? 'Headband đã kết nối' : 'Mất tín hiệu headband'}
        </Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Trạng thái headband: ${isConnected ? 'Đã kết nối' : 'Chưa kết nối'}`}
      className="flex-row items-center px-3.5 py-1.5 rounded-full bg-[#D8EAE6] self-start active:opacity-75"
    >
      <View
        className={`w-2 h-2 rounded-full mr-2 ${
          isConnected ? 'bg-[#2DB872]' : 'bg-[#94A3B8]'
        }`}
      />
      <Text className="text-xs font-semibold text-[#0D2B34]">
        {isConnected ? 'Headband đã kết nối' : 'Chưa kết nối headband'}
      </Text>
    </Pressable>
  );
};
