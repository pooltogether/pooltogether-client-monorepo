import { getTokenInfo } from 'pt-utilities'
import { useQuery, useQueryClient, UseQueryResult } from 'react-query'
import { useProvider } from 'wagmi'
import { TokenWithSupply } from 'pt-types'
import { NO_REFETCH } from './constants'
import { populateCachePerId } from './utils'

/**
 * Returns a dictionary keyed by the token addresses with basic token data.
 * Stored queried token data in cache.
 * @param chainId chain ID to query token info from
 * @param tokenAddresses token addresses to query info for
 * @returns
 */
export const useTokens = (
  chainId: number,
  tokenAddresses: string[]
): UseQueryResult<{ [tokenAddress: string]: TokenWithSupply }, unknown> => {
  const queryClient = useQueryClient()
  const readProvider = useProvider({ chainId })

  const enabled =
    tokenAddresses.every((tokenAddress) => !!tokenAddress && typeof tokenAddress === 'string') &&
    Array.isArray(tokenAddresses) &&
    tokenAddresses.length > 0 &&
    !!chainId &&
    !!readProvider

  const queryKey = ['tokens', chainId, tokenAddresses]

  return useQuery(queryKey, async () => await getTokenInfo(readProvider, tokenAddresses), {
    enabled,
    ...NO_REFETCH,
    onSuccess: (data) => populateCachePerId(queryClient, queryKey, data)
  })
}

/**
 * Returns basic token data for one token.
 * Wraps `useTokens`.
 * @param chainId chain ID to query token info from
 * @param tokenAddress token address to query info for
 * @returns
 */
export const useToken = (
  chainId: number,
  tokenAddress: string
): { data: TokenWithSupply } & Omit<
  UseQueryResult<{ [tokenAddress: string]: TokenWithSupply }>,
  'data'
> => {
  const result = useTokens(chainId, [tokenAddress])
  return { ...result, data: result.data?.[tokenAddress] as TokenWithSupply }
}
