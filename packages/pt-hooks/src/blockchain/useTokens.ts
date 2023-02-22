import { getTokenInfo } from 'pt-utilities'
import { useQuery, useQueryClient, UseQueryResult } from 'react-query'
import { TokenWithSupply } from 'pt-types'
import { NO_REFETCH, QUERY_KEYS } from '../constants'
import { populateCachePerId } from '../utils/populateCachePerId'
import { providers } from 'ethers'

/**
 * Returns a dictionary keyed by the token addresses with basic token data.
 * Stored queried token data in cache.
 * @param readProvider read-capable provider to query token info through
 * @param tokenAddresses token addresses to query info for
 * @returns
 */
export const useTokens = (
  readProvider: providers.Provider,
  tokenAddresses: string[]
): UseQueryResult<{ [tokenAddress: string]: TokenWithSupply }, unknown> => {
  const queryClient = useQueryClient()

  const enabled =
    tokenAddresses.every((tokenAddress) => !!tokenAddress && typeof tokenAddress === 'string') &&
    Array.isArray(tokenAddresses) &&
    tokenAddresses.length > 0 &&
    !!readProvider

  const queryKey = [QUERY_KEYS.tokens, tokenAddresses]

  return useQuery(queryKey, async () => await getTokenInfo(readProvider, tokenAddresses), {
    enabled,
    ...NO_REFETCH,
    onSuccess: (data) => populateCachePerId(queryClient, queryKey, data)
  })
}

/**
 * Returns basic token data for one token.
 * Wraps `useTokens`.
 * @param readProvider read-capable provider to query token info through
 * @param tokenAddress token address to query info for
 * @returns
 */
export const useToken = (
  readProvider: providers.Provider,
  tokenAddress: string
): { data: TokenWithSupply } & Omit<
  UseQueryResult<{ [tokenAddress: string]: TokenWithSupply }>,
  'data'
> => {
  const result = useTokens(readProvider, [tokenAddress])
  return { ...result, data: result.data?.[tokenAddress] as TokenWithSupply }
}
