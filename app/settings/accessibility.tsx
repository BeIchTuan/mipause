/**
 * @file app/settings/accessibility.tsx
 * @description Screen s28: Khả năng tiếp cận (Accessibility Settings).
 * HTA 6 & HTA 7: Must have #6, #7. Persona Chị Lan (khiếm thị / cần phản hồi đa giác quan).
 * Configures non-visual feedback (screen reader, haptic intensity, alert audio volume)
 * and visual accessibility (scalable font size, high-contrast display mode).
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

/**
 * Custom Interactive Slider Row Component with track, thumb, and optional action/badge slot
 */
const SettingSliderCard: React.FC<{
  title: string;
  value: number; // 0 to 100
  onChange: (val: number) => void;
  rightSlot?: React.ReactNode;
}> = ({ title, value, onChange, rightSlot }) => {
  return (
    <View className="bg-white rounded-3xl p-4 border border-[#E1EBEA] shadow-sm mb-3">
      <Text className="text-sm font-bold text-[#0D2B34] mb-3">
        {title}
      </Text>

      <View className="flex-row items-center gap-4">
        {/* Interactive Track Area */}
        <Pressable
          onPress={(e) => {
            // Estimate percentage click on track
            const clickX = e.nativeEvent.locationX;
            const approxWidth = 200;
            const newPct = Math.max(10, Math.min(100, Math.round((clickX / approxWidth) * 100)));
            onChange(newPct);
          }}
          className="flex-1 h-8 justify-center active:opacity-90"
        >
          {/* Background track line */}
          <View className="h-2 w-full bg-[#E1EBEA] rounded-full overflow-hidden relative">
            {/* Active filled line */}
            <View
              className="h-full bg-[#0D2B34] rounded-full"
              style={{ width: `${value}%` }}
            />
          </View>

          {/* Draggable thumb */}
          <View
            className="w-5 h-5 rounded-full bg-white border-2 border-[#0D2B34] shadow-sm absolute -top-[-6px]"
            style={{ left: `${Math.max(0, Math.min(94, value - 3))}%` }}
          />
        </Pressable>

        {/* Right Action slot (e.g., 'Thử' button or 'Aa' badge) */}
        {rightSlot}
      </View>
    </View>
  );
};

export default function AccessibilityScreen() {
  const router = useRouter();

  // Settings states
  const [isScreenReaderEnabled, setIsScreenReaderEnabled] = useState<boolean>(true);
  const [hapticIntensity, setHapticIntensity] = useState<number>(75);
  const [audioVolume, setAudioVolume] = useState<number>(60);
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(50);
  const [isHighContrastEnabled, setIsHighContrastEnabled] = useState<boolean>(false);

  /**
   * Test haptic vibration simulation
   */
  const handleTestHaptic = () => {
    Alert.alert(
      'Mô phỏng rung xúc giác',
      `Đang kích hoạt 2 nhịp rung nhẹ (Cường độ: ${hapticIntensity}%). Giúp nhận biết trạng thái không cần nhìn.`
    );
  };

  /**
   * Test audio chime simulation
   */
  const handleTestAudio = () => {
    Alert.alert(
      'Mô phỏng chuông nhắc',
      `Đang phát âm chuông êm dịu Calm Technology (Âm lượng: ${audioVolume}%).`
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
          Khả năng tiếp cận
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 36 }}>
        {/* SECTION 1: PHẢN HỒI KHÔNG CẦN NHÌN */}
        <Text className="text-xs font-bold text-[#5E7A85] uppercase tracking-wider mb-2.5 mt-1 px-1">
          Phản hồi không cần nhìn
        </Text>

        {/* Card 1: Hỗ trợ trình đọc màn hình */}
        <View className="bg-white rounded-3xl p-4 border border-[#E1EBEA] shadow-sm mb-3 flex-row items-center justify-between">
          <View className="flex-1 mr-3">
            <Text className="text-sm font-bold text-[#0D2B34]">
              Hỗ trợ trình đọc màn hình
            </Text>
            <Text className="text-xs text-[#5E7A85] mt-0.5">
              VoiceOver / TalkBack
            </Text>
          </View>
          <Switch
            value={isScreenReaderEnabled}
            onValueChange={setIsScreenReaderEnabled}
            trackColor={{ false: '#CBD5E1', true: '#0D2B34' }}
            thumbColor="#FFFFFF"
          />
        </View>

        {/* Card 2: Cường độ rung */}
        <SettingSliderCard
          title="Cường độ rung"
          value={hapticIntensity}
          onChange={setHapticIntensity}
          rightSlot={
            <Pressable
              onPress={handleTestHaptic}
              accessibilityRole="button"
              className="px-4 py-1.5 rounded-full bg-white border border-[#CBDAD8] active:opacity-70"
            >
              <Text className="text-xs font-bold text-[#0D2B34]">Thử</Text>
            </Pressable>
          }
        />

        {/* Card 3: Âm lượng nhắc nhở */}
        <SettingSliderCard
          title="Âm lượng nhắc nhở"
          value={audioVolume}
          onChange={setAudioVolume}
          rightSlot={
            <Pressable
              onPress={handleTestAudio}
              accessibilityRole="button"
              className="px-4 py-1.5 rounded-full bg-white border border-[#CBDAD8] active:opacity-70"
            >
              <Text className="text-xs font-bold text-[#0D2B34]">Thử</Text>
            </Pressable>
          }
        />

        {/* SECTION 2: HIỂN THỊ */}
        <Text className="text-xs font-bold text-[#5E7A85] uppercase tracking-wider mb-2.5 mt-4 px-1">
          Hiển thị
        </Text>

        {/* Card 4: Cỡ chữ */}
        <SettingSliderCard
          title="Cỡ chữ"
          value={fontSizeLevel}
          onChange={setFontSizeLevel}
          rightSlot={
            <View className="px-3 py-1 rounded-xl border border-dashed border-[#0D2B34] bg-[#F7FAFA] items-center justify-center">
              <Text className="text-sm font-bold text-[#0D2B34]">Aa</Text>
            </View>
          }
        />

        {/* Card 5: Giao diện tương phản cao */}
        <View className="bg-white rounded-3xl p-4 border border-[#E1EBEA] shadow-sm mb-3 flex-row items-center justify-between">
          <View className="flex-1 mr-3">
            <Text className="text-sm font-bold text-[#0D2B34]">
              Giao diện tương phản cao
            </Text>
            <Text className="text-xs text-[#5E7A85] mt-0.5">
              Tối ưu cho người suy giảm thị lực
            </Text>
          </View>
          <Switch
            value={isHighContrastEnabled}
            onValueChange={setIsHighContrastEnabled}
            trackColor={{ false: '#CBD5E1', true: '#0D2B34' }}
            thumbColor="#FFFFFF"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
