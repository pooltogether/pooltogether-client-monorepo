import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { BigNumber } from 'ethers'
import { Vault, Vaults } from 'pt-client-js'
import { NO_REFETCH } from 'pt-generic-hooks'
import { QUERY_KEYS } from '../constants'
import { populateCachePerId } from '../utils/populateCachePerId'

/**
 * Returns the total underlying token balance deposited in each vault
 *
 * Stores queried balances in cache
 * @param vaults instance of the `Vaults` class
 * @param refetchInterval optional automatic refetching interval in ms
 * @returns
 */
export const useVaultBalances = (
  vaults: Vaults,
  refetchInterval?: number
): UseQueryResult<{ [vaultId: string]: BigNumber }, unknown> => {
  const queryClient = useQueryClient()

  const queryKey = [QUERY_KEYS.vaultBalances, vaults?.vaultAddresses]

  return useQuery(queryKey, async () => await vaults.getTotalTokenBalances(), {
    enabled: !!vaults,
    ...NO_REFETCH,
    refetchInterval: refetchInterval ?? false,
    onSuccess: (data) => populateCachePerId(queryClient, queryKey, data)
  })
}

/**
 * Returns a vault's total underlying token balance
 *
 * Stores queried balance in cache
 * @param vault instance of the `Vault` class
 * @param refetchInterval optional automatic refetching interval in ms
 * @returns
 */
export const useVaultBalance = (
  vault: Vault,
  refetchInterval?: number
): UseQueryResult<BigNumber, unknown> => {
  const queryClient = useQueryClient()

  const queryKey = [QUERY_KEYS.vaultBalances, !!vault ? [{ [vault.chainId]: vault.address }] : []]

  return useQuery(queryKey, async () => await vault.getTotalTokenBalance(), {
    enabled: !!vault,
    ...NO_REFETCH,
    refetchInterval: refetchInterval ?? false,
    onSuccess: (data) => populateCachePerId(queryClient, queryKey, { [vault.id]: data })
  })
}
