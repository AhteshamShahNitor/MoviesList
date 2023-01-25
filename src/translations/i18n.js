import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import en from "./en"
import ar from "./ar"

const LANGUAGES = {
  en,
  ar
}

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    resources: LANGUAGES,
    compatibilityJSON: "v3",
    react: {
      useSuspense: false
    },
    interpolation: {
      escapeValue: false
    }
  })
