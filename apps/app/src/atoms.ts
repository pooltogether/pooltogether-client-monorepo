import { atom } from 'jotai'
import { CURRENCY_ID, SUPPORTED_CURRENCIES } from '@constants/currencies'

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
 * Settings modal display toggle
 */
export const isSettingsModalOpenAtom = atom<boolean>(false)

/**
 * Settings modal view selector
 */
export const settingsModalViewAtom = atom<ModalView>('menu')
export type ModalView = 'menu' | 'currency' | 'language'
