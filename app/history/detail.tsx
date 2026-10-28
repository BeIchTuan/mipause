/**
 * @file app/history/detail.tsx
 * @description Screen s24: Chi tiết phiên (Focus Session Inspection).
 * HTA 3.3 & HTA 5: Must have #5, Should have #2. Visual hierarchy: số liệu chính (lớn) -> nhãn (nhỏ).
 * Displays full analytical telemetry: duration, alertness rating, break frequency,
 * 3-band cognitive trend graph, timeline alert events (rest breaks, ignored cues),
 * and session deletion capability.
 */

import React from 'react';
import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Check, X } from 'lucide-react-native';

import { CognitiveTrendMultiBandChart } from '../../components/focus/CognitiveTrendMultiBandChart';

export default function SessionDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const timeRange = (params.timeRange as string) || '18/12 · 09:00 – 10:52';

  /**
   * Confirm and delete session
   */
  const handleDeleteSession = () => {
    Alert.alert(
      'Xóa phiên này?',
      'Dữ liệu sóng não và thống kê của phiên này sẽ bị xóa vĩnh viễn khỏi thiết bị.',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Thành công', 'Đã xóa phiên khỏi nhật ký.');
            router.back();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#EFF3F3] px-4">
      {/* Top Header with Back Button */}
      <View className="py-3 mb-2">
        <View className="flex-row items-center mb-1">
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Quay lại"
            className="w-10 h-10 rounded-full bg-white border border-[#CBDAD8] items-center justify-center mr-3 active:opacity-70 shadow-sm"
          >
            <ChevronLeft size={20} color="#0D2B34" />
          </Pressable>

          <Text className="text-xl font-black text-[#0D2B34] tracking-tight">
            Chi tiết phiên
          </Text>
        </View>

        <Text className="text-xs font-semibold text-[#5E7A85] ml-13 pl-13">
          {timeRange}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* 3-Column Metrics Card: Số liệu chính (lớn) -> nhãn (nhỏ) */}
        <View className="bg-white rounded-3xl p-4 border border-[#E1EBEA] flex-row items-center justify-between shadow-sm mb-4">
          {/* Metric 1 */}
          <View className="flex-1 items-center py-1">
            <Text className="text-2xl font-black text-[#0D2B34] tracking-tight">
              1g52p
            </Text>
            <Text className="text-[11px] font-medium text-[#5E7A85] mt-0.5">
              Thời lượng
            </Text>
          </View>

          <View className="w-[1px] h-9 bg-[#E1EBEA]" />

          {/* Metric 2 */}
          <View className="flex-1 items-center py-1">
            <Text className="text-2xl font-black text-[#0D2B34] tracking-tight">
              Khá
            </Text>
            <Text className="text-[11px] font-medium text-[#5E7A85] mt-0.5">
              Tỉnh táo TB
            </Text>
          </View>

          <View className="w-[1px] h-9 bg-[#E1EBEA]" />

          {/* Metric 3 */}
          <View className="flex-1 items-center py-1">
            <Text className="text-2xl font-black text-[#0D2B34] tracking-tight">
              2 lần
            </Text>
            <Text className="text-[11px] font-medium text-[#5E7A85] mt-0.5">
              Nghỉ
            </Text>
          </View>
        </View>

        {/* Multi-Band Alertness Chart */}
        <CognitiveTrendMultiBandChart />

        {/* Mốc cảnh báo Card */}
        <View className="bg-white rounded-3xl p-5 border border-[#E1EBEA] shadow-sm mb-6">
          <Text className="text-sm font-bold text-[#0D2B34] mb-3.5">
            Mốc cảnh báo
          </Text>

          {/* Alert Item 1: Took break */}
          <View className="flex-row items-center gap-3 py-2 border-b border-[#F0F4F4]">
            <View className="w-6 h-6 rounded-full bg-[#2DB872] items-center justify-center">
              <Check size={14} color="#FFFFFF" strokeWidth={3} />
            </View>
            <Text className="text-xs font-semibold text-[#0D2B34]">
              09:48 · nghỉ 5 phút
            </Text>
          </View>

          {/* Alert Item 2: Ignored warning */}
          <View className="flex-row items-center gap-3 py-2 pt-3">
            <View className="w-6 h-6 rounded-full bg-[#8DA6B2] items-center justify-center">
              <X size={14} color="#FFFFFF" strokeWidth={3} />
            </View>
            <Text className="text-xs font-semibold text-[#5E7A85]">
              10:20 · đã bỏ qua
            </Text>
          </View>
        </View>

        {/* Delete Session Danger Action */}
        <Pressable
          onPress={handleDeleteSession}
          accessibilityRole="button"
          accessibilityLabel="Xóa phiên này"
          className="py-3 items-center active:opacity-70"
        >
          <Text className="text-sm font-bold text-[#E06D53]">
            Xóa phiên này
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
