import { useColorScheme } from 'react-native';
import { LightTheme } from '../theme/theme';
// If you add DarkTheme later, switch by scheme here.

export function useTheme() {
  const scheme = useColorScheme();
  // return scheme === 'dark' ? DarkTheme : LightTheme;
  return LightTheme;
}
