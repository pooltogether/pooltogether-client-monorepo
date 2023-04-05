import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { CoingeckoTokenPrices } from 'pt-types'
import { COINGECKO_PLATFORM, COINGECKO_PLATFORMS, getCoingeckoTokenPrices } from 'pt-utilities'
import { QUERY_KEYS } from '../constants/keys'
import { NO_REFETCH } from '../constants/query'

/**
 * Returns token prices from CoinGecko
 * @param chainId chain ID the tokens are in
 * @param tokenAddresses token addresses to query prices for
 * @param currencies optional currency override (default is ['usd'])
 * @returns
 */
export const useCoingeckoTokenPrices = (
  chainId: number,
  tokenAddresses: string[],
  currencies?: string[]
): UseQueryResult<CoingeckoTokenPrices, unknown> => {
  const enabled =
    !!tokenAddresses &&
    tokenAddresses.every((tokenAddress) => !!tokenAddress && typeof tokenAddress === 'string') &&
    Array.isArray(tokenAddresses) &&
    tokenAddresses.length > 0 &&
    !!chainId &&
    chainId in COINGECKO_PLATFORMS &&
    (currencies === undefined || currencies.length > 0)

  return useQuery(
    [QUERY_KEYS.coingeckoTokenPrices, chainId, tokenAddresses, currencies],
    async () =>
      await getCoingeckoTokenPrices(chainId as COINGECKO_PLATFORM, tokenAddresses, currencies),
    {
      staleTime: Infinity,
      enabled,
      ...NO_REFETCH
    }
  )
}
