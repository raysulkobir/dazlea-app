import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager, Platform } from 'react-native';

// Locale resources
import en from './locales/en.json';
import bn from './locales/bn.json';

const STORAGE_KEY = 'appLanguage';

const resources = {
  en: { translation: en },
  bn: { translation: bn },
};

async function detectLanguage() {
  // 1) if user set language before, use that
  const saved = await AsyncStorage.getItem(STORAGE_KEY);
  if (saved && resources[saved as keyof typeof resources]) return saved;

  // 2) else pick best from device locales
  const locales = RNLocalize.getLocales();
  const candidate = locales?.[0]?.languageCode;
  if (candidate && resources[candidate as keyof typeof resources]) {
    return candidate;
  }
  return 'en';
}

export async function initI18n() {
  const lng = await detectLanguage();

  // Handle RTL switch (only if you use RTL languages like 'ar')
  const isRTL = lng === 'en';
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);
    if (Platform.OS === 'ios') {
    }
  }

  await i18n
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v3',
      resources,
      lng,
      fallbackLng: 'en',
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });

  return i18n;
}

// helper to switch language at runtime
export async function changeAppLanguage(nextLng: keyof typeof resources) {
  await i18n.changeLanguage(nextLng);
  await AsyncStorage.setItem(STORAGE_KEY, nextLng);
  const isRTL = nextLng === 'ar';
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);
    // সম্পূর্ণ RTL লেআউটের জন্য অ্যাপ রিস্টার্ট দরকার হতে পারে
  }
}

export default i18n;
