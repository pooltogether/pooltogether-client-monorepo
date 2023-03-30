import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { providers, utils } from 'ethers'
import { NO_REFETCH } from 'pt-generic-hooks'
import { TokenWithSupply } from 'pt-types'
import { getTokenInfo } from 'pt-utilities'
import { QUERY_KEYS } from '../constants'
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
    tokenAddresses.every((tokenAddress) => !!tokenAddress && utils.isAddress(tokenAddress)) &&
    Array.isArray(tokenAddresses) &&
    tokenAddresses.length > 0 &&
    !!readProvider &&
    readProvider._isProvider &&
    isFetchedChainId &&
    !!chainId

  const getQueryKey = (val: (string | number)[]) => [QUERY_KEYS.tokens, chainId, val]

  return useQuery(
    getQueryKey(tokenAddresses),
    async () => await getTokenInfo(readProvider, tokenAddresses),
    {
      enabled,
      ...NO_REFETCH,
      onSuccess: (data) => populateCachePerId(queryClient, getQueryKey, data)
    }
  )
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
  return { ...result, data: result.data?.[tokenAddress] }
}
