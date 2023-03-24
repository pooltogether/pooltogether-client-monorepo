import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { Vault, Vaults } from 'pt-client-js'
import { NO_REFETCH } from 'pt-generic-hooks'
import { QUERY_KEYS } from '../constants'
import { populateCachePerId } from '../utils/populateCachePerId'

/**
 * Returns underlying token addresses for each vault
 *
 * Stores queried addresses in cache
 * @param vaults instance of the `Vaults` class
 * @returns
 */
export const useVaultTokenAddresses = (
  vaults: Vaults
): UseQueryResult<
  {
    byChain: { [chainId: number]: `0x${string}`[] }
    byVault: { [vaultId: string]: `0x${string}` }
  },
  unknown
> => {
  const queryClient = useQueryClient()

  const vaultIds = !!vaults ? Object.keys(vaults.vaults) : []
  const getQueryKey = (val: (string | number)[]) => [QUERY_KEYS.vaultTokenAddresses, [val]]

  return useQuery(getQueryKey(vaultIds), async () => await vaults.getUnderlyingTokenAddresses(), {
    enabled: !!vaults,
    ...NO_REFETCH,
    onSuccess: (data) => populateCachePerId(queryClient, getQueryKey, data)
  })
}

/**
 * Returns a vault's underlying token address
 *
 * Stores queried address in cache
 * @param vault instance of the `Vault` class
 * @returns
 */
export const useVaultTokenAddress = (vault: Vault): UseQueryResult<`0x${string}`, unknown> => {
  const vaultId = !!vault ? [vault.id] : []
  const queryKey = [QUERY_KEYS.vaultTokenAddresses, vaultId]

  return useQuery(
    queryKey,
    async () => {
      const tokenContract = await vault.getTokenContract()
      return tokenContract.address
    },
    {
      enabled: !!vault,
      ...NO_REFETCH
    }
  )
}
