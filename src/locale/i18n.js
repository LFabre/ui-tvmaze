import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import EN from './en';
import PT from './pt';

export default i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: EN },
      pt: { translations: PT }
    },
    lng: 'en',
    fallbackLng: 'en',

    debug: false,

    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: '.',

    interpolation: {
      escapeValue: false
    },
  });