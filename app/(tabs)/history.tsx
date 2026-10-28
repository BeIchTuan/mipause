/**
 * @file app/(tabs)/history.tsx
 * @description Screen s22: Nhật ký dạng lịch (Calendar History Tab).
 * HTA 3.3 & HTA 5: Must have #5, Should have #2. Visual hierarchy: số liệu chính (lớn) -> nhãn (nhỏ).
 * Interactive monthly calendar for December 2026 with session activity dots,
 * day selector, and summary card navigating to daily breakdown (s23).
 */

import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

export default function HistoryScreen() {
  const router = useRouter();

  // Selected date state (defaults to 18 matching Figma s22)
  const [selectedDay, setSelectedDay] = useState<number>(18);
  const [currentMonth] = useState<string>('Tháng 12, 2026');

  // Days with recorded sessions in December 2026 (matching Figma design dots)
  const sessionDays = [2, 3, 4, 9, 10, 16, 17, 18, 22, 23];

  /**
   * Calendar grid definition for December 2026:
   * 1st of December 2026 is Tuesday.
   * Days of week: T2 (Mon), T3 (Tue), T4 (Wed), T5 (Thu), T6 (Fri), T7 (Sat), CN (Sun).
   * Total days = 31.
   */
  const weekDays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  const startDayOffset = 1; // Tuesday is index 1
  const totalDays = 31;

  // Build calendar cells array (42 slots for 6 rows of 7)
  const calendarCells: (number | null)[] = [];
  for (let i = 0; i < startDayOffset; i++) {
    calendarCells.push(null);
  }
  for (let day = 1; day <= totalDays; day++) {
    calendarCells.push(day);
  }
  while (calendarCells.length % 7 !== 0) {
    calendarCells.push(null);
  }

  /**
   * Navigate to s23 Phiên trong ngày
   */
  const handleOpenDayDetail = () => {
    router.push({
      pathname: '/history/day',
      params: { day: selectedDay, month: 12, year: 2026 },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#EFF3F3] px-4">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Screen Header */}
        <Text className="text-2xl font-black text-[#0D2B34] mt-3 mb-4 tracking-tight">
          Nhật ký
        </Text>

        {/* Calendar Card (Figma s22) */}
        <View className="bg-white rounded-3xl p-5 border border-[#E1EBEA] shadow-sm mb-5">
          {/* Month Navigation Row */}
          <View className="flex-row items-center justify-between mb-4">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Tháng trước"
              className="w-9 h-9 rounded-full bg-[#EFF5F5] items-center justify-center active:opacity-70"
            >
              <ChevronLeft size={18} color="#0D2B34" />
            </Pressable>

            <Text className="text-base font-bold text-[#0D2B34]">
              {currentMonth}
            </Text>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Tháng sau"
              className="w-9 h-9 rounded-full bg-[#EFF5F5] items-center justify-center active:opacity-70"
            >
              <ChevronRight size={18} color="#0D2B34" />
            </Pressable>
          </View>

          {/* Weekday Column Headers */}
          <View className="flex-row items-center justify-between mb-2">
            {weekDays.map((wd) => (
              <View key={wd} className="w-10 items-center">
                <Text className="text-xs font-semibold text-[#8DA6B2]">{wd}</Text>
              </View>
            ))}
          </View>

          {/* Calendar Grid of Dates */}
          <View className="flex-row flex-wrap justify-between">
            {calendarCells.map((day, index) => {
              if (day === null) {
                return <View key={`empty-${index}`} className="w-10 h-11" />;
              }

              const isSelected = day === selectedDay;
              const hasSession = sessionDays.includes(day);

              return (
                <Pressable
                  key={`day-${day}`}
                  onPress={() => setSelectedDay(day)}
                  accessibilityRole="button"
                  accessibilityLabel={`Ngày ${day}`}
                  className="w-10 h-11 items-center justify-center relative active:opacity-70 my-0.5"
                >
                  <View
                    className={`w-9 h-9 rounded-full items-center justify-center ${
                      isSelected ? 'bg-[#0D2B34]' : ''
                    }`}
                  >
                    <Text
                      className={`text-sm font-semibold ${
                        isSelected
                          ? 'text-white font-bold'
                          : 'text-[#0D2B34]'
                      }`}
                    >
                      {day}
                    </Text>

                    {/* Activity Indicator Dot */}
                    {hasSession && (
                      <View
                        className={`w-1.5 h-1.5 rounded-full absolute -bottom-0.5 ${
                          isSelected ? 'bg-[#EAA01B]' : 'bg-[#0D9488]'
                        }`}
                      />
                    )}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Selected Day Section */}
        <Text className="text-base font-bold text-[#0D2B34] mb-2.5">
          Thứ Năm, {selectedDay}/12
        </Text>

        {/* Day Summary Card (Navigates to s23 Phiên trong ngày) */}
        <Pressable
          onPress={handleOpenDayDetail}
          accessibilityRole="button"
          accessibilityLabel="Xem chi tiết các phiên trong ngày"
          className="bg-white rounded-2xl p-4 border border-[#E1EBEA] shadow-sm flex-row items-center justify-between active:opacity-75"
        >
          <View>
            <Text className="text-base font-black text-[#0D2B34]">
              3 phiên · 3g 10p
            </Text>
            <Text className="text-xs font-semibold text-[#5E7A85] mt-1">
              Tỉnh táo TB: Khá
            </Text>
          </View>

          <ChevronRight size={20} color="#8DA6B2" />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
