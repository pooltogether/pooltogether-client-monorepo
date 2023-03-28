import { LOCAL_STORAGE_KEYS as GENERIC_LOCAL_STORAGE_KEYS } from 'pt-generic-hooks'

/**
 * Query keys for various hooks
 */
export const QUERY_KEYS = Object.freeze({
  prizeInfo: 'prizeInfo',
  prizeTokenData: 'prizeTokenData',
  gasPrices: 'gasPrices',
  providerChainId: 'providerChainId',
  selectedVaults: 'selectedVaults',
  tokenAllowances: 'tokenAllowances',
  tokenBalances: 'tokenBalances',
  tokens: 'tokens',
  userVaultBalances: 'userVaultBalances',
  vaultBalances: 'vaultBalances',
  vaultExchangeRates: 'vaultExchangeRates',
  vaultShareData: 'vaultShareData',
  vaultTokenAddresses: 'vaultTokenAddresses',
  vaultTokenData: 'vaultTokenData'
})

/**
 * Local storage keys
 */
export const LOCAL_STORAGE_KEYS = Object.freeze({
  ...GENERIC_LOCAL_STORAGE_KEYS,
  cachedVaultLists: 'cachedVaultLists',
  selectedVaultListIds: 'selectedVaultListIds'
})
