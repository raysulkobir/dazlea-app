// src/app/navigation/types.ts
import type { NavigatorScreenParams } from '@react-navigation/native';

export type AppTabParamList = {
  Home: undefined;
  Todo: undefined;
  Profile: { userId?: string } | undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  App: NavigatorScreenParams<AppTabParamList>;
  Modal: { title?: string; message?: string } | undefined;
};
