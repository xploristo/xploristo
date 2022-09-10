import { createI18n } from 'vue-i18n';

/* const SUPPORTED_LOCALES = ['en', 'es']; */

const i18n = createI18n({
  // TODO
  /* locale: 'es',
  fallbackLocale: 'en',
  messages: {}, */
});

export async function loadLocaleMessages(locale) {
  const messages = await import(`../locales/${locale}.json`);
  i18n.global.setLocaleMessage(locale, messages);
}

export function setI18nLocale(locale) {
  const isLocaleLoaded = i18n.global.availableLocales.includes(locale);
  if (!isLocaleLoaded) {
    loadLocaleMessages(locale);
  }
  i18n.global.locale = locale;
}

export default i18n;
