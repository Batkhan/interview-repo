import { Platform } from 'react-native';

const fontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
  web: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  default: 'System',
});

export const fontSize = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  '2xl': 22,
  '3xl': 24,
  '4xl': 32,
} as const;

export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const lineHeight = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 22,
  xl: 24,
  '2xl': 28,
  '3xl': 32,
  '4xl': 42,
};

export const typography = {
  h1: { fontFamily, fontSize: fontSize['3xl'], fontWeight: fontWeight.semibold, lineHeight: lineHeight['3xl'] },
  h2: { fontFamily, fontSize: fontSize['2xl'], fontWeight: fontWeight.bold, lineHeight: lineHeight['2xl'] },
  h3: { fontFamily, fontSize: fontSize.xl, fontWeight: fontWeight.semibold, lineHeight: lineHeight.xl },
  body: { fontFamily, fontSize: fontSize.lg, fontWeight: fontWeight.regular, lineHeight: lineHeight.lg },
  bodySmall: { fontFamily, fontSize: fontSize.md, fontWeight: fontWeight.medium, lineHeight: lineHeight.md },
  caption: { fontFamily, fontSize: fontSize.sm, fontWeight: fontWeight.regular, lineHeight: lineHeight.sm },
  label: { fontFamily, fontSize: fontSize.sm, fontWeight: fontWeight.medium, lineHeight: lineHeight.sm },
  button: { fontFamily, fontSize: fontSize.lg, fontWeight: fontWeight.semibold, lineHeight: lineHeight.lg },
  tabLabel: { fontFamily, fontSize: fontSize.xs, fontWeight: fontWeight.medium, lineHeight: lineHeight.xs },
} as const;
