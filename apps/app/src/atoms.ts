import { atom } from 'jotai'
import { CURRENCY_ID, SUPPORTED_CURRENCIES } from '@constants/currencies'

/**
 * Testnet mode atom
 */
export const testnetModeAtom = atom<boolean>(false)

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

export const selectedCurrencyAtom = atom<CURRENCY_ID>(getInitialSelectedCurrency())
