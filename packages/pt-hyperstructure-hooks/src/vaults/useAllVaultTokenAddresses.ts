import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { Vaults } from 'pt-client-js'
import { NO_REFETCH } from 'pt-generic-hooks'
import { QUERY_KEYS } from '../constants'

/**
 * Returns underlying token addresses for each vault
 *
 * Stores queried addresses in cache
 * @param vaults instance of the `Vaults` class
 * @returns
 */
export const useAllVaultTokenAddresses = (
  vaults: Vaults
): UseQueryResult<
  {
    byChain: { [chainId: number]: `0x${string}`[] }
    byVault: { [vaultId: string]: `0x${string}` }
  },
  unknown
> => {
  const vaultIds = !!vaults ? Object.keys(vaults.vaults) : []
  const queryKey = [QUERY_KEYS.vaultTokenAddresses, vaultIds]

  return useQuery(queryKey, async () => await vaults.getUnderlyingTokenAddresses(), {
    enabled: !!vaults,
    ...NO_REFETCH
  })
}