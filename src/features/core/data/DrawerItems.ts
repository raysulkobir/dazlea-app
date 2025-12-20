// src/features/core/navigation/drawerItems.ts
import { ImageSourcePropType, Linking } from 'react-native';
import { images } from '@/utils/images';

// Update these to match your real route names
export type DrawerRouteId =
  | 'Todo'
  | 'Counter'
  | 'DoctorRegistrationScreen'
  | 'SettingsScreen';

export type DrawerItem = {
  /** Route name to navigate to. Use null for non-route actions */
  id: DrawerRouteId | null;
  /** i18n key or plain label */
  title: string;
  icon: ImageSourcePropType;
  /** Optional custom action (used when id is null or to override) */
  onPress?: () => void;
};

export const drawerItems: DrawerItem[] = [
  { id: 'Counter', title: 'myprofile', icon: images.profile },
  { id: 'Counter', title: 'donationhistory', icon: images.history },

  // No route yet? Set id: null and handle with onPress
  { id: null, title: 'requesthistory', icon: images.history },

  { id: 'DoctorRegistrationScreen', title: 'donorregistration', icon: images.settings },
  { id: 'SettingsScreen', title: 'settings', icon: images.docSettings },

  // Duplicate label? If this is a different destination, give it a distinct title
  { id: null, title: 'donorregistration', icon: images.docSettings },

  // Examples that open links / future screens
  {
    id: null,
    title: 'privacypolicy',
    icon: images.privacy,
  },
  {
    id: null,
    title: 'contactus',
    icon: images.contact,
  },
  {
    id: null,
    title: 'aboutus',
    icon: images.about,
  },
];
