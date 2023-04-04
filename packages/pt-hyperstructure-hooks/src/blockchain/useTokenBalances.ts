import { useQueries, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { providers, utils } from 'ethers'
import { useMemo } from 'react'
import { NO_REFETCH } from 'pt-generic-hooks'
import { TokenWithBalance } from 'pt-types'
import { getTokenBalances } from 'pt-utilities'
import { QUERY_KEYS } from '../constants'
import { populateCachePerId } from '../utils/populateCachePerId'
import { useProviderChainId, useProviderChainIds } from './useProviderChainId'

/**
 * Returns an address's token balances
 *
 * Stores queried balances in cache
 * @param readProvider read-capable provider to query token balances through
 * @param address address to check for token balances
 * @param tokenAddresses token addresses to query balances for
 * @param refetchInterval optional automatic refetching interval in ms
 * @returns
 */
export const useTokenBalances = (
  readProvider: providers.Provider,
  address: string,
  tokenAddresses: string[],
  refetchInterval?: number
): UseQueryResult<{ [tokenAddress: string]: TokenWithBalance }, unknown> => {
  const queryClient = useQueryClient()

  const { data: chainId, isFetched: isFetchedChainId } = useProviderChainId(readProvider)

  const enabled =
    !!address &&
    !!tokenAddresses &&
    tokenAddresses.every((tokenAddress) => !!tokenAddress && utils.isAddress(tokenAddress)) &&
    Array.isArray(tokenAddresses) &&
    tokenAddresses.length > 0 &&
    !!readProvider &&
    readProvider._isProvider &&
    isFetchedChainId &&
    !!chainId

  const getQueryKey = (val: (string | number)[]) => [
    QUERY_KEYS.tokenBalances,
    chainId,
    address,
    val
  ]

  return useQuery(
    getQueryKey(tokenAddresses),
    async () => await getTokenBalances(readProvider, address, tokenAddresses),
    {
      enabled,
      ...NO_REFETCH,
      refetchInterval: refetchInterval ?? false,
      onSuccess: (data) => populateCachePerId(queryClient, getQueryKey, data)
    }
  )
}

/**
 * Returns an address's token balance
 *
 * Wraps {@link useTokenBalances}
 * @param readProvider read-capable provider to query token balance through
 * @param address address to check for token balance
 * @param tokenAddress token address to query balance for
 * @param refetchInterval optional automatic refetching interval in ms
 * @returns
 */
export const useTokenBalance = (
  readProvider: providers.Provider,
  address: string,
  tokenAddress: string,
  refetchInterval?: number
): { data?: TokenWithBalance } & Omit<
  UseQueryResult<{ [tokenAddress: string]: TokenWithBalance }>,
  'data'
> => {
  const result = useTokenBalances(readProvider, address, [tokenAddress], refetchInterval)
  return { ...result, data: result.data?.[tokenAddress] }
}

/**
 * Returns an address's token balance across many chains
 * @param readProviders read-capable providers to query token balances through
 * @param address address to check for token balances
 * @param tokenAddresses token addresses for each chain to query balances for
 * @returns
 */
export const useTokenBalancesAcrossChains = (
  readProviders: providers.Provider[],
  address: string,
  tokenAddresses: { [chainId: number]: string[] }
) => {
  const { data: chainIds, isFetched: isFetchedChainIds } = useProviderChainIds(readProviders)

  const results = useQueries({
    queries: readProviders.map((readProvider, i) => {
      const chainId = chainIds?.[i]
      const chainTokenAddresses = !!chainId ? tokenAddresses?.[chainId] : []

      const enabled =
        !!address &&
        !!chainTokenAddresses &&
        chainTokenAddresses.every(
          (tokenAddress) => !!tokenAddress && utils.isAddress(tokenAddress)
        ) &&
        Array.isArray(chainTokenAddresses) &&
        chainTokenAddresses.length > 0 &&
        !!readProvider &&
        readProvider._isProvider &&
        isFetchedChainIds &&
        !!chainId

      const queryKey = [QUERY_KEYS.tokenBalances, chainId, address, chainTokenAddresses]

      return {
        queryKey: queryKey,
        queryFn: async () => {
          const tokenBalances = await getTokenBalances(readProvider, address, chainTokenAddresses)
          return { chainId, tokenBalances }
        },
        enabled,
        ...NO_REFETCH
      }
    })
  })

  return useMemo(() => {
    const isFetched = results?.every((result) => result.isFetched)
    const refetch = async () => results?.forEach((result) => result.refetch())

    const formattedData: { [chainId: number]: { [tokenAddress: string]: TokenWithBalance } } = {}
    results.forEach((result) => {
      if (result.data && result.data.chainId) {
        formattedData[result.data.chainId] = result.data.tokenBalances
      }
    })
    return { isFetched, refetch, data: formattedData }
  }, [results])
}
