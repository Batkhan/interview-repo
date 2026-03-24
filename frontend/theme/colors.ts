export const colors = {
  // Backgrounds
  background: '#FFFFFF',
  backgroundSecondary: '#EFEFEF',
  backgroundTertiary: '#F5F5F5',
  card: '#FFFFFF',

  // Text
  textPrimary: '#2B240F',
  textBody: '#1E1E1E',
  textMuted: '#625F58',
  textPlaceholder: '#757575',
  textInverse: '#FFFFFF',

  // Brand / Accents
  primary: '#000000',
  primaryLight: '#F5F5F5',
  secondary: 'rgba(17, 17, 17, 0.60)',
  secondaryLight: '#FFFEFC',

  // Warm accents
  coral: '#FF6B6B',
  gold: '#F0A830',

  // Semantic
  success: '#4CAF50',
  error: '#E53935',

  // UI
  border: '#EFF0F6',
  borderLight: '#EFF0F6',
  divider: '#EFF0F6',

  // Cards
  cardBorder: '#96765A',

  // Tab bar
  tabActive: '#2B240F',
  tabInactive: '#625F58',

  // Misc
  transparent: 'transparent',
} as const;

export type ColorKey = keyof typeof colors;
