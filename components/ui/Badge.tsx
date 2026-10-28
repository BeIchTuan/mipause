/**
 * @file components/ui/Badge.tsx
 * @description Flexible status badge primitive matching @react-native-reusables philosophy.
 * Renders status pills with dot indicators and accessible color contracts.
 */

import React from 'react';
import { View, Text, ViewProps } from 'react-native';

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'neutral' | 'accent';

export interface BadgeProps extends ViewProps {
  /** Text content displayed inside badge */
  label: string;
  /** Visual variant controlling background and text colors */
  variant?: BadgeVariant;
  /** Display a preceding status dot indicator */
  showDot?: boolean;
  /** Optional custom class name overrides */
  className?: string;
}

const VARIANT_STYLES: Record<BadgeVariant, { container: string; text: string; dot: string }> = {
  success: {
    container: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800',
    text: 'text-emerald-700 dark:text-emerald-400',
    dot: 'bg-emerald-500',
  },
  warning: {
    container: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800',
    text: 'text-amber-700 dark:text-amber-400',
    dot: 'bg-amber-500',
  },
  danger: {
    container: 'bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-800',
    text: 'text-orange-700 dark:text-orange-400',
    dot: 'bg-orange-500',
  },
  neutral: {
    container: 'bg-slate-100 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700',
    text: 'text-slate-700 dark:text-slate-300',
    dot: 'bg-slate-400',
  },
  accent: {
    container: 'bg-amber-100 dark:bg-amber-950/50 border-amber-300 dark:border-amber-700',
    text: 'text-amber-900 dark:text-amber-300',
    dot: 'bg-amber-600',
  },
};

/**
 * Badge Component
 * @param props BadgeProps
 * @returns JSX.Element
 */
export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'neutral',
  showDot = true,
  className = '',
  ...rest
}) => {
  const styles = VARIANT_STYLES[variant];

  return (
    <View
      accessibilityRole="text"
      className={`flex-row items-center px-2.5 py-1 rounded-full border self-start ${styles.container} ${className}`}
      {...rest}
    >
      {showDot && (
        <View className={`w-1.5 h-1.5 rounded-full mr-1.5 ${styles.dot}`} />
      )}
      <Text className={`text-xs font-medium ${styles.text}`}>
        {label}
      </Text>
    </View>
  );
};
