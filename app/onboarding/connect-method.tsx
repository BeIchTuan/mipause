/**
 * @file app/onboarding/connect-method.tsx
 * @description Screen s3: Chọn cách kết nối (Figma Hình 1 · node-id=1-2).
 * Inclusive multi-modal headband pairing screen supporting visual QR code scanning,
 * standard BLE device list, and non-visual voice & haptic pairing.
 */

import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  QrCode,
  List,
  Volume2,
  ChevronRight,
  Circle,
} from 'lucide-react-native';

export default function ConnectMethodScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#EFF3F3]">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {/* Top Back Navigation Bar */}
          <View className="flex-row items-center gap-4 mb-6">
            <Pressable
              onPress={() => router.back()}
              accessibilityRole="button"
              accessibilityLabel="Quay lại"
              className="w-10 h-10 rounded-full bg-white border border-[#CBDAD8] items-center justify-center active:opacity-70"
            >
              <ChevronLeft size={20} color="#0D2B34" />
            </Pressable>
            <Text className="text-xl font-black text-[#0D2B34]">
              Kết nối headband
            </Text>
          </View>

          {/* Preparation Checklist Section */}
          <View className="bg-white/60 rounded-2xl p-4 border border-[#E1EBEA] mb-6">
            <Text className="text-xs font-bold uppercase tracking-wider text-[#5E7A85] mb-3">
              Chuẩn bị
            </Text>
            <View className="gap-2.5">
              <View className="flex-row items-center gap-3">
                <Circle size={14} color="#1A7A7B" strokeWidth={2.5} />
                <Text className="text-sm font-semibold text-[#0D2B34]">
                  Bật nguồn headband
                </Text>
              </View>
              <View className="flex-row items-center gap-3">
                <Circle size={14} color="#1A7A7B" strokeWidth={2.5} />
                <Text className="text-sm font-semibold text-[#0D2B34]">
                  Bật Bluetooth trên điện thoại
                </Text>
              </View>
            </View>
          </View>

          {/* 3 Pairing Options */}
          <View className="gap-3">
            {/* Option 1: QR Code Scanner */}
            <Pressable
              onPress={() => router.push('/onboarding/scan-qr')}
              accessibilityRole="button"
              accessibilityLabel="Quét mã QR. Nhanh, cần nhìn màn hình"
              className="flex-row items-center p-4 bg-white rounded-2xl border border-[#E1EBEA] active:opacity-75 shadow-sm"
            >
              <View className="w-12 h-12 rounded-2xl bg-[#E5F2EE] items-center justify-center mr-3.5">
                <QrCode size={24} color="#0D2B34" strokeWidth={2} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-[#0D2B34] mb-0.5">
                  Quét mã QR
                </Text>
                <Text className="text-xs font-medium text-[#5E7A85]">
                  Nhanh · cần nhìn màn hình
                </Text>
              </View>
              <ChevronRight size={20} color="#8DA6B2" />
            </Pressable>

            {/* Option 2: Device Name List */}
            <Pressable
              onPress={() => router.replace('/(tabs)')}
              accessibilityRole="button"
              accessibilityLabel="Chọn tên thiết bị từ danh sách"
              className="flex-row items-center p-4 bg-white rounded-2xl border border-[#E1EBEA] active:opacity-75 shadow-sm"
            >
              <View className="w-12 h-12 rounded-2xl bg-[#E5F2EE] items-center justify-center mr-3.5">
                <List size={24} color="#0D2B34" strokeWidth={2} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-[#0D2B34] mb-0.5">
                  Chọn tên thiết bị
                </Text>
                <Text className="text-xs font-medium text-[#5E7A85]">
                  Chọn MiPause-xxxx từ danh sách
                </Text>
              </View>
              <ChevronRight size={20} color="#8DA6B2" />
            </Pressable>

            {/* Option 3: Voice & Haptics Accessible Pairing */}
            <Pressable
              onPress={() => router.replace('/(tabs)')}
              accessibilityRole="button"
              accessibilityLabel="Bằng giọng nói và rung dành cho VoiceOver hoặc TalkBack"
              className="flex-row items-center p-4 bg-white rounded-2xl border-2 border-[#0D2B34] active:opacity-75 shadow-sm"
            >
              <View className="w-12 h-12 rounded-2xl bg-[#E5F2EE] items-center justify-center mr-3.5">
                <Volume2 size={24} color="#0D2B34" strokeWidth={2} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-[#0D2B34] mb-0.5">
                  Bằng giọng nói & rung
                </Text>
                <Text className="text-xs font-medium text-[#5E7A85]">
                  Dành cho VoiceOver / TalkBack
                </Text>
              </View>
              <ChevronRight size={20} color="#0D2B34" />
            </Pressable>
          </View>
        </View>

        {/* Troubleshooting link */}
        <Pressable
          accessibilityRole="button"
          className="items-center py-4 active:opacity-70 mt-6"
        >
          <Text className="text-xs font-bold text-[#0D2B34] underline">
            Không thấy thiết bị? Xem hướng dẫn
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
