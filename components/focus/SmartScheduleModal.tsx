/**
 * @file components/focus/SmartScheduleModal.tsx
 * @description Screen s32: Lên lịch thông minh & Xuất báo cáo (Smart Scheduling & Export Bottom Sheet).
 * HTA 8: Should have #6. Persona Duy (xuất dữ liệu) & Mai (lên lịch tối ưu giờ đỉnh).
 * Presents interactive suggestions to slot difficult tasks into biological peak focus hours,
 * and allows exporting reports in PDF or CSV formats.
 */

import React, { useState } from 'react';
import { View, Text, Modal, Pressable, ScrollView, Alert } from 'react-native';
import { Check } from 'lucide-react-native';

export interface SmartScheduleModalProps {
  visible: boolean;
  onClose: () => void;
}

interface SmartTask {
  id: string;
  title: string;
  timeSlot: string;
  checked: boolean;
}

export const SmartScheduleModal: React.FC<SmartScheduleModalProps> = ({ visible, onClose }) => {
  const [tasks, setTasks] = useState<SmartTask[]>([
    {
      id: 'task-1',
      title: 'Việc khó (API)',
      timeSlot: 'Thứ Hai · 09:00–11:00',
      checked: true,
    },
    {
      id: 'task-2',
      title: 'Họp & email',
      timeSlot: 'Thứ Ba · buổi chiều',
      checked: true,
    },
    {
      id: 'task-3',
      title: 'Nghỉ dài',
      timeSlot: 'Hàng ngày · 12:00–13:30',
      checked: false,
    },
  ]);

  const [exportFormat, setExportFormat] = useState<'PDF' | 'CSV'>('PDF');

  /**
   * Toggle task selection
   */
  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
    );
  };

  /**
   * Apply selected tasks to calendar
   */
  const handleApplySchedule = () => {
    const selectedCount = tasks.filter((t) => t.checked).length;
    Alert.alert(
      'Áp dụng thành công',
      `Đã đồng bộ ${selectedCount} khung giờ thông minh vào ứng dụng Lịch của bạn.`
    );
    onClose();
  };

  /**
   * Handle report export
   */
  const handleExport = () => {
    Alert.alert(
      'Xuất báo cáo',
      `Đã khởi tạo file báo cáo dạng ${exportFormat} gồm dữ liệu sóng não và biểu đồ 30 ngày.`
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 bg-black/60 justify-end">
        <Pressable className="flex-1" onPress={onClose} />

        <View className="bg-white rounded-t-[32px] p-6 shadow-2xl max-h-[85%]">
          {/* Top Drag Handle */}
          <View className="w-12 h-1.5 bg-[#CBDAD8] rounded-full self-center mb-5" />

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header Title */}
            <Text className="text-xl font-black text-[#0D2B34] tracking-tight">
              Lên lịch thông minh
            </Text>
            <Text className="text-xs text-[#5E7A85] font-medium mt-1 mb-5">
              Gợi ý dựa trên khung giờ tập trung đỉnh của bạn
            </Text>

            {/* Checklist of smart time slots */}
            <View className="mb-6">
              {tasks.map((task) => (
                <Pressable
                  key={task.id}
                  onPress={() => handleToggleTask(task.id)}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: task.checked }}
                  className="flex-row items-center gap-3.5 py-3 border-b border-[#F0F4F4] active:opacity-75"
                >
                  {/* Custom Checkbox */}
                  <View
                    className={`w-6 h-6 rounded-lg items-center justify-center border ${
                      task.checked
                        ? 'bg-[#0D2B34] border-[#0D2B34]'
                        : 'bg-white border-[#CBDAD8]'
                    }`}
                  >
                    {task.checked && <Check size={16} color="#FFFFFF" strokeWidth={3} />}
                  </View>

                  <View className="flex-1">
                    <Text className="text-sm font-bold text-[#0D2B34]">
                      {task.title}
                    </Text>
                    <Text className="text-xs text-[#5E7A85] mt-0.5">
                      {task.timeSlot}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>

            {/* CTA Button: Áp dụng vào lịch */}
            <Pressable
              onPress={handleApplySchedule}
              accessibilityRole="button"
              accessibilityLabel="Áp dụng vào lịch"
              className="w-full py-4 rounded-2xl bg-[#EAA01B] items-center justify-center active:opacity-85 mb-6"
            >
              <Text className="text-sm font-bold text-[#0D2B34]">
                Áp dụng vào lịch
              </Text>
            </Pressable>

            {/* Section: Xuất báo cáo */}
            <Text className="text-sm font-bold text-[#0D2B34] mb-3">
              Xuất báo cáo
            </Text>

            {/* PDF / CSV segmented selector */}
            <View className="flex-row items-center bg-[#EFF5F5] rounded-xl p-1 mb-3 border border-[#E1EBEA]">
              <Pressable
                onPress={() => setExportFormat('PDF')}
                className={`flex-1 py-2 items-center rounded-lg ${
                  exportFormat === 'PDF' ? 'bg-white shadow-sm' : ''
                }`}
              >
                <Text
                  className={`text-xs font-bold ${
                    exportFormat === 'PDF' ? 'text-[#0D2B34]' : 'text-[#5E7A85]'
                  }`}
                >
                  PDF
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setExportFormat('CSV')}
                className={`flex-1 py-2 items-center rounded-lg ${
                  exportFormat === 'CSV' ? 'bg-white shadow-sm' : ''
                }`}
              >
                <Text
                  className={`text-xs font-bold ${
                    exportFormat === 'CSV' ? 'text-[#0D2B34]' : 'text-[#5E7A85]'
                  }`}
                >
                  CSV
                </Text>
              </Pressable>
            </View>

            {/* Export Outline Button */}
            <Pressable
              onPress={handleExport}
              accessibilityRole="button"
              className="w-full py-3.5 rounded-xl border border-[#0D2B34] bg-white items-center justify-center active:opacity-75 mb-4"
            >
              <Text className="text-sm font-bold text-[#0D2B34]">
                Xuất
              </Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
