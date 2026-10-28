/**
 * @file app/history/day.tsx
 * @description Screen s23: Phiên trong ngày (Daily Sessions Breakdown).
 * HTA 3.3 & HTA 5: Must have #5, Should have #2. Visual hierarchy: số liệu chính (lớn) -> nhãn (nhỏ).
 * Lists all focus sessions conducted on the chosen date with timestamps,
 * cognitive state pills, segmented timeline progressions, and total daily duration.
 */

import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Clock } from 'lucide-react-native';

import { SessionTimelineBar, TimelineSegment } from '../../components/focus/SessionTimelineBar';

interface DaySessionItem {
  id: string;
  timeRange: string;
  duration: string;
  alertnessLabel: string;
  alertnessType: 'good' | 'fair' | 'poor';
  segments: TimelineSegment[];
}

const MOCK_DAY_SESSIONS: DaySessionItem[] = [
  {
    id: 'sess-01',
    timeRange: '09:00 – 10:52',
    duration: '1g 52p',
    alertnessLabel: 'Khá',
    alertnessType: 'fair',
    segments: [
      { state: 'alert', weight: 40 },
      { state: 'reduced', weight: 30 },
      { state: 'fatigued', weight: 20 },
      { state: 'alert', weight: 22 },
    ],
  },
  {
    id: 'sess-02',
    timeRange: '13:30 – 14:20',
    duration: '50p',
    alertnessLabel: 'Tốt',
    alertnessType: 'good',
    segments: [
      { state: 'alert', weight: 35 },
      { state: 'reduced', weight: 15 },
    ],
  },
  {
    id: 'sess-03',
    timeRange: '16:00 – 16:28',
    duration: '28p',
    alertnessLabel: 'Thấp',
    alertnessType: 'poor',
    segments: [
      { state: 'alert', weight: 10 },
      { state: 'reduced', weight: 10 },
      { state: 'fatigued', weight: 8 },
    ],
  },
];

export default function DaySessionsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const day = params.day || 18;
  const month = params.month || 12;

  /**
   * Navigate to s24 Chi tiết phiên
   */
  const handleOpenDetail = (sessionId: string) => {
    router.push({
      pathname: '/history/detail',
      params: { sessionId, date: `${day}/${month}` },
    });
  };

  /**
   * Render alertness badge matching status
   */
  const renderAlertnessBadge = (label: string, type: 'good' | 'fair' | 'poor') => {
    let containerStyle = 'bg-[#E6F8EF] border-[#A7F3D0]';
    let textStyle = 'text-[#2DB872]';
    let dotColor = '#2DB872';

    if (type === 'fair') {
      containerStyle = 'bg-[#E6F8EF] border-[#A7F3D0]';
      textStyle = 'text-[#2DB872]';
      dotColor = '#2DB872';
    } else if (type === 'poor') {
      containerStyle = 'bg-[#FDF0ED] border-[#FED7AA]';
      textStyle = 'text-[#E06D53]';
      dotColor = '#E06D53';
    }

    return (
      <View className={`flex-row items-center px-2 py-0.5 rounded-full border ${containerStyle}`}>
        <View className="w-1.5 h-1.5 rounded-full mr-1.5" style={{ backgroundColor: dotColor }} />
        <Text className={`text-xs font-semibold ${textStyle}`}>{label}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#EFF3F3] px-4">
      {/* Top Header with Back Button */}
      <View className="flex-row items-center py-3 mb-2">
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Quay lại"
          className="w-10 h-10 rounded-full bg-white border border-[#CBDAD8] items-center justify-center mr-3 active:opacity-70 shadow-sm"
        >
          <ChevronLeft size={20} color="#0D2B34" />
        </Pressable>

        <Text className="text-xl font-black text-[#0D2B34] tracking-tight">
          Thứ Năm, {day}/{month}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Sessions list */}
        {MOCK_DAY_SESSIONS.map((session) => (
          <Pressable
            key={session.id}
            onPress={() => handleOpenDetail(session.id)}
            accessibilityRole="button"
            accessibilityLabel={`Phiên ${session.timeRange}, thời lượng ${session.duration}`}
            className="bg-white rounded-2xl p-4 border border-[#E1EBEA] shadow-sm mb-3.5 active:opacity-80"
          >
            {/* Row 1: Time range & duration badge */}
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-base font-black text-[#0D2B34]">
                {session.timeRange}
              </Text>
              <View className="bg-[#EFF5F5] px-2.5 py-0.5 rounded-full border border-[#E1EBEA]">
                <Text className="text-xs font-bold text-[#0D2B34]">
                  {session.duration}
                </Text>
              </View>
            </View>

            {/* Row 2: Average Alertness Pill */}
            <View className="flex-row items-center gap-2 mb-3">
              <Text className="text-xs text-[#5E7A85] font-medium">Tỉnh táo TB</Text>
              {renderAlertnessBadge(session.alertnessLabel, session.alertnessType)}
            </View>

            {/* Row 3: Timeline segmented bar */}
            <SessionTimelineBar
              height={14}
              idPrefix={session.id}
              segments={session.segments}
            />
          </Pressable>
        ))}

        {/* Daily Total Summary Info */}
        <View className="flex-row items-center gap-2 mt-2 px-1">
          <Clock size={16} color="#5E7A85" />
          <Text className="text-xs font-semibold text-[#5E7A85]">
            Tổng trong ngày: 3g 10p
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
