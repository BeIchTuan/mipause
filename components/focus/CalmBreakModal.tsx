/**
 * @file components/focus/CalmBreakModal.tsx
 * @description Non-intrusive Calm Technology break prompt modal (Figma s18 & s19).
 * Offers actionable, gentle fatigue remediation without jarring interruptions.
 */

import React, { useEffect } from 'react';
import { View, Text, Modal, Pressable } from 'react-native';
import { Coffee, Eye, Droplets, Headphones } from 'lucide-react-native';
import { Button } from '../ui/Button';

export interface CalmBreakModalProps {
  /** Visibility state */
  visible: boolean;
  /** Accept break action */
  onTakeBreak: () => void;
  /** Dismiss / Snooze break action */
  onDismiss: () => void;
  /** Auto-dismiss timeout in seconds (Calm Tech principle: auto minimizes if untouched) */
  autoDismissSeconds?: number;
}

/**
 * CalmBreakModal Component
 * @param props CalmBreakModalProps
 * @returns JSX.Element
 */
export const CalmBreakModal: React.FC<CalmBreakModalProps> = ({
  visible,
  onTakeBreak,
  onDismiss,
  autoDismissSeconds = 20,
}) => {
  useEffect(() => {
    if (!visible || !autoDismissSeconds) return;

    const timer = setTimeout(() => {
      onDismiss();
    }, autoDismissSeconds * 1000);

    return () => clearTimeout(timer);
  }, [visible, autoDismissSeconds, onDismiss]);

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onDismiss}
    >
      <View className="flex-1 bg-black/60 items-center justify-end p-4">
        <View className="w-full bg-card dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl">
          {/* Header Icon */}
          <View className="w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-950/60 items-center justify-center self-center mb-4">
            <Coffee size={28} color="#EA580C" />
          </View>

          {/* Heading and rationale */}
          <Text className="text-xl font-bold text-center text-slate-900 dark:text-white mb-2">
            Bạn có vẻ đang mệt
          </Text>
          <Text className="text-sm text-center text-slate-600 dark:text-slate-300 mb-6 leading-5">
            Nghỉ ngắn 5 phút giúp tái tạo nguồn năng lượng nhận thức và tập trung lâu hơn.
          </Text>

          {/* Micro-break recommendations */}
          <View className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 gap-2.5 mb-6">
            <View className="flex-row items-center gap-3">
              <Eye size={18} color="#0D9488" />
              <Text className="text-xs text-slate-700 dark:text-slate-200 font-medium">
                Nhìn xa 20 giây để thư giãn cơ mắt
              </Text>
            </View>
            <View className="flex-row items-center gap-3">
              <Droplets size={18} color="#0284C7" />
              <Text className="text-xs text-slate-700 dark:text-slate-200 font-medium">
                Uống một ngụm nước ấm
              </Text>
            </View>
            <View className="flex-row items-center gap-3">
              <Headphones size={18} color="#D97706" />
              <Text className="text-xs text-slate-700 dark:text-slate-200 font-medium">
                Gợi ý: tháo headband khi nghỉ để thư giãn thái dương
              </Text>
            </View>
          </View>

          {/* Action buttons */}
          <Button
            title="Nghỉ giải lao 5 phút"
            variant="primary"
            onPress={onTakeBreak}
            className="mb-3"
          />

          <Button
            title="Bỏ qua & tiếp tục"
            variant="outline"
            onPress={onDismiss}
          />

          <Text className="text-[11px] text-center text-slate-400 mt-4">
            Tự thu nhỏ sau {autoDismissSeconds} giây nếu không chạm
          </Text>
        </View>
      </View>
    </Modal>
  );
};
