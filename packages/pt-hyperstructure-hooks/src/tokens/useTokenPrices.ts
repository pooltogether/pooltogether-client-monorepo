import { CURRENCY_ID, useCoingeckoTokenPrices } from 'pt-generic-hooks'
import { CoingeckoTokenPrices } from 'pt-types'
import { COINGECKO_PLATFORMS, TESTNET_TOKEN_PRICES } from 'pt-utilities'

/**
 * Returns token prices
 *
 * NOTE: Queries CoinGecko first, then onchain for missing data
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
    refetch: refetchCoingeckoTokenPrices
  } = useCoingeckoTokenPrices(chainId, tokenAddresses, currencies)

  // TODO: identify missing token prices and query them on-chain
  const onchainTokenPrices = {}
  const isFetchedOnchainTokenPrices = true

  const data: CoingeckoTokenPrices = {
    ...coingeckoTokenPrices,
    ...onchainTokenPrices
  }

  if (chainId in TESTNET_TOKEN_PRICES) {
    // @ts-ignore
    Object.assign(data, TESTNET_TOKEN_PRICES[chainId])
  }

  const isFetched =
    (!(chainId in COINGECKO_PLATFORMS) || isFetchedCoingeckoTokenPrices) &&
    isFetchedOnchainTokenPrices

  const refetch = () => {
    refetchCoingeckoTokenPrices()
    // refetchOnchainTokenPrices()
  }

  return { data, isFetched, refetch }
}
