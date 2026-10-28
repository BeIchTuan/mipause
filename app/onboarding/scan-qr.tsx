/**
 * @file app/onboarding/scan-qr.tsx
 * @description Screen s4: Quét mã QR (Figma Hình 1 · node-id=1-2).
 * Viewfinder camera scanner interface with golden bracket corners,
 * scanning laser animation, flashlight toggle, and accessible fallback links.
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Path, Rect, Line } from 'react-native-svg';
import { ChevronLeft, Flashlight } from 'lucide-react-native';

export default function ScanQrScreen() {
  const router = useRouter();
  const [isFlashlightOn, setIsFlashlightOn] = useState(false);

  const handleSimulateSuccessfulScan = () => {
    // Navigate straight to main dashboard upon scanning headband QR code
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#EFF3F3]">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {/* Top Back Navigation Bar */}
          <View className="flex-row items-center gap-4 mb-4">
            <Pressable
              onPress={() => router.back()}
              accessibilityRole="button"
              accessibilityLabel="Quay lại"
              className="w-10 h-10 rounded-full bg-white border border-[#CBDAD8] items-center justify-center active:opacity-70"
            >
              <ChevronLeft size={20} color="#0D2B34" />
            </Pressable>
            <Text className="text-xl font-black text-[#0D2B34]">
              Quét mã QR
            </Text>
          </View>

          {/* Camera Viewfinder Box with Golden Brackets */}
          <Pressable
            onPress={handleSimulateSuccessfulScan}
            accessibilityRole="button"
            accessibilityLabel="Khung quét mã QR. Chạm để quét thử nghiệm"
            className="w-full aspect-square max-w-[320px] self-center bg-[#0F252E] rounded-[32px] p-6 items-center justify-center my-3 relative shadow-lg active:opacity-95"
          >
            <Svg width="100%" height="100%" viewBox="0 0 260 260">
              {/* 4 Golden Corner Brackets (#EAA01B) */}
              {/* Top-Left */}
              <Path
                d="M 24 56 L 24 30 C 24 26 26 24 30 24 L 56 24"
                stroke="#EAA01B"
                strokeWidth={5}
                strokeLinecap="round"
                fill="none"
              />
              {/* Top-Right */}
              <Path
                d="M 204 24 L 230 24 C 234 24 236 26 236 30 L 236 56"
                stroke="#EAA01B"
                strokeWidth={5}
                strokeLinecap="round"
                fill="none"
              />
              {/* Bottom-Left */}
              <Path
                d="M 24 204 L 24 230 C 24 234 26 236 30 236 L 56 236"
                stroke="#EAA01B"
                strokeWidth={5}
                strokeLinecap="round"
                fill="none"
              />
              {/* Bottom-Right */}
              <Path
                d="M 204 236 L 230 236 C 234 236 236 234 236 230 L 236 204"
                stroke="#EAA01B"
                strokeWidth={5}
                strokeLinecap="round"
                fill="none"
              />

              {/* Central Abstract QR Matrix Blocks */}
              <Rect x="75" y="75" width="40" height="40" rx="8" fill="#3D5A64" />
              <Rect x="145" y="75" width="40" height="40" rx="8" fill="#3D5A64" />
              <Rect x="75" y="145" width="40" height="40" rx="8" fill="#3D5A64" />
              <Rect x="145" y="145" width="18" height="18" rx="4" fill="#3D5A64" />
              <Rect x="168" y="168" width="16" height="16" rx="4" fill="#3D5A64" />

              {/* Horizontal Golden Laser Line */}
              <Line
                x1="28"
                y1="130"
                x2="232"
                y2="130"
                stroke="#EAA01B"
                strokeWidth={3}
                strokeLinecap="round"
              />
            </Svg>

            <Text className="text-[11px] text-[#8DA6B2] absolute bottom-3">
              (Chạm vào khung để giả lập kết nối thành công)
            </Text>
          </Pressable>

          {/* Instructions */}
          <Text className="text-base font-bold text-[#0D2B34] text-center mt-3 mb-4 leading-6">
            Đưa mã QR trên headband{'\n'}vào giữa khung
          </Text>

          {/* Flashlight Pill Button */}
          <Pressable
            onPress={() => setIsFlashlightOn(!isFlashlightOn)}
            accessibilityRole="button"
            className={`flex-row items-center gap-2 self-center px-4 py-2 rounded-full border active:opacity-75 ${
              isFlashlightOn
                ? 'bg-[#EAA01B] border-[#EAA01B]'
                : 'bg-white border-[#CBDAD8]'
            }`}
          >
            <Flashlight
              size={16}
              color={isFlashlightOn ? '#FFFFFF' : '#0D2B34'}
            />
            <Text
              className={`text-xs font-bold ${
                isFlashlightOn ? 'text-white' : 'text-[#0D2B34]'
              }`}
            >
              {isFlashlightOn ? 'Tắt đèn pin' : 'Bật đèn pin'}
            </Text>
          </Pressable>
        </View>

        {/* Fallback Pairing Links */}
        <View className="mt-8 gap-2.5 items-center">
          <Pressable
            onPress={() => router.push('/onboarding/connect-method')}
            accessibilityRole="button"
            className="py-1"
          >
            <Text className="text-xs font-bold text-[#0D2B34] underline">
              Chọn tên thiết bị thay thế
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.push('/onboarding/connect-method')}
            accessibilityRole="button"
            className="py-1"
          >
            <Text className="text-xs font-bold text-[#0D2B34] underline">
              Kết nối bằng giọng nói & rung
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
