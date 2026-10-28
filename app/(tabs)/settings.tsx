/**
 * @file app/(tabs)/settings.tsx
 * @description Screen s25: Menu cài đặt (Settings Tab).
 * HTA 6 & HTA 7: Must have #6, #7. Persona Duy (riêng tư) & Chị Lan (tiếp cận).
 * Displays user subscription status, connected headband telemetry,
 * EEG privacy configuration, accessibility shortcuts, and Pro tier entry points.
 */

import React from 'react';
import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  Bluetooth,
  Shield,
  Eye,
  Bell,
  Lock,
  HelpCircle,
  ChevronRight,
} from 'lucide-react-native';

export default function SettingsScreen() {
  const router = useRouter();

  /**
   * Navigate to s26 Quyền riêng tư & EEG
   */
  const handleOpenPrivacy = () => {
    router.push('/settings/privacy');
  };

  /**
   * Navigate to s28 Khả năng tiếp cận
   */
  const handleOpenAccessibility = () => {
    router.push('/settings/accessibility');
  };

  /**
   * Navigate to s30 Giới thiệu Pro
   */
  const handleOpenPro = () => {
    router.push('/insights/upgrade-pro');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#EFF3F3] px-4">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Header */}
        <Text className="text-2xl font-black text-[#0D2B34] mt-3 mb-4 tracking-tight">
          Cài đặt
        </Text>

        {/* User Profile Card */}
        <View className="bg-white rounded-3xl p-4 border border-[#E1EBEA] flex-row items-center justify-between shadow-sm mb-4">
          <View className="flex-row items-center gap-3.5">
            <View className="w-12 h-12 rounded-full bg-[#0D2B34] items-center justify-center">
              <Text className="text-lg font-bold text-white">M</Text>
            </View>
            <View>
              <Text className="text-base font-black text-[#0D2B34]">
                Mai Nguyễn
              </Text>
              <Text className="text-xs font-semibold text-[#5E7A85] mt-0.5">
                Gói miễn phí
              </Text>
            </View>
          </View>

          <Pressable
            onPress={handleOpenPro}
            accessibilityRole="button"
            accessibilityLabel="Nâng cấp Pro"
            className="bg-[#EAA01B] px-4 py-1.5 rounded-full active:opacity-75"
          >
            <Text className="text-xs font-bold text-[#0D2B34]">Nâng cấp</Text>
          </Pressable>
        </View>

        {/* Main Settings Menu Group */}
        <View className="bg-white rounded-3xl p-2 border border-[#E1EBEA] shadow-sm mb-4">
          {/* Menu Item 1: Thiết bị đã ghép */}
          <Pressable
            onPress={() => Alert.alert('Thiết bị MiPause-A3F2', 'Trạng thái: Đã kết nối BLE\nPin: 88%\nTiếp xúc cảm biến: Tốt')}
            accessibilityRole="button"
            className="flex-row items-center justify-between p-3 border-b border-[#F0F4F4] active:opacity-75"
          >
            <View className="flex-row items-center gap-3">
              <View className="w-9 h-9 rounded-xl bg-[#EFF5F5] items-center justify-center">
                <Bluetooth size={18} color="#0D2B34" />
              </View>
              <View>
                <Text className="text-sm font-bold text-[#0D2B34]">
                  Thiết bị đã ghép
                </Text>
                <Text className="text-xs text-[#5E7A85] mt-0.5">
                  MiPause-A3F2 · Đã kết nối
                </Text>
              </View>
            </View>
            <ChevronRight size={18} color="#8DA6B2" />
          </Pressable>

          {/* Menu Item 2: Quyền riêng tư & EEG -> s26 */}
          <Pressable
            onPress={handleOpenPrivacy}
            accessibilityRole="button"
            accessibilityLabel="Quyền riêng tư & Dữ liệu EEG"
            className="flex-row items-center justify-between p-3 border-b border-[#F0F4F4] active:opacity-75"
          >
            <View className="flex-row items-center gap-3">
              <View className="w-9 h-9 rounded-xl bg-[#EFF5F5] items-center justify-center">
                <Shield size={18} color="#0D2B34" />
              </View>
              <View>
                <Text className="text-sm font-bold text-[#0D2B34]">
                  Quyền riêng tư & Dữ liệu EEG
                </Text>
                <Text className="text-xs text-[#5E7A85] mt-0.5">
                  Lưu trữ, xóa dữ liệu
                </Text>
              </View>
            </View>
            <ChevronRight size={18} color="#8DA6B2" />
          </Pressable>

          {/* Menu Item 3: Khả năng tiếp cận -> s28 */}
          <Pressable
            onPress={handleOpenAccessibility}
            accessibilityRole="button"
            accessibilityLabel="Khả năng tiếp cận"
            className="flex-row items-center justify-between p-3 border-b border-[#F0F4F4] active:opacity-75"
          >
            <View className="flex-row items-center gap-3">
              <View className="w-9 h-9 rounded-xl bg-[#EFF5F5] items-center justify-center">
                <Eye size={18} color="#0D2B34" />
              </View>
              <View>
                <Text className="text-sm font-bold text-[#0D2B34]">
                  Khả năng tiếp cận
                </Text>
                <Text className="text-xs text-[#5E7A85] mt-0.5">
                  Rung, âm thanh, cỡ chữ
                </Text>
              </View>
            </View>
            <ChevronRight size={18} color="#8DA6B2" />
          </Pressable>

          {/* Menu Item 4: Thông báo & nhắc nhở */}
          <Pressable
            onPress={() => Alert.alert('Thông báo & nhắc nhở', 'Đã bật bảo vệ tập trung và nhắc nghỉ thư giãn.')}
            accessibilityRole="button"
            className="flex-row items-center justify-between p-3 active:opacity-75"
          >
            <View className="flex-row items-center gap-3">
              <View className="w-9 h-9 rounded-xl bg-[#EFF5F5] items-center justify-center">
                <Bell size={18} color="#0D2B34" />
              </View>
              <View>
                <Text className="text-sm font-bold text-[#0D2B34]">
                  Thông báo & nhắc nhở
                </Text>
                <Text className="text-xs text-[#5E7A85] mt-0.5">
                  Nhắc nghỉ, bảo vệ tập trung
                </Text>
              </View>
            </View>
            <ChevronRight size={18} color="#8DA6B2" />
          </Pressable>
        </View>

        {/* Special Promo Card: Gói Focus Insights Pro -> s30 */}
        <Pressable
          onPress={handleOpenPro}
          accessibilityRole="button"
          accessibilityLabel="Gói Focus Insights Pro"
          className="bg-white rounded-3xl p-4 border border-[#E1EBEA] flex-row items-center justify-between shadow-sm mb-4 active:opacity-80"
        >
          <View className="flex-row items-center gap-3.5">
            <View className="w-10 h-10 rounded-xl bg-[#FFF8EB] border border-[#FDE68A] items-center justify-center">
              <Lock size={20} color="#D97706" />
            </View>
            <View>
              <Text className="text-sm font-bold text-[#0D2B34]">
                Gói Focus Insights Pro
              </Text>
              <Text className="text-xs text-[#5E7A85] mt-0.5">
                Báo cáo & lịch thông minh
              </Text>
            </View>
          </View>

          <View className="bg-[#0D2B34] px-3.5 py-1 rounded-full">
            <Text className="text-xs font-bold text-white">Pro</Text>
          </View>
        </Pressable>

        {/* Trợ giúp */}
        <Pressable
          onPress={() => Alert.alert('Trợ giúp & Hỗ trợ', 'Liên hệ support@mipause.io hoặc xem tài liệu hướng dẫn Calm Technology.')}
          accessibilityRole="button"
          className="bg-white rounded-3xl p-4 border border-[#E1EBEA] flex-row items-center justify-between shadow-sm active:opacity-80"
        >
          <View className="flex-row items-center gap-3.5">
            <View className="w-9 h-9 rounded-xl bg-[#EFF5F5] items-center justify-center">
              <HelpCircle size={18} color="#0D2B34" />
            </View>
            <Text className="text-sm font-bold text-[#0D2B34]">
              Trợ giúp
            </Text>
          </View>
          <ChevronRight size={18} color="#8DA6B2" />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
