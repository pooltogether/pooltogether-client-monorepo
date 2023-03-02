import { atom } from 'jotai'
import { CURRENCY_ID, SUPPORTED_CURRENCIES } from '@constants/currencies'
import { LANGUAGE_ID, SUPPORTED_LANGUAGES } from '@constants/languages'

/* ============================== Helper Functions ============================== */

/**
 * Returns a user's previous currency selection through local storage if available
 * @returns
 */
const getInitialSelectedCurrency = (): CURRENCY_ID => {
  // TODO: set initial currency to match user's locale if never set
  if (typeof window === 'undefined') return 'usd'
  const cachedCurrency = localStorage.getItem('selectedCurrency')
  if (!!cachedCurrency && cachedCurrency in SUPPORTED_CURRENCIES) {
    return cachedCurrency as CURRENCY_ID
  } else {
    return 'usd'
  }
}

/**
 * Returns a user's previous language selection through local storage if available
 * @returns
 */
const getInitialSelectedLanguage = (): LANGUAGE_ID => {
  if (typeof window === 'undefined') return 'en'
  const cachedLanguage = localStorage.getItem('selectedLanguage')
  if (!!cachedLanguage && cachedLanguage in SUPPORTED_LANGUAGES) {
    return cachedLanguage as LANGUAGE_ID
  } else {
    return 'en'
  }
}

/* =================================== Atoms =================================== */

/**
 * Testnet mode toggle
 */
export const isTestnetModeAtom = atom<boolean>(false)

/**
 * Currently selected currency ID
 */
export const selectedCurrencyAtom = atom<CURRENCY_ID>(getInitialSelectedCurrency())

/**
 * Currently selected language ID
 */
export const selectedLanguageAtom = atom<LANGUAGE_ID>(getInitialSelectedLanguage())

/**
 * Settings modal display toggle
 */
export const isSettingsModalOpenAtom = atom<boolean>(false)

/**
 * Settings modal view selector
 */
export const settingsModalViewAtom = atom<ModalView>('menu')
export type ModalView = 'menu' | 'currency' | 'language'
