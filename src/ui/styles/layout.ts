export const Layout = {
  center: { alignItems: 'center', justifyContent: 'center' },
  rowBetween: { flexDirection: 'row' as const, alignItems: 'center', justifyContent: 'space-between' },
  fill: { flex: 1 },
} as const;
