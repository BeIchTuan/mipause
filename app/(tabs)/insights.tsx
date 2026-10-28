/**
 * @file app/(tabs)/insights.tsx
 * @description Screens s29 & s31: Insights nhận thức (Free vs Pro Tier Analytics).
 * HTA 8: Must have #8, Should have #6. Persona Duy (thống kê sâu) & Mai (so sánh giá trị nâng cấp).
 * Supports both Free tier (daily average bar chart, locked Pro teaser cards)
 * and Pro tier (peak cognitive hours timeline, 30-day upward trendline, Smart Scheduling modal trigger).
 */

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Lock, Lightbulb } from 'lucide-react-native';
import Svg, { Rect, Path, Defs, LinearGradient, Stop, Circle, Pattern, Line } from 'react-native-svg';

import { SmartScheduleModal } from '../../components/focus/SmartScheduleModal';

export default function InsightsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Tier toggle state: Free (s29) vs Pro (s31)
  const [isPro, setIsPro] = useState<boolean>(false);

  // Time filter toggle for Pro view: 'day' | 'month'
  const [timeFilter, setTimeFilter] = useState<'day' | 'month'>('day');

  // Smart Scheduling Modal (s32)
  const [isSmartScheduleVisible, setIsSmartScheduleVisible] = useState<boolean>(false);

  // Synchronize Pro activation if routed from s30
  useEffect(() => {
    if (params.isProActive === 'true') {
      setIsPro(true);
    }
  }, [params.isProActive]);

  /**
   * Navigate to s30 Upsell Screen
   */
  const handleOpenUpgradePro = () => {
    router.push('/insights/upgrade-pro');
  };

  /**
   * Bar Chart for Free tier (s29): Tỉnh táo trung bình mỗi ngày
   */
  const renderWeeklyBarChart = () => {
    const days = [
      { label: 'T2', heightPct: 45, isPeak: false },
      { label: 'T3', heightPct: 62, isPeak: false },
      { label: 'T4', heightPct: 52, isPeak: false },
      { label: 'T5', heightPct: 96, isPeak: true }, // Thursday is the peak day matching Figma
      { label: 'T6', heightPct: 70, isPeak: false },
      { label: 'T7', heightPct: 38, isPeak: false },
      { label: 'CN', heightPct: 32, isPeak: false },
    ];

    return (
      <View className="bg-white rounded-3xl p-5 border border-[#E1EBEA] shadow-sm mb-4">
        <Text className="text-sm font-bold text-[#0D2B34] mb-4">
          Tỉnh táo trung bình mỗi ngày
        </Text>

        {/* 7 Columns Bar Chart */}
        <View className="h-40 flex-row items-end justify-between px-2 pt-4 pb-2 border-b border-[#F0F4F4]">
          {days.map((item) => (
            <View key={item.label} className="items-center w-8">
              <View
                className={`w-4 rounded-full ${
                  item.isPeak ? 'bg-[#0D2B34]' : 'bg-[#CCE1DE]'
                }`}
                style={{ height: `${item.heightPct}%` }}
              />
              <Text
                className={`text-xs mt-2 font-semibold ${
                  item.isPeak ? 'text-[#0D2B34] font-black' : 'text-[#8DA6B2]'
                }`}
              >
                {item.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Highlight Callout */}
        <View className="flex-row items-center gap-2.5 mt-3.5 px-1">
          <View className="w-5 h-5 rounded-full bg-[#FFF8EB] items-center justify-center">
            <Lightbulb size={13} color="#D97706" />
          </View>
          <Text className="text-xs font-medium text-[#0D2B34]">
            Thứ Năm là ngày bạn tập trung tốt nhất
          </Text>
        </View>
      </View>
    );
  };

  /**
   * Peak Cognitive Hours Visual Timeline for Pro tier (s31)
   */
  const renderPeakHoursCard = () => {
    return (
      <View className="bg-white rounded-3xl p-5 border border-[#E1EBEA] shadow-sm mb-4">
        <Text className="text-sm font-bold text-[#0D2B34] mb-2.5">
          Khung giờ tập trung đỉnh
        </Text>

        {/* Sub-legend pills */}
        <View className="flex-row items-center gap-3 mb-4">
          <View className="flex-row items-center bg-[#FFF8EB] border border-[#FDE68A] px-2.5 py-0.5 rounded-full">
            <View className="w-2 h-2 rounded-full bg-[#EAA01B] mr-1.5" />
            <Text className="text-xs font-bold text-[#D97706]">Đỉnh 9–11h</Text>
          </View>

          <View className="flex-row items-center bg-[#F1F5F7] border border-[#CBDAD8] px-2.5 py-0.5 rounded-full">
            <Text className="text-xs font-semibold text-[#5E7A85]">Giảm sau 14h</Text>
          </View>
        </View>

        {/* Visual timeline bar */}
        <View className="w-full h-11 rounded-2xl overflow-hidden border border-[#E1EBEA]">
          <Svg width="100%" height={44} viewBox="0 0 300 44" preserveAspectRatio="none">
            <Defs>
              {/* Pattern for after 14h drop */}
              <Pattern
                id="afternoonDrop"
                width="8"
                height="8"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <Rect width="8" height="8" fill="#F1F5F7" />
                <Line x1="0" y1="0" x2="0" y2="8" stroke="#CBDAD8" strokeWidth="2" />
              </Pattern>
            </Defs>

            {/* 6h - 9h: Light Teal */}
            <Rect x="0" y="0" width="55" height="44" fill="#E6F4F1" />

            {/* 9h - 11h: Highlighted Golden Amber */}
            <Rect x="55" y="0" width="60" height="44" fill="#EAA01B" />

            {/* 11h - 14h: Light Teal */}
            <Rect x="115" y="0" width="50" height="44" fill="#E6F4F1" />

            {/* 14h - 22h: Striped pattern */}
            <Rect x="165" y="0" width="135" height="44" fill="url(#afternoonDrop)" />
          </Svg>
        </View>

        {/* Time labels row */}
        <View className="flex-row items-center justify-between mt-2 px-1">
          <Text className="text-[11px] font-semibold text-[#8DA6B2]">6h</Text>
          <Text className="text-[11px] font-semibold text-[#8DA6B2]">10h</Text>
          <Text className="text-[11px] font-semibold text-[#8DA6B2]">14h</Text>
          <Text className="text-[11px] font-semibold text-[#8DA6B2]">18h</Text>
          <Text className="text-[11px] font-semibold text-[#8DA6B2]">22h</Text>
        </View>
      </View>
    );
  };

  /**
   * 30-Day Focus Trendline Graph for Pro tier (s31)
   */
  const renderTrendlineCard = () => {
    return (
      <View className="bg-white rounded-3xl p-5 border border-[#E1EBEA] shadow-sm mb-4">
        <Text className="text-sm font-bold text-[#0D2B34] mb-3">
          Xu hướng 30 ngày
        </Text>

        <View className="h-28 w-full overflow-hidden">
          <Svg width="100%" height={112} viewBox="0 0 300 112" preserveAspectRatio="none">
            <Defs>
              <LinearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0%" stopColor="#CCE1DE" stopOpacity="0.4" />
                <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
              </LinearGradient>
            </Defs>

            {/* Fill gradient area */}
            <Path
              d="M 10 70 C 50 68, 80 72, 120 60 C 160 52, 200 62, 240 54 C 270 48, 285 45, 290 40 L 290 112 L 10 112 Z"
              fill="url(#trendGradient)"
            />

            {/* Continuous curve */}
            <Path
              d="M 10 70 C 50 68, 80 72, 120 60 C 160 52, 200 62, 240 54 C 270 48, 285 45, 290 40"
              fill="none"
              stroke="#0D2B34"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Peak endpoint dot */}
            <Circle
              cx="290"
              cy="40"
              r="4.5"
              fill="#EAA01B"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
          </Svg>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#EFF3F3] px-4">
      {/* Top Demo Tier Switcher (allows reviewer to test both s29 Free & s31 Pro) */}
      <View className="flex-row items-center justify-between mt-2 mb-3 bg-[#E1EBEA] rounded-xl p-1">
        <Pressable
          onPress={() => setIsPro(false)}
          className={`flex-1 py-1.5 items-center rounded-lg ${
            !isPro ? 'bg-white shadow-sm' : ''
          }`}
        >
          <Text
            className={`text-xs font-bold ${
              !isPro ? 'text-[#0D2B34]' : 'text-[#5E7A85]'
            }`}
          >
            Bản miễn phí (s29)
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setIsPro(true)}
          className={`flex-1 py-1.5 items-center rounded-lg ${
            isPro ? 'bg-[#0D2B34] shadow-sm' : ''
          }`}
        >
          <Text
            className={`text-xs font-bold ${
              isPro ? 'text-white' : 'text-[#5E7A85]'
            }`}
          >
            Bản Pro (s31)
          </Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 36 }}>
        {/* Header Row */}
        <View className="flex-row items-center mb-1">
          <Text className="text-2xl font-black text-[#0D2B34] tracking-tight">
            Insights
          </Text>
          {isPro && (
            <View className="bg-[#EAA01B] px-2.5 py-0.5 rounded-full ml-2">
              <Text className="text-[10px] font-black text-[#0D2B34]">PRO</Text>
            </View>
          )}
        </View>

        {!isPro && (
          <Text className="text-xs font-semibold text-[#5E7A85] mb-4">
            Tuần này · bản miễn phí
          </Text>
        )}

        {/* ----------------- S29 FREE TIER CONTENT ----------------- */}
        {!isPro && (
          <View>
            {/* Daily Alertness Bar Chart */}
            {renderWeeklyBarChart()}

            {/* Locked Pro Feature 1: Giờ tập trung đỉnh */}
            <Pressable
              onPress={handleOpenUpgradePro}
              accessibilityRole="button"
              accessibilityLabel="Mở khóa giờ tập trung đỉnh trong Pro"
              className="bg-white rounded-2xl p-4 border border-dashed border-[#CBDAD8] flex-row items-center justify-between shadow-sm mb-3 active:opacity-75"
            >
              <View className="flex-row items-center gap-3">
                <View className="w-9 h-9 rounded-xl bg-[#EFF5F5] items-center justify-center">
                  <Lock size={18} color="#0D2B34" />
                </View>
                <View>
                  <Text className="text-sm font-bold text-[#0D2B34]">
                    Giờ tập trung đỉnh
                  </Text>
                  <Text className="text-xs text-[#8DA6B2] mt-0.5">
                    Chỉ có trong Pro
                  </Text>
                </View>
              </View>

              <View className="bg-[#FFF8EB] border border-[#FDE68A] px-2.5 py-0.5 rounded-full">
                <Text className="text-[10px] font-bold text-[#D97706]">Pro</Text>
              </View>
            </Pressable>

            {/* Locked Pro Feature 2: Gợi ý huấn luyện */}
            <Pressable
              onPress={handleOpenUpgradePro}
              accessibilityRole="button"
              accessibilityLabel="Mở khóa gợi ý huấn luyện trong Pro"
              className="bg-white rounded-2xl p-4 border border-dashed border-[#CBDAD8] flex-row items-center justify-between shadow-sm mb-6 active:opacity-75"
            >
              <View className="flex-row items-center gap-3">
                <View className="w-9 h-9 rounded-xl bg-[#EFF5F5] items-center justify-center">
                  <Lock size={18} color="#0D2B34" />
                </View>
                <View>
                  <Text className="text-sm font-bold text-[#0D2B34]">
                    Gợi ý huấn luyện
                  </Text>
                  <Text className="text-xs text-[#8DA6B2] mt-0.5">
                    Chỉ có trong Pro
                  </Text>
                </View>
              </View>

              <View className="bg-[#FFF8EB] border border-[#FDE68A] px-2.5 py-0.5 rounded-full">
                <Text className="text-[10px] font-bold text-[#D97706]">Pro</Text>
              </View>
            </Pressable>

            {/* CTA Button: Dùng thử Focus Insights Pro */}
            <Pressable
              onPress={handleOpenUpgradePro}
              accessibilityRole="button"
              accessibilityLabel="Dùng thử Focus Insights Pro"
              className="w-full py-4 rounded-2xl bg-[#EAA01B] items-center justify-center active:opacity-85 shadow-sm"
            >
              <Text className="text-base font-bold text-[#0D2B34]">
                Dùng thử Focus Insights Pro
              </Text>
            </Pressable>
          </View>
        )}

        {/* ----------------- S31 PRO TIER CONTENT ----------------- */}
        {isPro && (
          <View>
            {/* Segmented Filter: Ngày vs Tháng */}
            <View className="flex-row items-center bg-white rounded-full p-1 mb-4 border border-[#E1EBEA] shadow-sm">
              <Pressable
                onPress={() => setTimeFilter('day')}
                className={`flex-1 py-1.5 items-center rounded-full ${
                  timeFilter === 'day' ? 'bg-[#0D2B34]' : ''
                }`}
              >
                <Text
                  className={`text-xs font-bold ${
                    timeFilter === 'day' ? 'text-white' : 'text-[#5E7A85]'
                  }`}
                >
                  Ngày
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setTimeFilter('month')}
                className={`flex-1 py-1.5 items-center rounded-full ${
                  timeFilter === 'month' ? 'bg-[#0D2B34]' : ''
                }`}
              >
                <Text
                  className={`text-xs font-bold ${
                    timeFilter === 'month' ? 'text-white' : 'text-[#5E7A85]'
                  }`}
                >
                  Tháng
                </Text>
              </Pressable>
            </View>

            {/* Card: Khung giờ tập trung đỉnh */}
            {renderPeakHoursCard()}

            {/* Card: Xu hướng 30 ngày */}
            {renderTrendlineCard()}

            {/* Smart Action Tip */}
            <View className="bg-[#FFF8EB] border border-[#FDE68A] rounded-2xl p-4 flex-row items-center gap-3.5 mb-5 shadow-sm">
              <View className="w-9 h-9 rounded-full bg-[#EAA01B]/20 items-center justify-center">
                <Lightbulb size={18} color="#D97706" />
              </View>
              <Text className="flex-1 text-xs text-[#0D2B34] font-medium leading-5">
                Đặt việc khó vào 9–11h, họp & email sau 14h.
              </Text>
            </View>

            {/* Action Button: Lên lịch thông minh (Triggers s32 Bottom Sheet) */}
            <Pressable
              onPress={() => setIsSmartScheduleVisible(true)}
              accessibilityRole="button"
              accessibilityLabel="Lên lịch thông minh"
              className="w-full py-4 rounded-2xl bg-white border border-[#0D2B34] items-center justify-center active:opacity-75 shadow-sm"
            >
              <Text className="text-base font-bold text-[#0D2B34]">
                Lên lịch thông minh
              </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>

      {/* Screen s32: Bottom Sheet Lên lịch thông minh & Xuất báo cáo */}
      <SmartScheduleModal
        visible={isSmartScheduleVisible}
        onClose={() => setIsSmartScheduleVisible(false)}
      />
    </SafeAreaView>
  );
}
