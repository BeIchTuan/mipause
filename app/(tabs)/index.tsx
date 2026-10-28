/**
 * @file app/(tabs)/index.tsx
 * @description Main Dashboard screen (Figma s9: Trang chính).
 * Displays headband status, target focus selector, CTA, and recent focus history.
 * Tuned pixel-perfect to Figma design colors (#EFF3F3, #0D2B34, #EAA01B).
 */

import React, { useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { HeadbandStatusPill } from '../../components/focus/HeadbandStatusPill';
import { TargetSessionCard } from '../../components/focus/TargetSessionCard';
import { RecentSessionItem } from '../../components/focus/RecentSessionItem';
import { Button } from '../../components/ui/Button';
import {
  MOCK_HEADBAND,
  MOCK_RECENT_SESSIONS,
} from '../../mocks/focusMockData';
import { FocusSession } from '../../types/focus';

/**
 * HomeScreen Component (s9 · Trang chính)
 * @returns JSX.Element
 */
export default function HomeScreen() {
  const router = useRouter();
  const [selectedDuration, setSelectedDuration] = useState<number>(120);
  const [headband, setHeadband] = useState(MOCK_HEADBAND);
  const [recentSessions] = useState<FocusSession[]>(MOCK_RECENT_SESSIONS);

  /**
   * Navigate to the active focus session with selected parameters
   */
  const handleStartSession = () => {
    router.push({
      pathname: '/session/active',
      params: { durationMinutes: selectedDuration },
    });
  };

  /**
   * Open session setup customizer (s10)
   */
  const handleOpenSetup = () => {
    router.push('/session/setup');
  };

  /**
   * Header component for FlatList to enable smooth scrolling of the whole page
   */
  const renderListHeader = () => (
    <View className="mb-4">
      {/* Top Greeting Bar */}
      <View className="flex-row items-center justify-between mt-2 mb-3">
        <View>
          <Text className="text-xs font-semibold text-[#5E7A85]">
            Thứ Năm, 18 tháng 12
          </Text>
          <Text className="text-2xl font-black text-[#0D2B34] mt-0.5 tracking-tight">
            Chào buổi sáng, Mai
          </Text>
        </View>

        {/* User Profile Avatar */}
        <Pressable
          onPress={() => router.push('/(tabs)/settings')}
          accessibilityRole="button"
          accessibilityLabel="Trang cá nhân"
          className="w-10 h-10 rounded-full bg-[#CCE1DE] items-center justify-center active:opacity-70"
        >
          <Text className="text-sm font-bold text-[#0D2B34]">
            M
          </Text>
        </Pressable>
      </View>

      {/* Headband Connection Status Badge */}
      <View className="mb-5">
        <HeadbandStatusPill
          device={headband}
          onPress={() => {
            // Toggle demo connection state
            setHeadband((prev) => ({ ...prev, isConnected: !prev.isConnected }));
          }}
        />
      </View>

      {/* Target Focus Duration Card */}
      <TargetSessionCard
        selectedMinutes={selectedDuration}
        onSelectDuration={setSelectedDuration}
        onPressCustom={handleOpenSetup}
      />

      {/* Main Call to Action Button */}
      <Button
        title="Bắt đầu phiên tập trung"
        variant="primary"
        size="lg"
        onPress={handleStartSession}
        className="w-full mb-6 py-4 rounded-2xl bg-[#EAA01B]"
        textClassName="text-[#0D2B34] font-bold text-base"
      />

      {/* Recent Sessions Section Header */}
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-base font-bold text-[#0D2B34]">
          Gần đây
        </Text>
        <Pressable
          onPress={() => router.push('/(tabs)/history')}
          accessibilityRole="button"
          className="active:opacity-70"
        >
          <Text className="text-xs font-bold text-[#0D2B34] underline">
            Xem tất cả
          </Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#EFF3F3] px-4">
      <FlatList
        data={recentSessions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RecentSessionItem
            session={item}
            onPress={() => {
              router.push({
                pathname: '/history/detail',
                params: {
                  sessionId: item.id,
                  timeRange: item.dateLabel,
                },
              });
            }}
          />
        )}
        ListHeaderComponent={renderListHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </SafeAreaView>
  );
}
