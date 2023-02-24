import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { providers, utils } from 'ethers'
import { VaultInfo, VaultInfoWithBalance, VaultList } from 'pt-types'
import { getAllUserVaultBalances, getVaultId } from 'pt-utilities'
import { useProviderChainIds } from '../blockchain/useProviderChainId'
import { NO_REFETCH, QUERY_KEYS } from '../constants'
import { populateCachePerId } from '../utils/populateCachePerId'

/**
 * Returns a user's share balance in vaults from a vault list
 *
 * Stores queried vault balances in cache
 * @param readProviders read-capable providers from any chains that should be queried
 * @param userAddress a user's address to check balances for
 * @param vaultList a vault list to check balances in
 * @param refetchInterval optional automatic refetching interval in ms
 * @returns
 */
export const useUserVaultBalances = (
  readProviders: providers.Provider[],
  userAddress: string,
  vaultList: VaultList,
  refetchInterval?: number
): UseQueryResult<{ [vaultId: string]: VaultInfoWithBalance }, unknown> => {
  const queryClient = useQueryClient()

  const { data: chainIds, isFetched: isFetchedChainIds } = useProviderChainIds(readProviders)

  const enabled = !!userAddress && utils.isAddress(userAddress) && isFetchedChainIds && !!chainIds

  const queryKey = [QUERY_KEYS.userVaultBalances, chainIds, userAddress, vaultList]

  return useQuery(
    queryKey,
    async () => await getAllUserVaultBalances(readProviders, userAddress, vaultList),
    {
      enabled,
      ...NO_REFETCH,
      refetchInterval: refetchInterval ?? false,
      onSuccess: (data) => populateCachePerId(queryClient, queryKey, data)
    }
  )
}

/**
 * Returns a user's share balance in a vault
 *
 * Wraps {@link useUserVaultBalances}
 * @param readProvider read-capable provider to query vault balance through
 * @param useAddress a user's address to check balance for
 * @param vaultInfo vault info for the vault to query a balance for
 * @param refetchInterval optional automatic refetching interval in ms
 * @returns
 */
export const useUserVaultBalance = (
  readProvider: providers.Provider,
  useAddress: string,
  vaultInfo: VaultInfo,
  refetchInterval?: number
): { data: VaultInfoWithBalance } & Omit<
  UseQueryResult<{ [vaultId: string]: VaultInfoWithBalance }>,
  'data'
> => {
  const vaultId = getVaultId(vaultInfo)
  const mockVaultList: VaultList = {
    name: 'Mock',
    version: { major: 0, minor: 0, patch: 1 },
    timestamp: '',
    tokens: [vaultInfo]
  }
  const result = useUserVaultBalances([readProvider], useAddress, mockVaultList, refetchInterval)
  return { ...result, data: result.data?.[vaultId] as VaultInfoWithBalance }
}
