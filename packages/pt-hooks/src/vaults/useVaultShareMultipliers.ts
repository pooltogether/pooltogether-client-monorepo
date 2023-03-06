import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { BigNumber, providers } from 'ethers'
import { VaultInfo, VaultList } from 'pt-types'
import { getAllVaultShareMultipliers, getVaultId } from 'pt-utilities'
import { useProviderChainIds } from '../blockchain/useProviderChainId'
import { NO_REFETCH, QUERY_KEYS } from '../constants'
import { populateCachePerId } from '../utils/populateCachePerId'

/**
 * Returns multipliers to calculate shares to assets in all vaults from a vault list
 *
 * Stores queried multipliers in cache
 * @param readProviders read-capable providers from any chains that should be queried
 * @param vaultList a vault list to query through vaults in
 * @param refetchInterval optional automatic refetching interval in ms
 * @returns
 */
export const useVaultShareMultipliers = (
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

  const queryKey = [QUERY_KEYS.vaultShareMultipliers, chainIds, vaultList]

  return useQuery(
    queryKey,
    async () => await getAllVaultShareMultipliers(readProviders, vaultList),
    {
      enabled,
      ...NO_REFETCH,
      refetchInterval: refetchInterval ?? false,
      onSuccess: (data) => populateCachePerId(queryClient, queryKey, data)
    }
  )
}

/**
 * Returns a vault's multiplier to calculate shares to assets
 *
 * Wraps {@link useVaultShareMultipliers}
 * @param readProvider read-capable provider to query vault multiplier through
 * @param vaultInfo vault info for the vault to query a multiplier for
 * @param refetchInterval optional automatic refetching interval in ms
 * @returns
 */
export const useVaultShareMultiplier = (
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
  const result = useVaultShareMultipliers([readProvider], mockVaultList, refetchInterval)
  return { ...result, data: result.data?.[vaultId] as BigNumber }
}
