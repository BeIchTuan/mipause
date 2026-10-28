/**
 * @file components/ui/Button.tsx
 * @description Accessible button primitive built on React Native Pressable.
 * Supports active feedback, loading state, icon slots, and variant styling.
 */

import React from 'react';
import { Pressable, Text, PressableProps, ActivityIndicator, View } from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'dark' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  /** Text content displayed within button */
  title: string;
  /** Visual hierarchy */
  variant?: ButtonVariant;
  /** Button sizing */
  size?: ButtonSize;
  /** Optional icon rendered on the left */
  iconLeft?: React.ReactNode;
  /** Optional icon rendered on the right */
  iconRight?: React.ReactNode;
  /** Loading spinner indicator */
  isLoading?: boolean;
  /** Custom class names */
  className?: string;
  /** Text class names */
  textClassName?: string;
}

const VARIANT_CONTAINER: Record<ButtonVariant, string> = {
  primary: 'bg-primary active:opacity-85 active:scale-[0.99]',
  secondary: 'bg-white border border-border active:opacity-70',
  outline: 'bg-white border border-[#0D2B34] active:opacity-70',
  dark: 'bg-focusDark-surface/90 border border-focusDark-border active:opacity-70',
  ghost: 'bg-transparent active:opacity-60',
};

const VARIANT_TEXT: Record<ButtonVariant, string> = {
  primary: 'text-[#0D2B34] font-bold',
  secondary: 'text-[#0D2B34] font-semibold',
  outline: 'text-[#0D2B34] font-semibold',
  dark: 'text-white font-semibold',
  ghost: 'text-primary font-semibold',
};

const SIZE_CONTAINER: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 rounded-xl',
  md: 'px-4 py-3.5 rounded-2xl',
  lg: 'px-6 py-4 rounded-2xl',
};

const SIZE_TEXT: Record<ButtonSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

/**
 * Button Component
 * @param props ButtonProps
 * @returns JSX.Element
 */
export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'lg',
  iconLeft,
  iconRight,
  isLoading = false,
  disabled = false,
  className = '',
  textClassName = '',
  ...rest
}) => {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled, busy: isLoading }}
      disabled={disabled || isLoading}
      className={`flex-row items-center justify-center gap-2 ${VARIANT_CONTAINER[variant]} ${SIZE_CONTAINER[size]} ${
        disabled ? 'opacity-50' : ''
      } ${className}`}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'primary' ? '#FFFFFF' : '#E58B00'} size="small" />
      ) : (
        <>
          {iconLeft && <View>{iconLeft}</View>}
          <Text className={`text-center ${VARIANT_TEXT[variant]} ${SIZE_TEXT[size]} ${textClassName}`}>
            {title}
          </Text>
          {iconRight && <View>{iconRight}</View>}
        </>
      )}
    </Pressable>
  );
};
