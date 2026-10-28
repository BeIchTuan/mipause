/**
 * @file tailwind.config.js
 * @description NativeWind v4 Configuration file mapping Figma design tokens
 * for the MiPause EEG headband focus management application.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // MiPause Primary Brand Tokens (Golden Amber / Warm Accent)
        primary: {
          DEFAULT: '#EAA01B',
          hover: '#C77700',
          light: '#FFF8EB',
          dark: '#0D2B34',
        },
        // Deep Obsidian / Petrol Slate used in Active Focus Session (s11 & s13-s15)
        focusDark: {
          bg: '#0B1B22',
          surface: '#12242E',
          border: '#1E3542',
          muted: '#627D90',
        },
        // Semantic Cognitive State Tokens mapped from Figma
        state: {
          alert: {
            bg: '#ECFDF5',
            text: '#2DB872',
            border: '#A7F3D0',
            darkBg: '#064E3B33',
          },
          reduced: {
            bg: '#FFFBEB',
            text: '#E5A91A',
            border: '#FDE68A',
            darkBg: '#78350F33',
          },
          fatigued: {
            bg: '#FFEDD5',
            text: '#E06D53',
            border: '#FED7AA',
            darkBg: '#7C2D1233',
          },
          lost: {
            bg: '#F1F5F9',
            text: '#6B828D',
            border: '#CBD5E1',
            darkBg: '#1E293B66',
          },
        },
        // Design System Base Tokens from Figma
        background: '#EFF3F3',
        foreground: '#0D2B34',
        card: '#FFFFFF',
        'card-foreground': '#0D2B34',
        muted: '#F0F4F4',
        'muted-foreground': '#5E7A85',
        border: '#E1EBEA',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        full: '9999px',
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
        mono: ['Courier', 'monospace'],
      },
    },
  },
  plugins: [],
};
