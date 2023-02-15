/**
 * Query keys for various hooks
 */
export const QUERY_KEYS = Object.freeze({
  coingeckoExchangeRates: 'coingeckoExchangeRates',
  coingeckoSimpleTokenPrices: 'coingeckoSimpleTokenPrices',
  coingeckoTokenData: 'coingeckoTokenData',
  coingeckoTokenPrices: 'coingeckoTokenPrices',
  gasPrices: 'gasPrices',
  tokenAllowances: 'tokenAllowances',
  tokenBalances: 'tokenBalances',
  tokens: 'tokens'
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
