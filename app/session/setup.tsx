/**
 * @file app/session/setup.tsx
 * @description Screen s10: Thiết lập phiên (Configure Focus Session).
 * Allows fine-tuning duration, adaptive EEG alerts, and focus shield settings.
 * Tuned pixel-perfect to Figma design (#EFF3F3, #0D2B34, #EAA01B).
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, Minus, Plus } from 'lucide-react-native';

import { Button } from '../../components/ui/Button';
import { SwitchRow } from '../../components/ui/Switch';
import { AlertSensitivity } from '../../types/focus';

export default function SessionSetupScreen() {
  const router = useRouter();

  // State
  const [durationMinutes, setDurationMinutes] = useState<number>(120);
  const [isAdaptiveBreak, setIsAdaptiveBreak] = useState<boolean>(true);
  const [isFocusShield, setIsFocusShield] = useState<boolean>(true);
  const [isComfortReminder, setIsComfortReminder] = useState<boolean>(true);
  const [sensitivity, setSensitivity] = useState<AlertSensitivity>('medium');

  /**
   * Adjust duration by 15-minute increments
   */
  const handleAdjustDuration = (delta: number) => {
    setDurationMinutes((prev) => Math.max(15, Math.min(360, prev + delta)));
  };

  /**
   * Format minutes to human string "2g 00p"
   */
  const formatDurationDisplay = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    return `${hours}g ${mins < 10 ? '0' : ''}${mins}p`;
  };

  /**
   * Start focus session with configured settings
   */
  const handleStart = () => {
    router.push({
      pathname: '/session/active',
      params: {
        durationMinutes,
        isAdaptiveBreak: String(isAdaptiveBreak),
        isFocusShield: String(isFocusShield),
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#EFF3F3] px-4">
      {/* Top Header */}
      <View className="flex-row items-center py-3 mb-2">
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Quay lại"
          className="w-10 h-10 rounded-full bg-white border border-[#CBDAD8] items-center justify-center mr-3 active:opacity-70"
        >
          <ChevronLeft size={20} color="#0D2B34" />
        </Pressable>
        <Text className="text-xl font-black text-[#0D2B34]">
          Thiết lập phiên
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Card 1: Time Target Counter */}
        <View className="bg-white rounded-3xl p-5 border border-[#E1EBEA] mb-4 items-center shadow-sm">
          <Text className="text-xs font-bold text-[#5E7A85] uppercase tracking-wider mb-4">
            Mục tiêu thời gian
          </Text>

          <View className="flex-row items-center justify-between w-full px-4">
            <Pressable
              onPress={() => handleAdjustDuration(-15)}
              accessibilityRole="button"
              className="w-12 h-12 rounded-full bg-[#EFF3F3] items-center justify-center active:opacity-70"
            >
              <Minus size={22} color="#0D2B34" />
            </Pressable>

            <Text className="text-4xl font-black text-[#0D2B34] tracking-tight">
              {formatDurationDisplay(durationMinutes)}
            </Text>

            <Pressable
              onPress={() => handleAdjustDuration(15)}
              accessibilityRole="button"
              className="w-12 h-12 rounded-full bg-[#0D2B34] items-center justify-center active:opacity-70"
            >
              <Plus size={22} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>

        {/* Card 2: Feature Toggles */}
        <View className="bg-white rounded-3xl p-5 border border-[#E1EBEA] mb-4 shadow-sm">
          <SwitchRow
            label="Nhắc nghỉ theo trạng thái não"
            description="Tự động nhận diện mệt mỏi thay vì hẹn giờ cố định"
            value={isAdaptiveBreak}
            onValueChange={setIsAdaptiveBreak}
          />
          <SwitchRow
            label="Bảo vệ tập trung"
            description="Tắt thông báo khác khi làm việc sâu"
            value={isFocusShield}
            onValueChange={setIsFocusShield}
          />
          <SwitchRow
            label="Nhắc nới / tháo headband"
            description="Mỗi 45–60 phút để da đầu thông thoáng"
            value={isComfortReminder}
            onValueChange={setIsComfortReminder}
          />
        </View>

        {/* Card 3: Alert Sensitivity Selector */}
        <View className="bg-white rounded-3xl p-5 border border-[#E1EBEA] mb-6 shadow-sm">
          <Text className="text-sm font-bold text-[#0D2B34] mb-3">
            Độ nhạy cảnh báo
          </Text>
          <View className="flex-row items-center gap-2.5">
            {(['low', 'medium', 'high'] as AlertSensitivity[]).map((level) => {
              const labelMap: Record<AlertSensitivity, string> = {
                low: 'Ít',
                medium: 'Vừa',
                high: 'Nhiều',
              };
              const isSelected = sensitivity === level;
              return (
                <Pressable
                  key={level}
                  onPress={() => setSensitivity(level)}
                  accessibilityRole="button"
                  className={`flex-1 py-3 rounded-full border items-center justify-center active:opacity-75 ${
                    isSelected
                      ? 'bg-[#0D2B34] border-[#0D2B34]'
                      : 'bg-white border-[#CBDAD8]'
                  }`}
                >
                  <Text
                    className={`text-xs font-bold ${
                      isSelected ? 'text-white' : 'text-[#0D2B34]'
                    }`}
                  >
                    {labelMap[level]}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Bottom CTA */}
        <Button
          title="Bắt đầu"
          variant="primary"
          size="lg"
          onPress={handleStart}
          className="w-full py-4 rounded-2xl bg-[#EAA01B]"
          textClassName="text-[#0D2B34] font-bold text-base"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
