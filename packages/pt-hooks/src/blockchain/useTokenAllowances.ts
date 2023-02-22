import { BigNumber, providers } from 'ethers'
import { getTokenAllowances } from 'pt-utilities'
import { useQuery, useQueryClient, UseQueryResult } from 'react-query'
import { NO_REFETCH, QUERY_KEYS } from '../constants'
import { populateCachePerId } from '../utils/populateCachePerId'

/**
 * Returns a dictionary keyed by the token addresses with allowances to a specific
 * contract for each token.
 * Stores queried allowances in cache.
 * @param readProvider read-capable provider to query token allowances through
 * @param address address that issues the allowance
 * @param spenderAddress wallet address that spends the allowance
 * @param tokenAddresses token addresses to query allowances for
 * @returns
 */
export const useTokenAllowances = (
  readProvider: providers.Provider,
  address: string,
  spenderAddress: string,
  tokenAddresses: string[]
): UseQueryResult<{ [tokenAddress: string]: BigNumber }, unknown> => {
  const queryClient = useQueryClient()

  const enabled =
    !!address &&
    !!spenderAddress &&
    tokenAddresses.every((tokenAddress) => !!tokenAddress && typeof tokenAddress === 'string') &&
    Array.isArray(tokenAddresses) &&
    tokenAddresses.length > 0 &&
    !!readProvider

  const queryKey = [QUERY_KEYS.tokenAllowances, address, spenderAddress, tokenAddresses]

  return useQuery(
    queryKey,
    async () => await getTokenAllowances(readProvider, address, spenderAddress, tokenAddresses),
    {
      enabled,
      ...NO_REFETCH,
      onSuccess: (data) => populateCachePerId(queryClient, queryKey, data)
    }
  )
}

/**
 * Returns a token's allowance for a given address and spender contract.
 * Wraps `useTokenAllowances`.
 * @param chainId read-capable provider to query token allowances through
 * @param address address that issues the allowance
 * @param spenderAddress wallet address that spends the allowance
 * @param tokenAddress token address to query allowance for
 * @returns
 */
export const useTokenAllowance = (
  readProvider: providers.Provider,
  address: string,
  spenderAddress: string,
  tokenAddress: string
): { data: BigNumber } & Omit<UseQueryResult<{ [tokenAddress: string]: BigNumber }>, 'data'> => {
  const result = useTokenAllowances(readProvider, address, spenderAddress, [tokenAddress])
  return { ...result, data: result.data?.[tokenAddress] as BigNumber }
}
