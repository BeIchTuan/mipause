/**
 * @file app/index.tsx
 * @description Screen s1: Chào mừng (Figma Hình 1 · node-id=1-2).
 * Root entry screen welcoming user with MiPause visual branding,
 * EEG headband graphic illustration, value proposition, and CTA to permissions flow.
 */

import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Circle, Path, G } from 'react-native-svg';
import { Eye } from 'lucide-react-native';
import { Button } from '../components/ui/Button';

/**
 * MiPause Logo Mark Component
 */
function MiPauseLogo() {
  return (
    <View className="flex-row items-center gap-3">
      {/* Brand Icon Badge */}
      <View className="w-10 h-10 rounded-2xl bg-[#0D2B34] items-center justify-center">
        <Svg width={24} height={24} viewBox="0 0 24 24">
          {/* Headband arch */}
          <Path
            d="M 4 17 A 8 8 0 0 1 20 17"
            stroke="#FFFFFF"
            strokeWidth={2.5}
            strokeLinecap="round"
            fill="none"
          />
          {/* Amber sensor electrode */}
          <Circle cx={12} cy={9} r={2} fill="#EAA01B" />
        </Svg>
      </View>
      <Text className="text-2xl font-black text-[#0D2B34] tracking-tight">
        MiPause
      </Text>
    </View>
  );
}

/**
 * Hero EEG Headband graphic illustration
 */
function HeroHeadbandGraphic() {
  return (
    <View className="w-full bg-[#EBF3F3] rounded-[28px] py-10 items-center justify-center my-4 overflow-hidden relative">
      <Svg width={240} height={180} viewBox="0 0 240 180">
        {/* Floating background ambient dots */}
        <Circle cx={40} cy={50} r={6} fill="#EAA01B" />
        <Circle cx={36} cy={130} r={4} fill="#CBDAD8" />
        <Circle cx={205} cy={48} r={4} fill="#CBDAD8" />
        <Circle cx={198} cy={135} r={8} fill="#B8D3CE" />

        {/* Dotted orbital alignment ring */}
        <Circle
          cx={120}
          cy={95}
          r={62}
          stroke="#CBDAD8"
          strokeWidth={1.5}
          strokeDasharray="3, 4"
          fill="none"
        />

        {/* Outer Headband Arch */}
        <Path
          d="M 72 108 C 72 65, 168 65, 168 108"
          stroke="#0D2B34"
          strokeWidth={7.5}
          strokeLinecap="round"
          fill="none"
        />

        {/* Golden Central EEG sensor node */}
        <Circle cx={120} cy={72} r={4.5} fill="#EAA01B" />

        {/* Brainwave Sine Wave */}
        <Path
          d="M 78 114 Q 92 88, 106 122 T 134 122 T 162 114"
          stroke="#1A7A7B"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
    </View>
  );
}

export default function WelcomeScreen() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/onboarding/permissions');
  };

  const handleSkipToHome = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#EFF3F3]">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {/* Top Logo & App Header */}
          <View className="flex-row items-center justify-between mt-2 mb-2">
            <MiPauseLogo />
            {/* Direct jump to dashboard for fast preview */}
            <Pressable
              onPress={handleSkipToHome}
              className="py-1 px-3 rounded-full bg-white/60 border border-[#CBDAD8]"
            >
              <Text className="text-xs font-semibold text-[#5E7A85]">
                Trang chính ›
              </Text>
            </Pressable>
          </View>

          {/* Central Hero Headband Graphic Card */}
          <HeroHeadbandGraphic />

          {/* Hero Typography */}
          <Text className="text-3xl font-black text-[#0D2B34] leading-[38px] mb-3">
            Biết khi nào não{'\n'}cần nghỉ
          </Text>

          <Text className="text-sm font-medium text-[#5E7A85] leading-6 mb-4">
            Trước khi bạn kiệt sức, MiPause đọc nhịp não qua headband EEG và nhắc nghỉ thật nhẹ nhàng.
          </Text>
        </View>

        {/* Bottom CTAs */}
        <View className="mt-4">
          <Button
            title="Bắt đầu"
            variant="primary"
            size="lg"
            onPress={handleStart}
            className="w-full py-4 rounded-2xl bg-[#EAA01B]"
            textClassName="text-[#0D2B34] font-bold text-base"
          />

          <Pressable
            onPress={() => router.push('/onboarding/connect-method')}
            accessibilityRole="button"
            className="flex-row items-center justify-center gap-2 mt-4 py-2"
          >
            <Eye size={16} color="#0D2B34" />
            <Text className="text-xs font-bold text-[#0D2B34] underline">
              Tôi cần chế độ hỗ trợ tiếp cận
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
