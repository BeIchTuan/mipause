/**
 * @file types/focus.ts
 * @description Domain models, state interfaces, and database entities for MiPause.
 * Designed with a Local-First architecture ready for Zustand, Expo SQLite, or Drizzle ORM.
 */

/**
 * Real-time cognitive state evaluated from raw EEG brainwave inputs
 */
export type CognitiveState = 'alert' | 'reduced' | 'fatigued' | 'lost_signal';

/**
 * Quality rating for finished focus sessions
 */
export type SessionQuality = 'good' | 'fair' | 'poor';

/**
 * Sensitivity thresholds for fatigue and distraction alerts
 */
export type AlertSensitivity = 'low' | 'medium' | 'high';

/**
 * Discrete EEG measurement point captured periodically (e.g., every 5s)
 */
export interface EEGDataPoint {
  /** Unix timestamp in milliseconds */
  timestamp: number;
  /** Attention / focus score normalized between 0 and 100 */
  attentionScore: number;
  /** Fatigue / drowsiness score normalized between 0 and 100 */
  fatigueScore: number;
  /** Signal contact quality percentage (0 - 100) */
  signalQuality: number;
}

/**
 * Focus session entity representing an active, paused, or logged focus period
 */
export interface FocusSession {
  /** Unique UUID identifier */
  id: string;
  /** Timestamp when session started (Unix ms) */
  startTime: number;
  /** Timestamp when session completed or stopped (Unix ms, null if ongoing) */
  endTime: number | null;
  /** Actual elapsed focus time in seconds */
  durationSeconds: number;
  /** Planned target duration in minutes (e.g., 30, 60, 120) */
  targetDurationMinutes: number;
  /** Current operational status of the session */
  status: 'running' | 'paused' | 'completed' | 'cancelled';
  /** Aggregate session quality for display badges */
  quality: SessionQuality;
  /** Human-readable session date string (e.g. "Hôm qua", "Thứ Hai") */
  dateLabel: string;
  /** Human-readable duration string (e.g. "1g35p", "55p") */
  durationLabel: string;
  /** Array of recorded EEG time-series points */
  eegTrend: EEGDataPoint[];
}

/**
 * Headband device connection and sensor telemetry
 */
export interface HeadbandDevice {
  /** BLE device identifier */
  id: string;
  /** Device model name (e.g. "MiPause-A3F2") */
  name: string;
  /** Connection state */
  isConnected: boolean;
  /** Battery percentage level (0-100) */
  batteryLevel: number;
  /** EEG sensor contact impedance status */
  sensorContact: 'good' | 'adjust_needed' | 'disconnected';
  /** Signal strength RSSI */
  rssi: number;
}

/**
 * User configuration settings stored locally on device
 */
export interface UserFocusSettings {
  /** Planned session duration in minutes */
  defaultDurationMinutes: number;
  /** Dynamically prompt breaks according to real brain state instead of rigid timers */
  isAdaptiveBreakEnabled: boolean;
  /** Block incoming phone notifications while in deep focus */
  isFocusShieldEnabled: boolean;
  /** Prompt user to loosen or take off headband periodically for skin comfort */
  isHeadbandComfortReminderEnabled: boolean;
  /** Sensitivity level for fatigue alarms */
  alertSensitivity: AlertSensitivity;
  /** Calm haptic feedback mode */
  hapticMode: 'subtle_double_tap' | 'silent_visual_only' | 'chime_low';
}

/**
 * Local-First repository interface for session persistence
 */
export interface IFocusSessionRepository {
  /** Fetch recent session logs */
  getRecentSessions(limit?: number): Promise<FocusSession[]>;
  /** Save newly completed session */
  saveSession(session: FocusSession): Promise<void>;
  /** Retrieve aggregate statistics */
  getWeeklySummary(): Promise<{ totalMinutes: number; averageFocusRate: number; breaksTaken: number }>;
}
