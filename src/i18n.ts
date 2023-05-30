import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import roTranslation from './locales/ro.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            ro: {
                translation: roTranslation,
            },
        },
        lng: 'ro',
        fallbackLng: 'ro',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
