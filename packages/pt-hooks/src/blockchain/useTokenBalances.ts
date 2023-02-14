import { TokenWithBalance } from 'pt-types'
import { getTokenBalances } from 'pt-utilities'
import { useQuery, useQueryClient, UseQueryResult } from 'react-query'
import { useProvider } from 'wagmi'
import { NO_REFETCH, QUERY_KEYS } from '../constants'
import { populateCachePerId } from '../utils/populateCachePerId'

/**
 * Returns a dictionary keyed by the token addresses with their associated balances
 * @param chainId chain ID to query token balances from
 * @param address address to check for token balances
 * @param tokenAddresses token addresses to query balances for
 * @param refetchInterval optional automatic refetching interval in ms
 * @returns
 */
export const useTokenBalances = (
  chainId: number,
  address: string,
  tokenAddresses: string[],
  refetchInterval?: number
): UseQueryResult<{ [tokenAddress: string]: TokenWithBalance }, unknown> => {
  const queryClient = useQueryClient()
  const readProvider = useProvider({ chainId })

  const enabled =
    !!address &&
    tokenAddresses.every((tokenAddress) => !!tokenAddress && typeof tokenAddress === 'string') &&
    Array.isArray(tokenAddresses) &&
    tokenAddresses.length > 0 &&
    !!chainId &&
    !!readProvider

  const queryKey = [QUERY_KEYS.tokenBalances, chainId, address, tokenAddresses]

  return useQuery(
    queryKey,
    async () => await getTokenBalances(readProvider, address, tokenAddresses),
    {
      enabled,
      ...NO_REFETCH,
      refetchInterval: refetchInterval ?? false,
      onSuccess: (data) => populateCachePerId(queryClient, queryKey, data)
    }
  )
}

/**
 * Returns an address's token balance.
 * Wraps `useTokenBalances`.
 * @param chainId chain ID to query token balance from
 * @param address address to check for token balance
 * @param tokenAddress token address to query balance for
 * @param refetchInterval optional automatic refetching interval in ms
 * @returns
 */
export const useTokenBalance = (
  chainId: number,
  address: string,
  tokenAddress: string,
  refetchInterval?: number
): { data: TokenWithBalance } & Omit<
  UseQueryResult<{ [tokenAddress: string]: TokenWithBalance }>,
  'data'
> => {
  const result = useTokenBalances(chainId, address, [tokenAddress], refetchInterval)
  return { ...result, data: result.data?.[tokenAddress] as TokenWithBalance }
}
