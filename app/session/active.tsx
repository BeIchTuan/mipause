/**
 * @file app/session/active.tsx
 * @description Screen s11 & s13-s16: Phiên đang chạy (Active Focus Session).
 * Mapped pixel-perfect to Figma design with deep obsidian background (#0B1B22),
 * real-time timer ticker (01:12:34), patterned cognitive state card,
 * SVG continuous waveform sparkline, and calm haptic cue pills.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Pause, Square, ChevronLeft } from 'lucide-react-native';

import { CognitiveStateCard } from '../../components/focus/CognitiveStateCard';
import { FocusWaveformChart } from '../../components/focus/FocusWaveformChart';
import { HapticPromptPill } from '../../components/focus/HapticPromptPill';
import { CalmBreakModal } from '../../components/focus/CalmBreakModal';
import { Button } from '../../components/ui/Button';
import { CognitiveState } from '../../types/focus';

export default function ActiveSessionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Initial duration in minutes
  const targetMinutes = Number(params.durationMinutes) || 120;

  // Active elapsed seconds (starting demo value: 4354s = 01:12:34 matching Figma)
  const [secondsElapsed, setSecondsElapsed] = useState<number>(4354);
  const [currentState, setCurrentState] = useState<CognitiveState>('reduced');
  const [showBreakModal, setShowBreakModal] = useState<boolean>(false);

  // Timer ticker effect
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
   * Cycle cognitive states on tap for interactive demonstration in Expo Go
   */
  const handleCycleCognitiveState = () => {
    const states: CognitiveState[] = ['alert', 'reduced', 'fatigued', 'lost_signal'];
    const nextIndex = (states.indexOf(currentState) + 1) % states.length;
    const nextState = states[nextIndex];
    setCurrentState(nextState);

    // If switched to fatigued, trigger Calm Break modal
    if (nextState === 'fatigued') {
      setShowBreakModal(true);
    }
  };

  /**
   * Navigate to paused screen (s12)
   */
  const handlePause = () => {
    router.push({
      pathname: '/session/paused',
      params: {
        secondsElapsed,
        targetMinutes,
      },
    });
  };

  /**
   * Terminate session and return home
   */
  const handleEnd = () => {
    Alert.alert(
      'Kết thúc phiên tập trung?',
      'Dữ liệu sóng não của phiên này sẽ được lưu trữ an toàn trong nhật ký thiết bị.',
      [
        { text: 'Tiếp tục tập trung', style: 'cancel' },
        {
          text: 'Kết thúc & Lưu',
          style: 'destructive',
          onPress: () => router.replace('/session/summary'),
        },
      ]
    );
  };

  const isLostSignal = currentState === 'lost_signal';

  return (
    <SafeAreaView className="flex-1 bg-[#0B1B22] px-4">
      {/* Top Header Pill Row */}
      <View className="flex-row items-center justify-between py-3 mb-4">
        {/* Connection status pill */}
        <Pressable
          onPress={() => router.replace('/(tabs)')}
          className="flex-row items-center bg-[#152B35] px-3.5 py-1.5 rounded-full border border-[#1E3845] active:opacity-75"
        >
          <View
            className={`w-2 h-2 rounded-full mr-2 ${
              isLostSignal ? 'bg-[#94A3B8]' : 'bg-[#2DB872]'
            }`}
          />
          <Text className="text-xs font-semibold text-white">
            {isLostSignal ? 'Mất tín hiệu' : 'Headband đã kết nối'}
          </Text>
        </Pressable>

        {/* Target duration indicator */}
        <Text className="text-xs text-[#8DA6B2] font-medium">
          Mục tiêu {Math.floor(targetMinutes / 60)}g {targetMinutes % 60 < 10 ? '0' : ''}
          {targetMinutes % 60}p
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', paddingBottom: 24 }}
      >
        <View className="items-center w-full">
          {/* Subtitle Status */}
          <Text className="text-xs uppercase tracking-widest text-[#6E8B99] font-bold mt-2 mb-1">
            ĐANG TẬP TRUNG
          </Text>

          {/* Large Digital Timer Display */}
          <Text className="text-5xl font-mono font-black text-white tracking-widest my-3">
            {formatTimer(secondsElapsed)}
          </Text>

          {/* Cognitive State Switcher demo prompt */}
          <View className="w-full mt-2">
            <CognitiveStateCard
              state={currentState}
              onPress={handleCycleCognitiveState}
            />
            <Text className="text-[11px] text-center text-[#55717E] mb-3 italic">
              (Chạm vào card để chuyển đổi: Tỉnh táo ➔ Hơi giảm ➔ Mệt mỏi ➔ Mất tín hiệu)
            </Text>
          </View>

          {/* 15-Minute Alertness Sparkline Waveform */}
          <FocusWaveformChart currentState={currentState} />

          {/* Calm Technology Haptic / Audio Cue Pill */}
          <HapticPromptPill state={currentState} />
        </View>

        {/* Bottom Control Buttons */}
        <View className="flex-row items-center gap-3 mt-4">
          <Button
            title="Tạm dừng"
            variant="dark"
            size="lg"
            iconLeft={<Pause size={18} color="#FFFFFF" />}
            onPress={handlePause}
            className="flex-1 py-4 bg-[#12242E] border border-[#1E3542] rounded-2xl"
          />

          <Button
            title="Kết thúc"
            variant="dark"
            size="lg"
            iconLeft={<Square size={16} color="#FFFFFF" fill="#FFFFFF" />}
            onPress={handleEnd}
            className="flex-1 py-4 bg-[#12242E] border border-[#1E3542] rounded-2xl"
          />
        </View>
      </ScrollView>

      {/* Calm Technology Fatigue Remediation Modal */}
      <CalmBreakModal
        visible={showBreakModal}
        onTakeBreak={() => {
          setShowBreakModal(false);
          handlePause();
        }}
        onDismiss={() => setShowBreakModal(false)}
      />
    </SafeAreaView>
  );
}
