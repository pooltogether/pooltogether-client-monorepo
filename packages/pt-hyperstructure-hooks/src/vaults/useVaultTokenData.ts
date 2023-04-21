import { useQuery } from '@tanstack/react-query'
import { Vault } from 'pt-client-js'
import { NO_REFETCH } from 'pt-generic-hooks'
import { QUERY_KEYS } from '../constants'

/**
 * Returns a vault's underlying token data
 * @param vault instance of the `Vault` class
 * @returns
 */
export const useVaultTokenData = (vault: Vault) => {
  const queryKey = [QUERY_KEYS.vaultTokenData, vault?.id]

  return useQuery(queryKey, async () => await vault.getTokenData(), {
    enabled: !!vault,
    ...NO_REFETCH
  })
}
