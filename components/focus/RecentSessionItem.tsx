/**
 * @file components/focus/RecentSessionItem.tsx
 * @description FlatList render item for recent sessions on Home Screen (s9).
 * Displays session timestamp, duration, and green dot badge matching Figma.
 */

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { FocusSession } from '../../types/focus';

export interface RecentSessionItemProps {
  session: FocusSession;
  onPress: (session: FocusSession) => void;
}

/**
 * RecentSessionItem Component
 * @param props RecentSessionItemProps
 * @returns JSX.Element
 */
export const RecentSessionItem: React.FC<RecentSessionItemProps> = ({ session, onPress }) => {
  return (
    <Pressable
      onPress={() => onPress(session)}
      accessibilityRole="button"
      accessibilityLabel={`Phiên ${session.dateLabel}`}
      className="flex-row items-center justify-between p-4 bg-white border border-[#E1EBEA] rounded-2xl mb-2.5 active:opacity-75 shadow-sm"
    >
      {/* Session Title & Subtext */}
      <View className="flex-1 mr-3">
        <Text className="text-sm font-bold text-[#0D2B34] mb-0.5">
          {session.dateLabel}
        </Text>
        <Text className="text-xs text-[#5E7A85]">
          Tỉnh táo trung bình
        </Text>
      </View>

      {/* Quality Badge */}
      <View className="flex-row items-center px-2.5 py-1 rounded-full bg-[#E6F8EF]">
        <View className="w-1.5 h-1.5 rounded-full bg-[#2DB872] mr-1.5" />
        <Text className="text-xs font-bold text-[#2DB872]">
          Tốt
        </Text>
      </View>
    </Pressable>
  );
};
