import { LOCAL_STORAGE_KEYS as GENERIC_LOCAL_STORAGE_KEYS } from 'pt-generic-hooks'

/**
 * Query keys for various hooks
 */
export const QUERY_KEYS = Object.freeze({
  gasPrices: 'gasPrices',
  providerChainId: 'providerChainId',
  tokenAllowances: 'tokenAllowances',
  tokenBalances: 'tokenBalances',
  tokens: 'tokens',
  userVaultBalances: 'userVaultBalances',
  vaultBalances: 'vaultBalances',
  vaultExchangeRates: 'vaultExchangeRates'
})

/**
 * Local storage keys
 */
export const LOCAL_STORAGE_KEYS = Object.freeze({
  ...GENERIC_LOCAL_STORAGE_KEYS,
  cachedVaultLists: 'cachedVaultLists',
  selectedVaultListIds: 'selectedVaultListIds'
})
