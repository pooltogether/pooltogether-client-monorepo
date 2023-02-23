import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { utils } from 'ethers'
import { CoingeckoTokenData } from 'pt-types'
import { COINGECKO_PLATFORM, getCoingeckoTokenData } from 'pt-utilities'
import { NO_REFETCH, QUERY_KEYS } from '../constants'

/**
 * Returns token data from CoinGecko
 * @param chainId chain ID where the token address provided is from
 * @param tokenAddress token address to query token data for
 * @returns
 */
export const useCoingeckoTokenData = (
  chainId: COINGECKO_PLATFORM,
  tokenAddress: string
): UseQueryResult<CoingeckoTokenData | undefined, unknown> => {
  const enabled = !!tokenAddress && utils.isAddress(tokenAddress) && !!chainId

  return useQuery(
    [QUERY_KEYS.coingeckoTokenData, chainId, tokenAddress],
    async () => await getCoingeckoTokenData(chainId, tokenAddress),
    {
      staleTime: Infinity,
      enabled,
      ...NO_REFETCH
    }
  )
}
