import { useQuery, UseQueryResult } from 'react-query'
import { CoingeckoTokenPrices } from 'pt-types'
import { COINGECKO_PLATFORM, getCoingeckoTokenPrices } from 'pt-utilities'
import { NO_REFETCH, QUERY_KEYS } from '../constants'

/**
 * Returns token prices from CoinGecko
 * @param chainId optional currency override (default is ['usd'])
 * @param tokenAddresses token addresses to query prices for
 * @param currencies optional currency override (default is ['usd'])
 * @returns
 */
export const useCoingeckoTokenPrices = (
  chainId: COINGECKO_PLATFORM,
  tokenAddresses: string[],
  currencies?: string[]
): UseQueryResult<CoingeckoTokenPrices, unknown> => {
  const enabled =
    tokenAddresses.every((tokenAddress) => !!tokenAddress && typeof tokenAddress === 'string') &&
    Array.isArray(tokenAddresses) &&
    tokenAddresses.length > 0 &&
    !!chainId &&
    (currencies === undefined || currencies.length > 0)

  return useQuery(
    [QUERY_KEYS.coingeckoTokenPrices, chainId, tokenAddresses, currencies],
    async () => await getCoingeckoTokenPrices(chainId, tokenAddresses, currencies),
    {
      staleTime: Infinity,
      enabled,
      ...NO_REFETCH
    }
  )
}
