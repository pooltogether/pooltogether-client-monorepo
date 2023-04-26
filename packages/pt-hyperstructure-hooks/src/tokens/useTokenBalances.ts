import { useQueries, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { providers, utils } from 'ethers'
import { useMemo } from 'react'
import { useProvider } from 'wagmi'
import { NO_REFETCH } from 'pt-generic-hooks'
import { TokenWithAmount } from 'pt-types'
import { getTokenBalances } from 'pt-utilities'
import { populateCachePerId, useProvidersByChain } from '..'
import { QUERY_KEYS } from '../constants'

/**
 * Returns an address's token balances
 *
 * Stores queried balances in cache
 * @param chainId chain ID
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
): UseQueryResult<{ [tokenAddress: string]: TokenWithAmount }, unknown> => {
  const queryClient = useQueryClient()

  const provider = useProvider({ chainId })

  const enabled =
    !!chainId &&
    !!address &&
    !!tokenAddresses &&
    tokenAddresses.every((tokenAddress) => !!tokenAddress && utils.isAddress(tokenAddress)) &&
    Array.isArray(tokenAddresses) &&
    tokenAddresses.length > 0 &&
    !!provider

  const getQueryKey = (val: (string | number)[]) => [
    QUERY_KEYS.tokenBalances,
    chainId,
    address,
    val
  ]

  return useQuery(
    getQueryKey(tokenAddresses),
    async () => await getTokenBalances(provider, address, tokenAddresses),
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
 * @param chainId chain ID
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
): { data?: TokenWithAmount } & Omit<
  UseQueryResult<{ [tokenAddress: string]: TokenWithAmount }>,
  'data'
> => {
  const result = useTokenBalances(chainId, address, [tokenAddress], refetchInterval)
  return { ...result, data: result.data?.[tokenAddress] }
}

/**
 * Returns an address's token balance across many chains
 * @param chainIds chain IDs
 * @param address address to check for token balances
 * @param tokenAddresses token addresses for each chain to query balances for
 * @returns
 */
export const useTokenBalancesAcrossChains = (
  chainIds: number[],
  address: string,
  tokenAddresses: { [chainId: number]: string[] }
) => {
  const providers = useProvidersByChain()

  const filteredProviders: { [chainId: number]: providers.Provider } = {}
  chainIds.forEach((chainId) => {
    if (!!providers[chainId]) {
      filteredProviders[chainId] = providers[chainId]
    }
  })

  const results = useQueries({
    queries: Object.keys(filteredProviders).map((strChainId) => {
      const chainId = parseInt(strChainId)
      const provider = filteredProviders[chainId]

      const chainTokenAddresses = !!chainId ? tokenAddresses?.[chainId] : []

      const enabled =
        !!chainId &&
        !!address &&
        !!chainTokenAddresses &&
        chainTokenAddresses.every(
          (tokenAddress) => !!tokenAddress && utils.isAddress(tokenAddress)
        ) &&
        Array.isArray(chainTokenAddresses) &&
        chainTokenAddresses.length > 0 &&
        !!provider

      const queryKey = [QUERY_KEYS.tokenBalances, chainId, address, chainTokenAddresses]

      return {
        queryKey: queryKey,
        queryFn: async () => {
          const tokenBalances = await getTokenBalances(provider, address, chainTokenAddresses)
          return { chainId, tokenBalances }
        },
        enabled,
        ...NO_REFETCH
      }
    })
  })

  return useMemo(() => {
    const isFetched = results?.every((result) => result.isFetched)
    const refetch = () => results?.forEach((result) => result.refetch())

    const formattedData: { [chainId: number]: { [tokenAddress: string]: TokenWithAmount } } = {}
    results.forEach((result) => {
      if (result.data && result.data.chainId) {
        formattedData[result.data.chainId] = result.data.tokenBalances
      }
    })
    return { isFetched, refetch, data: formattedData }
  }, [results])
}
