/**
 * @file app/session/paused.tsx
 * @description Screen s12: Phiên tạm dừng (Session Paused State).
 * Features a large dashed pause indicator, EEG sensor freeze notice,
 * and seamless resumption controls matching Figma.
 */

import React from 'react';
import { View, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Pause, Play, Square } from 'lucide-react-native';

import { HeadbandStatusPill } from '../../components/focus/HeadbandStatusPill';
import { Button } from '../../components/ui/Button';
import { MOCK_HEADBAND } from '../../mocks/focusMockData';

export default function PausedSessionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const secondsElapsed = Number(params.secondsElapsed) || 4354;
  const targetMinutes = Number(params.targetMinutes) || 120;

  /**
   * Format seconds to HH:MM:SS format
   */
  const formatTimer = (totalSec: number) => {
    const hours = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hours < 10 ? '0' : ''}${hours}:${mins < 10 ? '0' : ''}${mins}:${
      secs < 10 ? '0' : ''
    }${secs}`;
  };

  /**
   * Resume the focus session
   */
  const handleResume = () => {
    router.back();
  };

  /**
   * Terminate session
   */
  const handleEnd = () => {
    Alert.alert(
      'Kết thúc phiên?',
      'Bạn có muốn lưu lại thời gian tập trung này vào nhật ký không?',
      [
        { text: 'Huỷ', style: 'cancel' },
        {
          text: 'Lưu & Thoát',
          style: 'destructive',
          onPress: () => router.replace('/session/summary'),
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0B1B22] px-4 justify-between pb-8">
      {/* Top Header Pill Row */}
      <View className="flex-row items-center justify-between py-3">
        <HeadbandStatusPill device={MOCK_HEADBAND} isDarkTheme />
        <Text className="text-xs text-[#8DA6B2] font-medium">
          Mục tiêu {Math.floor(targetMinutes / 60)}g {targetMinutes % 60 < 10 ? '0' : ''}
          {targetMinutes % 60}p
        </Text>
      </View>

      {/* Main Paused Display */}
      <View className="items-center w-full">
        <Text className="text-xs uppercase tracking-widest text-[#6E8B99] font-bold mb-2">
          ĐÃ TẠM DỪNG
        </Text>

        {/* Frozen Timer */}
        <Text className="text-5xl font-mono font-black text-white/70 tracking-widest my-3">
          {formatTimer(secondsElapsed)}
        </Text>

        {/* Dashed Box Indicator (matching Figma s12) */}
        <View className="w-full bg-[#12242E]/70 border-2 border-dashed border-[#1E3542] rounded-3xl p-8 items-center justify-center my-6">
          <View className="w-16 h-16 rounded-full border-2 border-white/80 items-center justify-center mb-4">
            <Pause size={28} color="#FFFFFF" strokeWidth={2.5} />
          </View>

          <Text className="text-lg font-bold text-white mb-1">
            Phiên đang tạm dừng
          </Text>
          <Text className="text-xs text-[#8DA6B2]">
            Không đo EEG, không cảnh báo
          </Text>
        </View>
      </View>

      {/* Bottom Action Controls */}
      <View className="w-full">
        <Button
          title="Tiếp tục phiên"
          variant="primary"
          size="lg"
          iconLeft={<Play size={18} color="#0D2B34" fill="#0D2B34" />}
          onPress={handleResume}
          className="w-full py-4 mb-3 bg-[#EAA01B] rounded-2xl"
          textClassName="text-[#0D2B34] font-bold text-base"
        />

        <Button
          title="Kết thúc phiên"
          variant="dark"
          size="lg"
          iconLeft={<Square size={16} color="#FFFFFF" fill="#FFFFFF" />}
          onPress={handleEnd}
          className="w-full py-4 bg-[#12242E] border border-[#1E3542] rounded-2xl"
        />

        <Text className="text-[11px] text-center text-[#55717E] mt-3">
          Tạm dừng quá 10 phút sẽ nhắc bạn kết thúc
        </Text>
      </View>
    </SafeAreaView>
  );
}
