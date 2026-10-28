/**
 * @file app/onboarding/permissions.tsx
 * @description Screen s2: Quyền & dữ liệu (Figma Hình 1 · node-id=1-2).
 * Transparent permission request explaining Bluetooth, EEG data privacy,
 * and haptic notifications with standard consent CTAs.
 */

import React from 'react';
import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Bluetooth, ShieldCheck, Bell } from 'lucide-react-native';
import { Button } from '../../components/ui/Button';

export default function PermissionsScreen() {
  const router = useRouter();

  const handleAgree = () => {
    router.push('/onboarding/connect-method');
  };

  const handleDisagree = () => {
    Alert.alert(
      'Cần quyền truy cập',
      'MiPause cần Bluetooth và quyền thông báo để đọc nhịp sóng não và gửi tín hiệu nghỉ ngơi.',
      [
        { text: 'Quay lại', style: 'cancel' },
        { text: 'Vẫn bỏ qua', onPress: () => router.replace('/(tabs)') },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#EFF3F3]">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {/* Main Title & Subtitle */}
          <Text className="text-3xl font-black text-[#0D2B34] mt-4 mb-2 tracking-tight">
            Trước khi bắt đầu
          </Text>

          <Text className="text-sm font-medium text-[#5E7A85] mb-6">
            Ba quyền để MiPause hoạt động đúng cách.
          </Text>

          {/* 3 Permissions Card */}
          <View className="bg-white rounded-3xl border border-[#E1EBEA] p-2 shadow-sm mb-6">
            {/* Permission 1: Bluetooth */}
            <View className="flex-row items-center gap-4 p-3.5">
              <View className="w-12 h-12 rounded-2xl bg-[#E5F2EE] items-center justify-center">
                <Bluetooth size={22} color="#0D2B34" strokeWidth={2.2} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-[#0D2B34] mb-0.5">
                  Bluetooth
                </Text>
                <Text className="text-xs font-medium text-[#5E7A85]">
                  Để kết nối headband
                </Text>
              </View>
            </View>

            <View className="h-[1px] bg-[#EAEFEF] mx-3" />

            {/* Permission 2: EEG Data Privacy */}
            <View className="flex-row items-center gap-4 p-3.5">
              <View className="w-12 h-12 rounded-2xl bg-[#E5F2EE] items-center justify-center">
                <ShieldCheck size={22} color="#0D2B34" strokeWidth={2.2} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-[#0D2B34] mb-0.5">
                  Dữ liệu EEG của bạn
                </Text>
                <Text className="text-xs font-medium text-[#5E7A85] leading-4">
                  Lưu trên máy hoặc đám mây, bạn xóa được bất cứ lúc nào
                </Text>
              </View>
            </View>

            <View className="h-[1px] bg-[#EAEFEF] mx-3" />

            {/* Permission 3: Notifications & Haptics */}
            <View className="flex-row items-center gap-4 p-3.5">
              <View className="w-12 h-12 rounded-2xl bg-[#E5F2EE] items-center justify-center">
                <Bell size={22} color="#0D2B34" strokeWidth={2.2} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-[#0D2B34] mb-0.5">
                  Thông báo & rung
                </Text>
                <Text className="text-xs font-medium text-[#5E7A85]">
                  Để nhắc nghỉ nhẹ nhàng
                </Text>
              </View>
            </View>
          </View>

          {/* Privacy Policy Link */}
          <Pressable
            accessibilityRole="button"
            className="items-center py-2 active:opacity-70"
          >
            <Text className="text-sm font-bold text-[#0D2B34] underline">
              Đọc chính sách đầy đủ ›
            </Text>
          </Pressable>
        </View>

        {/* Bottom Actions */}
        <View className="mt-6 gap-3">
          <Button
            title="Đồng ý & tiếp tục"
            variant="primary"
            size="lg"
            onPress={handleAgree}
            className="w-full py-4 rounded-2xl bg-[#EAA01B]"
            textClassName="text-[#0D2B34] font-bold text-base"
          />

          <Button
            title="Không đồng ý"
            variant="outline"
            size="lg"
            onPress={handleDisagree}
            className="w-full py-4 rounded-2xl bg-white border border-[#0D2B34]"
            textClassName="text-[#0D2B34] font-bold text-base"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
