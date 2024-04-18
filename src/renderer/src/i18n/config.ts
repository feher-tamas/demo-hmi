import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as translationEn from './en/translation.json'
import * as translationHu from './hu/translation.json'

export const resources = {
  en: {
    translation: translationEn
  },
  hu: {
    translation: translationHu
  }
}

i18next.use(initReactI18next).init({
  lng: 'en', // if you're using a language detector, do not define the lng option
  debug: false,
  resources
})
export default i18next

const langListener = (_: Electron.IpcRendererEvent, language: string): void => {
  setTimeout(() => {
    i18next.changeLanguage(language)
  })
}

window.main.onLanguageChange(langListener)
window.main.getLanguage()
