import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { Vault } from 'pt-client-js'
import { NO_REFETCH } from 'pt-generic-hooks'
import { QUERY_KEYS } from '../constants'

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
      const tokenAddress = await vault.getTokenAddress()
      return tokenAddress
    },
    {
      enabled: !!vault,
      ...NO_REFETCH
    }
  )
}
