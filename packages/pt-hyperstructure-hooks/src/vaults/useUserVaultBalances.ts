import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { Vault, Vaults } from 'pt-client-js'
import { NO_REFETCH } from 'pt-generic-hooks'
import { VaultInfoWithBalance } from 'pt-types'
import { QUERY_KEYS } from '../constants'
import { populateCachePerId } from '../utils/populateCachePerId'

/**
 * Returns a user's share balance in each vault
 *
 * Stores queried vault balances in cache
 * @param vaults instance of the `Vaults` class
 * @param userAddress user address to get balances for
 * @param refetchInterval optional automatic refetching interval in ms
 * @returns
 */
export const useUserVaultBalances = (
  vaults: Vaults,
  userAddress: string,
  refetchInterval?: number
): UseQueryResult<{ [vaultId: string]: VaultInfoWithBalance }, unknown> => {
  const queryClient = useQueryClient()

  const vaultIds = !!vaults ? Object.keys(vaults.vaults) : []
  const queryKey = [QUERY_KEYS.userVaultBalances, userAddress, vaultIds]

  return useQuery(queryKey, async () => await vaults.getUserShareBalances(userAddress), {
    enabled: !!vaults && !!userAddress,
    ...NO_REFETCH,
    refetchInterval: refetchInterval ?? false,
    onSuccess: (data) => populateCachePerId(queryClient, queryKey, data)
  })
}

/**
 * Returns a user's share balance in a vault
 *
 * Stores queried vault balance in cache
 * @param vault instance of the `Vault` class
 * @param userAddress user address to get balance for
 * @param refetchInterval optional automatic refetching interval in ms
 * @returns
 */
export const useUserVaultBalance = (
  vault: Vault,
  userAddress: string,
  refetchInterval?: number
): UseQueryResult<VaultInfoWithBalance, unknown> => {
  const queryClient = useQueryClient()

  const vaultId = !!vault ? [vault.id] : []
  const queryKey = [QUERY_KEYS.userVaultBalances, userAddress, vaultId]

  return useQuery(queryKey, async () => await vault.getUserShareBalance(userAddress), {
    enabled: !!vault && !!userAddress,
    ...NO_REFETCH,
    refetchInterval: refetchInterval ?? false,
    onSuccess: (data) => populateCachePerId(queryClient, queryKey, { [vault.id]: data })
  })
}
