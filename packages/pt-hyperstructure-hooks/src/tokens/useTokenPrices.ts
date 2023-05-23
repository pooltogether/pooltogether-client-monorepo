import { CURRENCY_ID, useCoingeckoTokenPrices } from 'pt-generic-hooks'
import { COINGECKO_PLATFORMS, TESTNET_TOKEN_PRICES } from 'pt-utilities'

/**
 * Returns token prices
 * @param chainId chain ID the tokens are in
 * @param tokenAddresses token addresses to query prices for
 * @param currencies optional currencies array (default is ['eth'])
 * @returns
 */
export const useTokenPrices = (
  chainId: number,
  tokenAddresses: string[],
  currencies?: CURRENCY_ID[]
) => {
  const {
    data: coingeckoTokenPrices,
    isFetched: isFetchedCoingeckoTokenPrices,
    isFetching: isFetchingCoingeckoTokenPrices,
    refetch: refetchCoingeckoTokenPrices
  } = useCoingeckoTokenPrices(chainId, tokenAddresses, currencies)

  if (chainId in TESTNET_TOKEN_PRICES) {
    // @ts-ignore
    Object.assign(data, TESTNET_TOKEN_PRICES[chainId])
  }

  const data = coingeckoTokenPrices
  const isFetched = !(chainId in COINGECKO_PLATFORMS) || isFetchedCoingeckoTokenPrices
  const isFetching = isFetchingCoingeckoTokenPrices
  const refetch = refetchCoingeckoTokenPrices

  return { data, isFetched, isFetching, refetch }
}
