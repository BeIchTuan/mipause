/**
 * @file app/_layout.tsx
 * @description Root application layout configuring SafeAreaProvider and navigation stacks.
 * Supports Figma prototype flow: Onboarding (s1-s4) -> Dashboard (s9) -> Focus Session (s10-s12).
 */

import '../global.css';
import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#EFF3F3' },
        }}
      >
        {/* Onboarding Flow: Figma Hình 1 (node-id=1-2) */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="onboarding/permissions"
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="onboarding/connect-method"
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="onboarding/scan-qr"
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />

        {/* Primary App Dashboard Tabs: Figma Hình 3 (s9) */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Focus Session Management: Figma s10, s11, s12, s21 */}
        <Stack.Screen
          name="session/setup"
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="session/active"
          options={{
            headerShown: false,
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="session/paused"
          options={{
            headerShown: false,
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="session/summary"
          options={{
            headerShown: false,
            animation: 'slide_from_bottom',
          }}
        />

        {/* History Breakdown & Detail: Figma s23, s24 */}
        <Stack.Screen
          name="history/day"
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="history/detail"
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />

        {/* Settings, EEG Privacy & Accessibility: Figma s26, s28 */}
        <Stack.Screen
          name="settings/privacy"
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="settings/accessibility"
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />

        {/* Pro Upsell: Figma s30 */}
        <Stack.Screen
          name="insights/upgrade-pro"
          options={{
            headerShown: false,
            animation: 'slide_from_bottom',
            presentation: 'modal',
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
