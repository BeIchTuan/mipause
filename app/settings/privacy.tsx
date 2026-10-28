/**
 * @file app/settings/privacy.tsx
 * @description Screens s26 & s27: Quyền riêng tư & EEG và Xác nhận xóa dữ liệu.
 * HTA 6 & HTA 7: Must have #6, #7. Persona Duy (ưu tiên bảo mật dữ liệu não).
 * Allows toggling local-first on-device storage vs encrypted cloud sync,
 * and provides an irreversible deletion confirmation modal requiring explicit typing "XÓA".
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, AlertTriangle } from 'lucide-react-native';

export default function PrivacySettingsScreen() {
  const router = useRouter();

  // Storage preference state (defaults to 'local' matching Figma s26)
  const [storageDestination, setStorageDestination] = useState<'local' | 'cloud'>('local');

  // Deletion confirmation modal state (Figma s27)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
  const [confirmInputText, setConfirmInputText] = useState<string>('');

  const isDeleteAllowed = confirmInputText.trim().toUpperCase() === 'XÓA';

  /**
   * Handle executing deletion of all EEG data
   */
  const handleExecuteDeletion = () => {
    if (!isDeleteAllowed) return;

    setIsDeleteModalVisible(false);
    setConfirmInputText('');
    Alert.alert(
      'Đã xóa toàn bộ dữ liệu EEG',
      '24 phiên tập trung đã được xóa hoàn toàn khỏi bộ nhớ thiết bị theo nguyên tắc Local-First.'
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#EFF3F3] px-4 justify-between pb-6">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
        <View>
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
              Quyền riêng tư & EEG
            </Text>
          </View>

          {/* Privacy Transparency Table Card (Figma s26) */}
          <View className="bg-white rounded-3xl p-5 border border-[#E1EBEA] shadow-sm mb-6">
            {/* Row 1: Thu thập */}
            <View className="flex-row items-center py-2 border-b border-[#F0F4F4]">
              <View className="bg-[#EFF5F5] px-2.5 py-1 rounded-lg w-20 items-center mr-3 border border-[#E1EBEA]">
                <Text className="text-xs font-bold text-[#0D2B34]">Thu thập</Text>
              </View>
              <Text className="text-xs font-medium text-[#0D2B34] flex-1">
                sóng EEG & chỉ số phiên
              </Text>
            </View>

            {/* Row 2: Dùng để */}
            <View className="flex-row items-center py-2 border-b border-[#F0F4F4]">
              <View className="bg-[#EFF5F5] px-2.5 py-1 rounded-lg w-20 items-center mr-3 border border-[#E1EBEA]">
                <Text className="text-xs font-bold text-[#0D2B34]">Dùng để</Text>
              </View>
              <Text className="text-xs font-medium text-[#0D2B34] flex-1">
                tính mức tỉnh táo, báo cáo
              </Text>
            </View>

            {/* Row 3: Lưu ở */}
            <View className="flex-row items-center py-2">
              <View className="bg-[#EFF5F5] px-2.5 py-1 rounded-lg w-20 items-center mr-3 border border-[#E1EBEA]">
                <Text className="text-xs font-bold text-[#0D2B34]">Lưu ở</Text>
              </View>
              <Text className="text-xs font-medium text-[#0D2B34] flex-1">
                bạn chọn bên dưới
              </Text>
            </View>

            {/* Full Policy Link */}
            <Pressable
              onPress={() => Alert.alert('Chính sách bảo mật', 'Dữ liệu EEG được mã hóa AES-256 trên thiết bị của bạn. MiPause cam kết không chia sẻ dữ liệu não bộ cho bên thứ ba mà không có sự đồng ý của bạn.')}
              className="mt-3 pt-2 border-t border-[#F0F4F4] active:opacity-70"
            >
              <Text className="text-xs font-bold text-[#0D2B34] underline">
                Đọc chính sách đầy đủ &gt;
              </Text>
            </Pressable>
          </View>

          {/* Section: Nơi lưu trữ dữ liệu */}
          <Text className="text-base font-bold text-[#0D2B34] mb-3">
            Nơi lưu trữ dữ liệu
          </Text>

          {/* Radio Option 1: Trên điện thoại */}
          <Pressable
            onPress={() => setStorageDestination('local')}
            accessibilityRole="radio"
            accessibilityState={{ checked: storageDestination === 'local' }}
            className={`rounded-2xl p-4 flex-row items-center gap-3.5 mb-3 bg-white border active:opacity-80 shadow-sm ${
              storageDestination === 'local'
                ? 'border-[#0D2B34] bg-[#F7FAFA]'
                : 'border-[#E1EBEA]'
            }`}
          >
            <View
              className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                storageDestination === 'local'
                  ? 'border-[#0D2B34]'
                  : 'border-[#CBDAD8]'
              }`}
            >
              {storageDestination === 'local' && (
                <View className="w-2.5 h-2.5 rounded-full bg-[#0D2B34]" />
              )}
            </View>

            <View className="flex-1">
              <Text className="text-sm font-bold text-[#0D2B34]">
                Trên điện thoại
              </Text>
              <Text className="text-xs text-[#5E7A85] mt-0.5">
                Mặc định · không rời khỏi máy
              </Text>
            </View>
          </Pressable>

          {/* Radio Option 2: Đám mây */}
          <Pressable
            onPress={() => setStorageDestination('cloud')}
            accessibilityRole="radio"
            accessibilityState={{ checked: storageDestination === 'cloud' }}
            className={`rounded-2xl p-4 flex-row items-center gap-3.5 bg-white border active:opacity-80 shadow-sm ${
              storageDestination === 'cloud'
                ? 'border-[#0D2B34] bg-[#F7FAFA]'
                : 'border-[#E1EBEA]'
            }`}
          >
            <View
              className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                storageDestination === 'cloud'
                  ? 'border-[#0D2B34]'
                  : 'border-[#CBDAD8]'
              }`}
            >
              {storageDestination === 'cloud' && (
                <View className="w-2.5 h-2.5 rounded-full bg-[#0D2B34]" />
              )}
            </View>

            <View className="flex-1">
              <Text className="text-sm font-bold text-[#0D2B34]">
                Đám mây
              </Text>
              <Text className="text-xs text-[#5E7A85] mt-0.5">
                Đồng bộ nhiều thiết bị
              </Text>
            </View>
          </Pressable>
        </View>

        {/* Bottom Danger Action: Xóa toàn bộ lịch sử EEG (Triggers s27) */}
        <View className="pt-6">
          <Pressable
            onPress={() => setIsDeleteModalVisible(true)}
            accessibilityRole="button"
            accessibilityLabel="Xóa toàn bộ lịch sử EEG"
            className="w-full py-4 rounded-2xl bg-white border border-[#E06D53] items-center justify-center active:opacity-75"
          >
            <Text className="text-sm font-bold text-[#E06D53]">
              Xóa toàn bộ lịch sử EEG
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Screen s27: Modal Xác nhận xóa */}
      <Modal
        visible={isDeleteModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsDeleteModalVisible(false)}
      >
        <View className="flex-1 bg-black/60 items-center justify-center px-5">
          <View className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl items-center">
            {/* Warning triangle icon in soft red circle */}
            <View className="w-16 h-16 rounded-full bg-[#FDF0ED] items-center justify-center mb-3">
              <AlertTriangle size={30} color="#E06D53" strokeWidth={2.2} />
            </View>

            {/* Title */}
            <Text className="text-lg font-black text-[#0D2B34] text-center mb-1.5">
              Xóa toàn bộ lịch sử EEG?
            </Text>

            {/* Description */}
            <Text className="text-xs text-[#5E7A85] text-center leading-5 mb-4">
              Không thể hoàn tác. Gồm 24 phiên đã lưu trên máy này.
            </Text>

            {/* Confirmation text input */}
            <TextInput
              value={confirmInputText}
              onChangeText={setConfirmInputText}
              placeholder="Gõ XÓA để xác nhận"
              placeholderTextColor="#8DA6B2"
              autoCapitalize="characters"
              className="w-full bg-[#EFF5F5] border border-[#CBDAD8] rounded-xl px-4 py-3 text-center text-sm font-bold text-[#0D2B34] mb-4"
            />

            {/* Action buttons row */}
            <View className="flex-row items-center gap-3 w-full">
              <Pressable
                onPress={() => {
                  setIsDeleteModalVisible(false);
                  setConfirmInputText('');
                }}
                accessibilityRole="button"
                className="flex-1 py-3 bg-white border border-[#CBDAD8] rounded-xl items-center active:opacity-75"
              >
                <Text className="text-sm font-bold text-[#0D2B34]">Hủy</Text>
              </Pressable>

              <Pressable
                onPress={handleExecuteDeletion}
                disabled={!isDeleteAllowed}
                accessibilityRole="button"
                accessibilityState={{ disabled: !isDeleteAllowed }}
                className={`flex-1 py-3 rounded-xl items-center ${
                  isDeleteAllowed
                    ? 'bg-[#E06D53] active:opacity-85'
                    : 'bg-[#E2E8F0]'
                }`}
              >
                <Text
                  className={`text-sm font-bold ${
                    isDeleteAllowed ? 'text-white' : 'text-[#94A3B8]'
                  }`}
                >
                  Xóa
                </Text>
              </Pressable>
            </View>

            {/* Note */}
            <Text className="text-[11px] text-[#8DA6B2] text-center mt-3">
              Nút &quot;Xóa&quot; chỉ bật khi gõ đúng
            </Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
