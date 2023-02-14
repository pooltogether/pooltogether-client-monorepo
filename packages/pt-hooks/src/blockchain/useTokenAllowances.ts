import { BigNumber } from 'ethers'
import { getTokenAllowances } from 'pt-utilities'
import { useQuery, useQueryClient, UseQueryResult } from 'react-query'
import { useProvider } from 'wagmi'
import { NO_REFETCH } from '../constants'
import { populateCachePerId } from '../utils/populateCachePerId'

/**
 * Returns a dictionary keyed by the token addresses with allowances to a specific
 * contract for each token.
 * Stores queried allowances in cache.
 * @param chainId chain ID to query token allowances from
 * @param userAddress wallet address that issues the allowance
 * @param spenderAddress wallet address that spends the allowance
 * @param tokenAddresses token addresses to query allowances for
 * @returns
 */
export const useTokenAllowances = (
  chainId: number,
  userAddress: string,
  spenderAddress: string,
  tokenAddresses: string[]
): UseQueryResult<{ [tokenAddress: string]: BigNumber }, unknown> => {
  const queryClient = useQueryClient()
  const readProvider = useProvider({ chainId })

  const enabled =
    !!userAddress &&
    !!spenderAddress &&
    tokenAddresses.every((tokenAddress) => !!tokenAddress && typeof tokenAddress === 'string') &&
    Array.isArray(tokenAddresses) &&
    tokenAddresses.length > 0 &&
    !!chainId &&
    !!readProvider

  const queryKey = ['tokenAllowances', chainId, userAddress, spenderAddress, tokenAddresses]

  return useQuery(
    queryKey,
    async () => await getTokenAllowances(readProvider, userAddress, spenderAddress, tokenAddresses),
    {
      enabled,
      ...NO_REFETCH,
      onSuccess: (data) => populateCachePerId(queryClient, queryKey, data)
    }
  )
}

/**
 * Returns a token's allowance for a given user and spender contract.
 * Wraps `useTokenAllowances`.
 * @param chainId chain ID to query token allowances from
 * @param userAddresswallet address that issues the allowance
 * @param spenderAddress wallet address that spends the allowance
 * @param tokenAddress token address to query allowance for
 * @returns
 */
export const useTokenAllowance = (
  chainId: number,
  userAddress: string,
  spenderAddress: string,
  tokenAddress: string
): { data: BigNumber } & Omit<UseQueryResult<{ [tokenAddress: string]: BigNumber }>, 'data'> => {
  const result = useTokenAllowances(chainId, userAddress, spenderAddress, [tokenAddress])
  return { ...result, data: result.data?.[tokenAddress] as BigNumber }
}
