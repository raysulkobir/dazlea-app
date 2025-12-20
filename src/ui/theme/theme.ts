import { Colors } from './colors';
import { Spacing } from './spacing';
import { Typography } from './typography';

export const LightTheme = {
  colors: Colors,
  spacing: Spacing,
  text: Typography,
  radius: { sm: 8, md: 12, lg: 16 },
  shadow: {
    card: { shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, shadowOffset: { width: 0, height: 3 }, elevation: 3 },
  },
} as const;

export type AppTheme = typeof LightTheme;
