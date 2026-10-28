/**
 * @file app/insights/upgrade-pro.tsx
 * @description Screen s30: Giới thiệu Pro (Focus Insights Pro Upsell).
 * HTA 8: Must have #8. Persona Mai (nhạy cảm giá, so sánh gói tháng / năm).
 * Highlights advanced neuro-analytics features (peak hours, monthly trends, smart scheduling, PDF/CSV export)
 * with clear pricing tiers and risk-free trial messaging.
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  X,
  Clock,
  TrendingUp,
  Calendar,
  Share2,
} from 'lucide-react-native';

export default function UpgradeProScreen() {
  const router = useRouter();

  // Pricing plan selector ('annual' selected by default matching Figma s30)
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('annual');

  /**
   * Handle Pro activation
   */
  const handleUpgrade = () => {
    Alert.alert(
      'Nâng cấp thành công!',
      'Chào mừng bạn đến với Focus Insights Pro. Toàn bộ tính năng phân tích nâng cao đã được kích hoạt.',
      [
        {
          text: 'Khám phá ngay',
          onPress: () => {
            router.replace({
              pathname: '/(tabs)/insights',
              params: { isProActive: 'true' },
            });
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0D2B34]">
      {/* Top Dark Teal Header with Close Button */}
      <View className="px-5 pt-3 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          <View className="bg-[#EAA01B] px-3 py-0.5 rounded-full">
            <Text className="text-xs font-black text-[#0D2B34]">PRO</Text>
          </View>

          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Đóng"
            className="w-9 h-9 rounded-full bg-[#1A3A44] items-center justify-center active:opacity-75"
          >
            <X size={18} color="#FFFFFF" />
          </Pressable>
        </View>

        <Text className="text-2xl font-black text-white tracking-tight">
          Focus Insights Pro
        </Text>
        <Text className="text-xs text-[#8DA6B2] font-medium mt-1">
          Biến dữ liệu não thành lịch làm việc
        </Text>
      </View>

      {/* Main Content Area (Light Background Container) */}
      <View className="flex-1 bg-[#EFF3F3] rounded-t-[32px] px-4 pt-5">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
          {/* Feature Highlights Card (4 rows) */}
          <View className="bg-white rounded-3xl p-4 border border-[#E1EBEA] shadow-sm mb-5">
            {/* Row 1: Khung giờ tập trung đỉnh */}
            <View className="flex-row items-center gap-3.5 py-2.5 border-b border-[#F0F4F4]">
              <View className="w-10 h-10 rounded-xl bg-[#EFF5F5] items-center justify-center">
                <Clock size={20} color="#0D2B34" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-[#0D2B34]">
                  Khung giờ tập trung đỉnh
                </Text>
                <Text className="text-xs text-[#5E7A85] mt-0.5">
                  Biết giờ nào bạn sắc nhất
                </Text>
              </View>
            </View>

            {/* Row 2: Xu hướng theo ngày & tháng */}
            <View className="flex-row items-center gap-3.5 py-2.5 border-b border-[#F0F4F4]">
              <View className="w-10 h-10 rounded-xl bg-[#EFF5F5] items-center justify-center">
                <TrendingUp size={20} color="#0D2B34" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-[#0D2B34]">
                  Xu hướng theo ngày & tháng
                </Text>
                <Text className="text-xs text-[#5E7A85] mt-0.5">
                  Báo cáo cá nhân hóa
                </Text>
              </View>
            </View>

            {/* Row 3: Lên lịch thông minh */}
            <View className="flex-row items-center gap-3.5 py-2.5 border-b border-[#F0F4F4]">
              <View className="w-10 h-10 rounded-xl bg-[#EFF5F5] items-center justify-center">
                <Calendar size={20} color="#0D2B34" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-[#0D2B34]">
                  Lên lịch thông minh
                </Text>
                <Text className="text-xs text-[#5E7A85] mt-0.5">
                  Xếp việc khó vào giờ đỉnh
                </Text>
              </View>
            </View>

            {/* Row 4: Xuất PDF / CSV */}
            <View className="flex-row items-center gap-3.5 py-2.5">
              <View className="w-10 h-10 rounded-xl bg-[#EFF5F5] items-center justify-center">
                <Share2 size={20} color="#0D2B34" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-[#0D2B34]">
                  Xuất PDF / CSV
                </Text>
                <Text className="text-xs text-[#5E7A85] mt-0.5">
                  Lưu hoặc chia sẻ báo cáo
                </Text>
              </View>
            </View>
          </View>

          {/* Pricing Selector: Tháng vs Năm */}
          <View className="flex-row items-center gap-3 mb-6">
            {/* Option 1: Tháng */}
            <Pressable
              onPress={() => setSelectedPlan('monthly')}
              accessibilityRole="radio"
              accessibilityState={{ checked: selectedPlan === 'monthly' }}
              className={`flex-1 rounded-2xl p-4 border active:opacity-85 shadow-sm ${
                selectedPlan === 'monthly'
                  ? 'border-2 border-[#EAA01B] bg-[#FFF8EB]'
                  : 'border-[#E1EBEA] bg-white'
              }`}
            >
              <Text className="text-xs font-bold text-[#5E7A85]">Tháng</Text>
              <Text className="text-lg font-black text-[#0D2B34] my-1">
                79.000đ
              </Text>
              <Text className="text-[10px] text-[#8DA6B2]">
                Thanh toán hàng tháng
              </Text>
            </Pressable>

            {/* Option 2: Năm (Selected) */}
            <Pressable
              onPress={() => setSelectedPlan('annual')}
              accessibilityRole="radio"
              accessibilityState={{ checked: selectedPlan === 'annual' }}
              className={`flex-1 rounded-2xl p-4 border active:opacity-85 shadow-sm ${
                selectedPlan === 'annual'
                  ? 'border-2 border-[#EAA01B] bg-[#FFF8EB]'
                  : 'border-[#E1EBEA] bg-white'
              }`}
            >
              <Text className="text-xs font-bold text-[#D97706]">Năm</Text>
              <Text className="text-lg font-black text-[#0D2B34] my-1">
                599.000đ
              </Text>
              <Text className="text-[10px] font-bold text-[#D97706]">
                Tiết kiệm hơn 35%
              </Text>
            </Pressable>
          </View>

          {/* Primary CTA Button */}
          <Pressable
            onPress={handleUpgrade}
            accessibilityRole="button"
            accessibilityLabel="Nâng cấp Pro"
            className="w-full py-4 rounded-2xl bg-[#EAA01B] items-center justify-center active:opacity-85 shadow-sm"
          >
            <Text className="text-base font-bold text-[#0D2B34]">
              Nâng cấp Pro
            </Text>
          </Pressable>

          {/* Bottom Footnotes */}
          <Text className="text-[11px] text-[#8DA6B2] text-center mt-3">
            Hủy bất cứ lúc nào · Khôi phục giao dịch
          </Text>

          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            className="py-2.5 items-center mt-1 active:opacity-70"
          >
            <Text className="text-xs font-bold text-[#0D2B34] underline">
              Để sau
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
