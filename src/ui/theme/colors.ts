export const Colors = {
  primary: '#2563EB',
  secondary: '#2563EB',

  background: '#FFFFFF',
  surface: '#F7FAFC',

  textPrimary: '#0F172A',
  textSecondary: '#475569',
  placeholder: '#94A3B8',

  border: '#E2E8F0',

  white: '#FFFFFF',
  black: '#000000',

  grey:"#797979",


  border_grey:"#CCCCCC",
  placeholder_grey:"#AAAAAA",
  dark_grey:"#555555",
} as const;

export type ColorKey = keyof typeof Colors;
