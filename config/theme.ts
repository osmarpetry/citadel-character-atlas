/**
 * Citadel Theme Configuration for Hero UI
 * Based on portal-forward Citadel atlas colors
 * Following Hero UI theme structure: https://www.heroui.com/docs/customization/theme
 *
 * Citadel Atlas Colors:
 * - #08C952 (8,201,82) - Portal Green (Primary - Science/Adventure)
 * - #FCE46D (252,228,108) - Citadel Yellow (Secondary - Bright/Optimistic)
 * - #A1140A (160,19,9) - Signal Red (Danger - Action/Warning)
 * - #160440 (21,3,63) - Deep Space Purple (Dark backgrounds)
 * - #EDCF6B (237,206,106) - Citadel Amber (Warning/Accent)
 */

const citadelLight = {
  extend: 'light',
  colors: {
    // Primary - Portal Green (#08C952)
    primary: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#08C952',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      DEFAULT: '#08C952',
      foreground: '#ffffff',
    },
    // Secondary - Citadel Yellow (#FCE46D)
    secondary: {
      50: '#fefce8',
      100: '#fef9c3',
      200: '#fef08a',
      300: '#fde047',
      400: '#facc15',
      500: '#FCE46D',
      600: '#ca8a04',
      700: '#a16207',
      800: '#854d0e',
      900: '#713f12',
      DEFAULT: '#FCE46D',
      foreground: '#160440',
    },
    // Success - Portal Green
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#08C952',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      DEFAULT: '#08C952',
      foreground: '#ffffff',
    },
    // Warning - Citadel Amber (#EDCF6B)
    warning: {
      50: '#fefce8',
      100: '#fef9c3',
      200: '#fef08a',
      300: '#fde047',
      400: '#facc15',
      500: '#EDCF6B',
      600: '#ca8a04',
      700: '#a16207',
      800: '#854d0e',
      900: '#713f12',
      DEFAULT: '#EDCF6B',
      foreground: '#160440',
    },
    // Danger - Signal Red (#A1140A)
    danger: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#A1140A',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      DEFAULT: '#A1140A',
      foreground: '#ffffff',
    },
    // Background & Content
    background: '#ffffff',
    foreground: '#160440',
    content1: '#ffffff',
    content2: '#f8fafc',
    content3: '#f1f5f9',
    content4: '#e2e8f0',
    // Default - Neutral with Citadel accent
    default: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      DEFAULT: '#64748b',
      foreground: '#0f172a',
    },
    // Focus ring - Portal Green
    focus: '#08C952',
    // Divider
    divider: 'rgba(21, 3, 63, 0.15)',
    // Overlay
    overlay: 'rgba(21, 3, 63, 0.5)',
  },
};

const citadelDark = {
  extend: 'dark',
  colors: {
    // Primary - Portal Green (#08C952) - Brighter for dark mode
    primary: {
      50: '#14532d',
      100: '#166534',
      200: '#15803d',
      300: '#16a34a',
      400: '#22c55e',
      500: '#08C952',
      600: '#4ade80',
      700: '#86efac',
      800: '#bbf7d0',
      900: '#dcfce7',
      DEFAULT: '#08C952',
      foreground: '#000000',
    },
    // Secondary - Citadel Yellow (#FCE46D) - Bright for dark mode
    secondary: {
      50: '#713f12',
      100: '#854d0e',
      200: '#a16207',
      300: '#ca8a04',
      400: '#eab308',
      500: '#FCE46D',
      600: '#fde047',
      700: '#fef08a',
      800: '#fef9c3',
      900: '#fefce8',
      DEFAULT: '#FCE46D',
      foreground: '#160440',
    },
    // Success - Portal Green
    success: {
      50: '#14532d',
      100: '#166534',
      200: '#15803d',
      300: '#16a34a',
      400: '#22c55e',
      500: '#08C952',
      600: '#4ade80',
      700: '#86efac',
      800: '#bbf7d0',
      900: '#dcfce7',
      DEFAULT: '#08C952',
      foreground: '#000000',
    },
    // Warning - Citadel Amber (#EDCF6B)
    warning: {
      50: '#713f12',
      100: '#854d0e',
      200: '#a16207',
      300: '#ca8a04',
      400: '#eab308',
      500: '#EDCF6B',
      600: '#fde047',
      700: '#fef08a',
      800: '#fef9c3',
      900: '#fefce8',
      DEFAULT: '#EDCF6B',
      foreground: '#160440',
    },
    // Danger - Signal Red (#A1140A) - Brighter for dark mode
    danger: {
      50: '#7f1d1d',
      100: '#991b1b',
      200: '#b91c1c',
      300: '#dc2626',
      400: '#ef4444',
      500: '#A1140A',
      600: '#f87171',
      700: '#fca5a5',
      800: '#fecaca',
      900: '#fee2e2',
      DEFAULT: '#A1140A',
      foreground: '#ffffff',
    },
    // Dark mode backgrounds - Deep Space Purple theme
    background: '#160440',
    foreground: '#FCE46D',
    content1: '#1e0a4a',
    content2: '#2a1065',
    content3: '#3730a3',
    content4: '#4338ca',
    // Default - Space-themed neutrals
    default: {
      50: '#0f172a',
      100: '#1e293b',
      200: '#334155',
      300: '#475569',
      400: '#64748b',
      500: '#94a3b8',
      600: '#cbd5e1',
      700: '#e2e8f0',
      800: '#f1f5f9',
      900: '#f8fafc',
      DEFAULT: '#475569',
      foreground: '#f8fafc',
    },
    // Focus ring - Portal Green
    focus: '#08C952',
    // Divider
    divider: 'rgba(252, 228, 108, 0.15)',
    // Overlay
    overlay: 'rgba(21, 3, 63, 0.8)',
  },
};

// Export both themes for use in Tailwind config
export { citadelLight, citadelDark };
