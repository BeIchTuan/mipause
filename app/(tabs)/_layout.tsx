/**
 * @file app/(tabs)/_layout.tsx
 * @description Expo Router bottom tab navigator layout.
 * Mapped pixel-perfect to Figma s9 bottom navigation bar:
 * Active tab has an oval teal pill highlight (#DCEDE9) with dark teal icon and label.
 */

import React from 'react';
import { View } from 'react-native';
import { Tabs } from 'expo-router';
import { Play, Calendar, BarChart2, Settings } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0D2B34',
        tabBarInactiveTintColor: '#64748B',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E1EBEA',
          height: 68,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Phiên',
          tabBarIcon: ({ focused, size }) => (
            <View
              className={`items-center justify-center rounded-full px-4 py-1 ${
                focused ? 'bg-[#DCEDE9]' : ''
              }`}
            >
              <Play
                size={18}
                color={focused ? '#0D2B34' : '#64748B'}
                fill={focused ? '#0D2B34' : 'transparent'}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Nhật ký',
          tabBarIcon: ({ focused, size }) => (
            <View
              className={`items-center justify-center rounded-full px-4 py-1 ${
                focused ? 'bg-[#DCEDE9]' : ''
              }`}
            >
              <Calendar size={18} color={focused ? '#0D2B34' : '#64748B'} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Insights',
          tabBarIcon: ({ focused, size }) => (
            <View
              className={`items-center justify-center rounded-full px-4 py-1 ${
                focused ? 'bg-[#DCEDE9]' : ''
              }`}
            >
              <BarChart2 size={18} color={focused ? '#0D2B34' : '#64748B'} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Cài đặt',
          tabBarIcon: ({ focused, size }) => (
            <View
              className={`items-center justify-center rounded-full px-4 py-1 ${
                focused ? 'bg-[#DCEDE9]' : ''
              }`}
            >
              <Settings size={18} color={focused ? '#0D2B34' : '#64748B'} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
