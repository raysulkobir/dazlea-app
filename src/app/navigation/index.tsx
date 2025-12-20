import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './RootNavigator';
import { Text } from 'react-native';

export default function AppNavigation({ colorScheme = 'light' }: Props) {

  // const theme = colorScheme === 'dark' ? NavDarkTheme : NavLightTheme;

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
