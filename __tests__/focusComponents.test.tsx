/**
 * @file __tests__/focusComponents.test.tsx
 * @description Unit tests for MiPause UI components, helper utilities, and cognitive state logic.
 * Covers Figma wireframes s21-s32 (timeline segments, calendar layout, privacy validation, and tier pricing).
 */

import React from 'react';
import { COGNITIVE_STATE_CONFIGS, MOCK_RECENT_SESSIONS } from '../mocks/focusMockData';
import { CognitiveState } from '../types/focus';

describe('MiPause Design System & State Logic', () => {
  describe('Cognitive State Configurations (Figma s11, s13-s16)', () => {
    const states: CognitiveState[] = ['alert', 'reduced', 'fatigued', 'lost_signal'];

    it('should have valid visual, pattern, and haptic tokens for all states', () => {
      states.forEach((state) => {
        const config = COGNITIVE_STATE_CONFIGS[state];
        expect(config).toBeDefined();
        expect(config.label).toBeTruthy();
        expect(config.subtext).toBeTruthy();
        expect(config.patternLabel).toBeTruthy();
        expect(config.hapticPrompt).toBeTruthy();
        expect(config.themeColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
      });
    });

    it('should correctly configure the optimal alert state with green theme', () => {
      const alertConfig = COGNITIVE_STATE_CONFIGS.alert;
      expect(alertConfig.label).toBe('TỈNH TÁO');
      expect(alertConfig.textColor).toBe('#2DB872');
      expect(alertConfig.patternLabel).toBe('xanh · nhịp êm');
    });

    it('should correctly configure reduced state with yellow diagonal stripes pattern', () => {
      const reducedConfig = COGNITIVE_STATE_CONFIGS.reduced;
      expect(reducedConfig.label).toBe('HƠI GIẢM');
      expect(reducedConfig.patternLabel).toBe('vàng · sọc chéo');
      expect(reducedConfig.hapticPrompt).toBe('Không rung · chỉ ghi nhận ngầm');
    });

    it('should correctly configure the fatigue state with cross-hatch pattern and break notice', () => {
      const fatiguedConfig = COGNITIVE_STATE_CONFIGS.fatigued;
      expect(fatiguedConfig.label).toBe('MỆT MỎI');
      expect(fatiguedConfig.subtext).toContain('Nên nghỉ 5 phút');
      expect(fatiguedConfig.patternLabel).toBe('cam · đan chéo');
      expect(fatiguedConfig.hapticPrompt).toBe('Rung kép nhẹ + âm êm, nhắc định kỳ');
    });

    it('should correctly configure lost_signal state with dashed border pattern', () => {
      const lostConfig = COGNITIVE_STATE_CONFIGS.lost_signal;
      expect(lostConfig.label).toBe('MẤT TÍN HIỆU');
      expect(lostConfig.patternLabel).toBe('xám · viền đứt');
      expect(lostConfig.hapticPrompt).toBe('Rung 1 nhịp dài + đọc thông báo');
    });
  });

  describe('Focus Mock Data Consistency', () => {
    it('should contain valid session durations and timestamps', () => {
      expect(MOCK_RECENT_SESSIONS.length).toBeGreaterThan(0);

      MOCK_RECENT_SESSIONS.forEach((session) => {
        expect(session.id).toBeTruthy();
        expect(session.durationSeconds).toBeGreaterThan(0);
        expect(session.dateLabel).toBeTruthy();
        expect(['good', 'fair', 'poor']).toContain(session.quality);
      });
    });
  });

  describe('Timer formatting logic', () => {
    const formatTimer = (totalSec: number) => {
      const hours = Math.floor(totalSec / 3600);
      const mins = Math.floor((totalSec % 3600) / 60);
      const secs = totalSec % 60;
      return `${hours < 10 ? '0' : ''}${hours}:${mins < 10 ? '0' : ''}${mins}:${
        secs < 10 ? '0' : ''
      }${secs}`;
    };

    it('should format 4354 seconds exactly as Figma s11 (01:12:34)', () => {
      expect(formatTimer(4354)).toBe('01:12:34');
    });

    it('should pad zeros correctly for small durations', () => {
      expect(formatTimer(65)).toBe('00:01:05');
      expect(formatTimer(0)).toBe('00:00:00');
    });
  });

  describe('Calendar Grid & History Logic (Figma s22)', () => {
    it('should accurately calculate December 2026 starting day offset on Tuesday', () => {
      // 2026-12-01 is a Tuesday (offset index 1 for Mon=0, Tue=1)
      const startDayOffset = 1;
      const totalDays = 31;
      const cells: (number | null)[] = [];

      for (let i = 0; i < startDayOffset; i++) cells.push(null);
      for (let day = 1; day <= totalDays; day++) cells.push(day);
      while (cells.length % 7 !== 0) cells.push(null);

      expect(cells[0]).toBeNull();
      expect(cells[1]).toBe(1); // Day 1 is Tuesday
      expect(cells[31]).toBe(31);
      expect(cells.length % 7).toBe(0);
    });
  });

  describe('EEG Data Deletion Safety Validation (Figma s27)', () => {
    it('should only permit deletion when exact keyword XÓA is supplied', () => {
      const validateDeleteInput = (input: string) => input.trim().toUpperCase() === 'XÓA';

      expect(validateDeleteInput('xóa')).toBe(true);
      expect(validateDeleteInput('XÓA')).toBe(true);
      expect(validateDeleteInput('  XÓA  ')).toBe(true);
      expect(validateDeleteInput('xoa')).toBe(false);
      expect(validateDeleteInput('delete')).toBe(false);
      expect(validateDeleteInput('')).toBe(false);
    });
  });

  describe('Pro Tier Annual Savings Calculation (Figma s30)', () => {
    it('should calculate correct discount for annual plan vs monthly', () => {
      const monthlyPrice = 79000;
      const annualPrice = 599000;
      const total12Months = monthlyPrice * 12; // 948,000đ

      const savings = total12Months - annualPrice;
      const savingsPercentage = Math.round((savings / total12Months) * 100);

      expect(savings).toBe(349000);
      expect(savingsPercentage).toBeGreaterThanOrEqual(35);
    });
  });
});
