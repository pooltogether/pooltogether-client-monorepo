import { atom } from 'jotai'
import { CoingeckoTokenPrices } from 'pt-types'

/**
 * Testnet mode atom
 */
export const testnetModeAtom = atom<boolean>(false)

/**
 * Token prices atom
 */
export const tokenPricesAtom = atom<{
  simple: CoingeckoTokenPrices
  [chainId: number]: CoingeckoTokenPrices
}>({ simple: {} })
