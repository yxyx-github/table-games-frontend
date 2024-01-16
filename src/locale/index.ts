import { createI18n } from 'vue-i18n'
import de from './de'
import en from './en'

const i18nConfig = {
    locale: 'de',
    fallbackLocale: 'en',
    messages: {
        de: de.messages,
        en: en.messages
    },
    numberFormats: {
        de: de.numberFormats,
        en: en.numberFormats,
    },
    datetimeFormats: {
        de: de.dateTimeFormats,
        en: en.dateTimeFormats,
    },
}

// @ts-ignore
export default createI18n(i18nConfig)
