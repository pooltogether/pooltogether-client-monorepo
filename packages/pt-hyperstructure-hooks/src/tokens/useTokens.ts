import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { utils } from 'ethers'
import { useProvider } from 'wagmi'
import { NO_REFETCH } from 'pt-generic-hooks'
import { TokenWithSupply } from 'pt-types'
import { getTokenInfo } from 'pt-utilities'
import { populateCachePerId } from '..'
import { QUERY_KEYS } from '../constants'

/**
 * Returns a dictionary keyed by the token addresses with basic token data
 *
 * Stores queried token data in cache
 * @param chainId chain ID
 * @param tokenAddresses token addresses to query info for
 * @returns
 */
export const useTokens = (
  chainId: number,
  tokenAddresses: string[]
): UseQueryResult<{ [tokenAddress: string]: TokenWithSupply }, unknown> => {
  const queryClient = useQueryClient()

  const provider = useProvider({ chainId })

  const enabled =
    !!chainId &&
    tokenAddresses.every((tokenAddress) => !!tokenAddress && utils.isAddress(tokenAddress)) &&
    Array.isArray(tokenAddresses) &&
    tokenAddresses.length > 0 &&
    !!provider

  const getQueryKey = (val: (string | number)[]) => [QUERY_KEYS.tokens, chainId, val]

  return useQuery(
    getQueryKey(tokenAddresses),
    async () => await getTokenInfo(provider, tokenAddresses),
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
 * @param chainId chain ID
 * @param tokenAddress token address to query info for
 * @returns
 */
export const useToken = (
  chainId: number,
  tokenAddress: string
): { data?: TokenWithSupply } & Omit<
  UseQueryResult<{ [tokenAddress: string]: TokenWithSupply }>,
  'data'
> => {
  const result = useTokens(chainId, [tokenAddress])
  return { ...result, data: result.data?.[tokenAddress] }
}
