/**
 * @file components/ui/Switch.tsx
 * @description Accessible toggle switch component matching iOS/Android design standards.
 */

import React from 'react';
import { View, Text, Switch as RNSwitch, Pressable } from 'react-native';

export interface SwitchRowProps {
  /** Primary label of setting */
  label: string;
  /** Explanatory subtext / description */
  description?: string;
  /** Current switch boolean value */
  value: boolean;
  /** Value change callback */
  onValueChange: (val: boolean) => void;
  /** Optional icon */
  icon?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
}

/**
 * SwitchRow Component
 * Provides a clean row with title, description, and toggle switch.
 */
export const SwitchRow: React.FC<SwitchRowProps> = ({
  label,
  description,
  value,
  onValueChange,
  icon,
  disabled = false,
}) => {
  return (
    <Pressable
      onPress={() => !disabled && onValueChange(!value)}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      className="flex-row items-center justify-between py-3.5 border-b border-slate-100 dark:border-slate-800/80 active:opacity-80"
    >
      <View className="flex-1 mr-4">
        <View className="flex-row items-center gap-2">
          {icon && <View>{icon}</View>}
          <Text className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            {label}
          </Text>
        </View>
        {description && (
          <Text className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-4">
            {description}
          </Text>
        )}
      </View>

      <RNSwitch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{ false: '#CBD5E1', true: '#E58B00' }}
        thumbColor={value ? '#FFFFFF' : '#F8FAFC'}
        ios_backgroundColor="#CBD5E1"
      />
    </Pressable>
  );
};
