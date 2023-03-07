import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { BigNumber, providers } from 'ethers'
import { NO_REFETCH } from 'pt-generic-hooks'
import { VaultInfo, VaultList } from 'pt-types'
import { getAllVaultBalances, getVaultId } from 'pt-utilities'
import { useProviderChainIds } from '../blockchain/useProviderChainId'
import { QUERY_KEYS } from '../constants'
import { populateCachePerId } from '../utils/populateCachePerId'

/**
 * Returns the total underlying token amount deposited in all vaults from a vault list
 *
 * Stores queried balances in cache
 * @param readProviders read-capable providers from any chains that should be queried
 * @param vaultList a vault list to query through vaults in
 * @param refetchInterval optional automatic refetching interval in ms
 * @returns
 */
export const useVaultBalances = (
  readProviders: providers.Provider[],
  vaultList: VaultList,
  refetchInterval?: number
): UseQueryResult<{ [vaultId: string]: BigNumber }, unknown> => {
  const queryClient = useQueryClient()

  const { data: chainIds, isFetched: isFetchedChainIds } = useProviderChainIds(readProviders)

  const enabled =
    !!readProviders &&
    readProviders.length > 0 &&
    readProviders.every((provider) => provider?._isProvider) &&
    isFetchedChainIds &&
    !!chainIds

  const queryKey = [QUERY_KEYS.vaultBalances, chainIds, vaultList]

  return useQuery(queryKey, async () => await getAllVaultBalances(readProviders, vaultList), {
    enabled,
    ...NO_REFETCH,
    refetchInterval: refetchInterval ?? false,
    onSuccess: (data) => populateCachePerId(queryClient, queryKey, data)
  })
}

/**
 * Returns a vault's total underlying token amount deposited
 *
 * Wraps {@link useVaultBalances}
 * @param readProvider read-capable provider to query vault balance through
 * @param vaultInfo vault info for the vault to query balance for
 * @param refetchInterval optional automatic refetching interval in ms
 * @returns
 */
export const useVaultBalance = (
  readProvider: providers.Provider,
  vaultInfo: VaultInfo,
  refetchInterval?: number
): { data: BigNumber } & Omit<UseQueryResult<{ [vaultId: string]: BigNumber }>, 'data'> => {
  const vaultId = getVaultId(vaultInfo)
  const mockVaultList: VaultList = {
    name: 'Mock',
    version: { major: 0, minor: 0, patch: 1 },
    timestamp: '',
    tokens: [vaultInfo]
  }
  const result = useVaultBalances([readProvider], mockVaultList, refetchInterval)
  return { ...result, data: result.data?.[vaultId] as BigNumber }
}
