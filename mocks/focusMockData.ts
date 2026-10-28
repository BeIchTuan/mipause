/**
 * @file mocks/focusMockData.ts
 * @description Standalone mock dataset exactly mirroring the Figma prototype screens (s9, s10, s11, s12).
 * Allows previewing and interacting with the UI in Expo Go immediately without external backends.
 */

import { FocusSession, HeadbandDevice, UserFocusSettings, EEGDataPoint, CognitiveState } from '../types/focus';

/**
 * Connected headband device telemetry
 */
export const MOCK_HEADBAND: HeadbandDevice = {
  id: 'ble-mipause-001',
  name: 'MiPause-A3F2',
  isConnected: true,
  batteryLevel: 88,
  sensorContact: 'good',
  rssi: -58,
};

/**
 * User focus preferences
 */
export const MOCK_USER_SETTINGS: UserFocusSettings = {
  defaultDurationMinutes: 120,
  isAdaptiveBreakEnabled: true,
  isFocusShieldEnabled: true,
  isHeadbandComfortReminderEnabled: true,
  alertSensitivity: 'medium',
  hapticMode: 'subtle_double_tap',
};

/**
 * 15-minute EEG trendline points for real-time visualization (s11)
 */
export const MOCK_EEG_TREND: EEGDataPoint[] = [
  { timestamp: 1734500000000, attentionScore: 82, fatigueScore: 18, signalQuality: 98 },
  { timestamp: 1734500120000, attentionScore: 85, fatigueScore: 16, signalQuality: 99 },
  { timestamp: 1734500240000, attentionScore: 88, fatigueScore: 14, signalQuality: 98 },
  { timestamp: 1734500360000, attentionScore: 84, fatigueScore: 20, signalQuality: 97 },
  { timestamp: 1734500480000, attentionScore: 79, fatigueScore: 26, signalQuality: 99 },
  { timestamp: 1734500600000, attentionScore: 76, fatigueScore: 30, signalQuality: 96 },
  { timestamp: 1734500720000, attentionScore: 80, fatigueScore: 28, signalQuality: 98 },
  { timestamp: 1734500840000, attentionScore: 78, fatigueScore: 32, signalQuality: 99 },
  { timestamp: 1734500960000, attentionScore: 74, fatigueScore: 36, signalQuality: 95 },
  { timestamp: 1734501080000, attentionScore: 71, fatigueScore: 40, signalQuality: 97 },
];

/**
 * Recent sessions list displayed on Home Screen s9
 */
export const MOCK_RECENT_SESSIONS: FocusSession[] = [
  {
    id: 'sess-001',
    startTime: Date.now() - 86400000,
    endTime: Date.now() - 86400000 + 5700000,
    durationSeconds: 5700, // 1g35p
    targetDurationMinutes: 90,
    status: 'completed',
    quality: 'fair',
    dateLabel: 'Hôm qua · 1g35p',
    durationLabel: '1g35p',
    eegTrend: MOCK_EEG_TREND,
  },
  {
    id: 'sess-002',
    startTime: Date.now() - 86400000 * 3,
    endTime: Date.now() - 86400000 * 3 + 3300000,
    durationSeconds: 3300, // 55p
    targetDurationMinutes: 60,
    status: 'completed',
    quality: 'good',
    dateLabel: 'Thứ Hai · 55p',
    durationLabel: '55p',
    eegTrend: MOCK_EEG_TREND,
  },
];

/**
 * Presentation configuration for each cognitive state
 */
export interface CognitiveStateConfig {
  label: string;
  subtext: string;
  patternLabel: string;
  badgeText: string;
  hapticPrompt: string;
  themeColor: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

export const COGNITIVE_STATE_CONFIGS: Record<CognitiveState, CognitiveStateConfig> = {
  alert: {
    label: 'TỈNH TÁO',
    subtext: 'Duy trì tốt · xanh - chậm',
    patternLabel: 'xanh · nhịp êm',
    badgeText: 'Tốt',
    hapticPrompt: 'Không rung · chỉ hiển thị trạng thái',
    themeColor: '#2DB872',
    bgColor: '#E6F8EF',
    borderColor: '#2DB872',
    textColor: '#2DB872',
  },
  reduced: {
    label: 'HƠI GIẢM',
    subtext: 'Vẫn ổn · theo dõi',
    patternLabel: 'vàng · sọc chéo',
    badgeText: 'Khá',
    hapticPrompt: 'Không rung · chỉ ghi nhận ngầm',
    themeColor: '#E5A91A',
    bgColor: '#FEF8E7',
    borderColor: '#E5A91A',
    textColor: '#E5A91A',
  },
  fatigued: {
    label: 'MỆT MỎI',
    subtext: 'Nên nghỉ 5 phút',
    patternLabel: 'cam · đan chéo',
    badgeText: 'Nên nghỉ',
    hapticPrompt: 'Rung kép nhẹ + âm êm, nhắc định kỳ',
    themeColor: '#E06D53',
    bgColor: '#FDF0ED',
    borderColor: '#E06D53',
    textColor: '#E06D53',
  },
  lost_signal: {
    label: 'MẤT TÍN HIỆU',
    subtext: 'Kiểm tra headband',
    patternLabel: 'xám · viền đứt',
    badgeText: 'Lỗi',
    hapticPrompt: 'Rung 1 nhịp dài + đọc thông báo',
    themeColor: '#6B828D',
    bgColor: '#F1F5F7',
    borderColor: '#6B828D',
    textColor: '#6B828D',
  },
};
