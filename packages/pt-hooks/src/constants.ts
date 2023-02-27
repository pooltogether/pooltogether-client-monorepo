/**
 * Query keys for various hooks
 */
export const QUERY_KEYS = Object.freeze({
  coingeckoExchangeRates: 'coingeckoExchangeRates',
  coingeckoSimpleTokenPrices: 'coingeckoSimpleTokenPrices',
  coingeckoTokenData: 'coingeckoTokenData',
  coingeckoTokenPrices: 'coingeckoTokenPrices',
  gasPrices: 'gasPrices',
  providerChainId: 'providerChainId',
  tokenAllowances: 'tokenAllowances',
  tokenBalances: 'tokenBalances',
  tokens: 'tokens',
  userVaultBalances: 'userVaultBalances',
  vaultBalances: 'vaultBalances',
  vaultShareMultipliers: 'vaultShareMultipliers'
})

/**
 * Basic config to avoid refetching data
 */
export const NO_REFETCH = Object.freeze({
  refetchInterval: false,
  refetchIntervalInBackground: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false
})
