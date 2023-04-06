import { CURRENCY_ID, useCoingeckoTokenPrices } from 'pt-generic-hooks'
import { CoingeckoTokenPrices } from 'pt-types'
import { TESTNET_TOKEN_PRICES } from 'pt-utilities'

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

  const data: { [chainId: number]: CoingeckoTokenPrices } = {
    ...coingeckoTokenPrices,
    ...TESTNET_TOKEN_PRICES
  }

  const isFetched = isFetchedCoingeckoTokenPrices

  const refetch = () => {
    refetchCoingeckoTokenPrices()
  }

  return { data, isFetched, refetch }
}
