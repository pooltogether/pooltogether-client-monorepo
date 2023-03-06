import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { providers } from 'ethers'
import { TokenWithSupply } from 'pt-types'
import { getTokenInfo } from 'pt-utilities'
import { NO_REFETCH, QUERY_KEYS } from '../constants'
import { populateCachePerId } from '../utils/populateCachePerId'
import { useProviderChainId } from './useProviderChainId'

/**
 * Returns a dictionary keyed by the token addresses with basic token data
 *
 * Stores queried token data in cache
 * @param readProvider read-capable provider to query token info through
 * @param tokenAddresses token addresses to query info for
 * @returns
 */
export const useTokens = (
  readProvider: providers.Provider,
  tokenAddresses: string[]
): UseQueryResult<{ [tokenAddress: string]: TokenWithSupply }, unknown> => {
  const queryClient = useQueryClient()

  const { data: chainId, isFetched: isFetchedChainId } = useProviderChainId(readProvider)

  const enabled =
    tokenAddresses.every((tokenAddress) => !!tokenAddress && typeof tokenAddress === 'string') &&
    Array.isArray(tokenAddresses) &&
    tokenAddresses.length > 0 &&
    !!readProvider &&
    readProvider._isProvider &&
    isFetchedChainId &&
    !!chainId

  const queryKey = [QUERY_KEYS.tokens, chainId, tokenAddresses]

  return useQuery(queryKey, async () => await getTokenInfo(readProvider, tokenAddresses), {
    enabled,
    ...NO_REFETCH,
    onSuccess: (data) => populateCachePerId(queryClient, queryKey, data)
  })
}

/**
 * Returns basic token data for one token
 *
 * Wraps {@link useTokens}
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
