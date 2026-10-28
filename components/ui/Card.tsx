/**
 * @file components/ui/Card.tsx
 * @description Standard Card component wrapper providing uniform padding,
 * corner radius, elevation, and border tokens.
 */

import React from 'react';
import { View, ViewProps } from 'react-native';

export interface CardProps extends ViewProps {
  /** Optional variant for dark immersion focus screens */
  variant?: 'default' | 'focusDark' | 'dashed';
  /** Custom classes */
  className?: string;
  children: React.ReactNode;
}

/**
 * Card Component
 * @param props CardProps
 * @returns JSX.Element
 */
export const Card: React.FC<CardProps> = ({
  variant = 'default',
  className = '',
  children,
  ...rest
}) => {
  let baseStyle = 'p-4 rounded-2xl ';

  if (variant === 'focusDark') {
    baseStyle += 'bg-focusDark-surface border border-focusDark-border ';
  } else if (variant === 'dashed') {
    baseStyle += 'bg-focusDark-surface/50 border-2 border-dashed border-focusDark-border rounded-3xl ';
  } else {
    baseStyle += 'bg-card dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm ';
  }

  return (
    <View className={`${baseStyle}${className}`} {...rest}>
      {children}
    </View>
  );
};
