import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { BigNumber, providers, utils } from 'ethers'
import { NO_REFETCH } from 'pt-generic-hooks'
import { getTokenAllowances } from 'pt-utilities'
import { populateCachePerId, useProviderChainId } from '..'
import { QUERY_KEYS } from '../constants'

/**
 * Returns a dictionary keyed by the token addresses with allowances to a specific
 * contract for each token
 *
 * Stores queried allowances in cache
 * @param readProvider read-capable provider to query token allowances through
 * @param address address that issues the allowance
 * @param spenderAddress wallet address that spends the allowance
 * @param tokenAddresses token addresses to query allowances for
 * @param refetchInterval optional automatic refetching interval in ms
 * @returns
 */
export const useTokenAllowances = (
  readProvider: providers.Provider,
  address: string,
  spenderAddress: string,
  tokenAddresses: string[],
  refetchInterval?: number
): UseQueryResult<{ [tokenAddress: string]: BigNumber }, unknown> => {
  const queryClient = useQueryClient()

  const { data: chainId, isFetched: isFetchedChainId } = useProviderChainId(readProvider)

  const enabled =
    !!address &&
    !!spenderAddress &&
    tokenAddresses.every((tokenAddress) => !!tokenAddress && utils.isAddress(tokenAddress)) &&
    Array.isArray(tokenAddresses) &&
    tokenAddresses.length > 0 &&
    !!readProvider &&
    readProvider._isProvider &&
    isFetchedChainId &&
    !!chainId

  const getQueryKey = (val: (string | number)[]) => [
    QUERY_KEYS.tokenAllowances,
    chainId,
    address,
    spenderAddress,
    val
  ]

  return useQuery(
    getQueryKey(tokenAddresses),
    async () => await getTokenAllowances(readProvider, address, spenderAddress, tokenAddresses),
    {
      enabled,
      ...NO_REFETCH,
      refetchInterval: refetchInterval ?? false,
      onSuccess: (data) => populateCachePerId(queryClient, getQueryKey, data)
    }
  )
}

/**
 * Returns a token's allowance for a given address and spender contract
 *
 * Wraps {@link useTokenAllowances}
 * @param chainId read-capable provider to query token allowances through
 * @param address address that issues the allowance
 * @param spenderAddress wallet address that spends the allowance
 * @param tokenAddress token address to query allowance for
 * @param refetchInterval optional automatic refetching interval in ms
 * @returns
 */
export const useTokenAllowance = (
  readProvider: providers.Provider,
  address: string,
  spenderAddress: string,
  tokenAddress: string,
  refetchInterval?: number
): { data?: BigNumber } & Omit<UseQueryResult<{ [tokenAddress: string]: BigNumber }>, 'data'> => {
  const result = useTokenAllowances(
    readProvider,
    address,
    spenderAddress,
    [tokenAddress],
    refetchInterval
  )
  return { ...result, data: result.data?.[tokenAddress] }
}
