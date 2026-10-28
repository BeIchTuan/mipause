/**
 * @file app/session/summary.tsx
 * @description Screen s21: Tóm tắt phiên (Focus Session Summary).
 * HTA 3.3 & HTA 5: Must have #5, Should have #2. Visual hierarchy: số liệu chính (lớn) -> nhãn (nhỏ).
 * Displays session completion status, 3 primary metrics (duration, average alertness, breaks),
 * segmented cognitive timeline progression, and personalized focus insight.
 */

import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Check, Lightbulb } from 'lucide-react-native';

import { SessionTimelineBar, TimelineLegend } from '../../components/focus/SessionTimelineBar';
import { Button } from '../../components/ui/Button';

export default function SessionSummaryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const durationText = (params.duration as string) || '1g52p';
  const averageAlertness = (params.alertness as string) || 'Khá';
  const breakCount = (params.breaks as string) || '2 lần';
  const timeRange = (params.timeRange as string) || '18/12 · 09:00 - 10:52';

  /**
   * Return to dashboard
   */
  const handleDone = () => {
    router.replace('/(tabs)');
  };

  /**
   * Navigate to History tab to inspect calendar
   */
  const handleViewHistory = () => {
    router.replace('/(tabs)/history');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#EFF3F3] px-4 justify-between pb-6">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
      >
        <View>
          {/* Header Status Icon and Title */}
          <View className="items-center mt-4 mb-6">
            <View className="w-16 h-16 rounded-full bg-[#2DB872] items-center justify-center mb-3 shadow-sm">
              <Check size={32} color="#FFFFFF" strokeWidth={3} />
            </View>
            <Text className="text-2xl font-black text-[#0D2B34] tracking-tight">
              Phiên hoàn thành
            </Text>
            <Text className="text-xs font-semibold text-[#5E7A85] mt-1">
              {timeRange}
            </Text>
          </View>

          {/* 3-Column Metrics Card: Số liệu chính (lớn) -> nhãn (nhỏ) */}
          <View className="bg-white rounded-3xl p-4 border border-[#E1EBEA] flex-row items-center justify-between shadow-sm mb-4">
            {/* Metric 1 */}
            <View className="flex-1 items-center py-1">
              <Text className="text-2xl font-black text-[#0D2B34] tracking-tight">
                {durationText}
              </Text>
              <Text className="text-[11px] font-medium text-[#5E7A85] mt-0.5">
                Thời lượng
              </Text>
            </View>

            <View className="w-[1px] h-9 bg-[#E1EBEA]" />

            {/* Metric 2 */}
            <View className="flex-1 items-center py-1">
              <Text className="text-2xl font-black text-[#0D2B34] tracking-tight">
                {averageAlertness}
              </Text>
              <Text className="text-[11px] font-medium text-[#5E7A85] mt-0.5">
                Tỉnh táo TB
              </Text>
            </View>

            <View className="w-[1px] h-9 bg-[#E1EBEA]" />

            {/* Metric 3 */}
            <View className="flex-1 items-center py-1">
              <Text className="text-2xl font-black text-[#0D2B34] tracking-tight">
                {breakCount}
              </Text>
              <Text className="text-[11px] font-medium text-[#5E7A85] mt-0.5">
                Nghỉ giải lao
              </Text>
            </View>
          </View>

          {/* Diễn biến trong phiên Card */}
          <View className="bg-white rounded-3xl p-4 border border-[#E1EBEA] shadow-sm mb-4">
            <Text className="text-sm font-bold text-[#0D2B34] mb-3">
              Diễn biến trong phiên
            </Text>

            {/* Timeline Segmented Bar */}
            <SessionTimelineBar
              height={26}
              idPrefix="summary"
              segments={[
                { state: 'alert', weight: 40 },
                { state: 'reduced', weight: 28 },
                { state: 'fatigued', weight: 18 },
                { state: 'alert', weight: 24 },
              ]}
            />

            {/* Start and End Timestamps */}
            <View className="flex-row items-center justify-between mt-2 px-1">
              <Text className="text-[11px] text-[#8DA6B2] font-semibold">09:00</Text>
              <Text className="text-[11px] text-[#8DA6B2] font-semibold">10:52</Text>
            </View>

            {/* Pattern Legend */}
            <TimelineLegend />
          </View>

          {/* Focus Insight Box */}
          <View className="bg-[#FFF8EB] border border-[#FDE68A] rounded-2xl p-4 flex-row items-center gap-3.5 mb-6">
            <View className="w-10 h-10 rounded-full bg-[#EAA01B]/20 items-center justify-center">
              <Lightbulb size={20} color="#D97706" />
            </View>
            <Text className="flex-1 text-xs text-[#0D2B34] font-medium leading-5">
              Bạn tập trung tốt nhất ở 40 phút đầu của phiên.
            </Text>
          </View>
        </View>

        {/* Bottom Actions */}
        <View className="w-full pt-2">
          <Button
            title="Xong"
            variant="primary"
            size="lg"
            onPress={handleDone}
            className="w-full py-4 rounded-2xl bg-[#EAA01B] mb-2"
            textClassName="text-[#0D2B34] font-bold text-base"
          />

          <Pressable
            onPress={handleViewHistory}
            accessibilityRole="button"
            className="py-2.5 items-center active:opacity-70"
          >
            <Text className="text-sm font-bold text-[#0D2B34] underline">
              Xem trong Nhật ký
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
