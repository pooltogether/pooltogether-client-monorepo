import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { CoingeckoTokenData } from 'pt-types'
import { COINGECKO_PLATFORM, COINGECKO_PLATFORMS, getCoingeckoTokenData } from 'pt-utilities'
import { NO_REFETCH, QUERY_KEYS } from '../constants'

/**
 * Returns token data from CoinGecko
 * @param chainId chain ID where the token address provided is from
 * @param tokenAddress token address to query token data for
 * @returns
 */
export const useCoingeckoTokenData = (
  chainId: number,
  tokenAddress: string
): UseQueryResult<CoingeckoTokenData | undefined, unknown> => {
  const enabled = !!tokenAddress && !!chainId && chainId in COINGECKO_PLATFORMS

  return useQuery(
    [QUERY_KEYS.coingeckoTokenData, chainId, tokenAddress],
    async () => await getCoingeckoTokenData(chainId as COINGECKO_PLATFORM, tokenAddress),
    {
      staleTime: Infinity,
      enabled,
      ...NO_REFETCH
    }
  )
}
