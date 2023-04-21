import { useQuery } from '@tanstack/react-query'
import { Vault } from 'pt-client-js'
import { NO_REFETCH } from 'pt-generic-hooks'
import { QUERY_KEYS } from '../constants'

/**
 * Returns a vault's share data
 * @param vault instance of the `Vault` class
 * @returns
 */
export const useVaultShareData = (vault: Vault) => {
  const queryKey = [QUERY_KEYS.vaultShareData, vault?.id]

  return useQuery(queryKey, async () => await vault.getShareData(), {
    enabled: !!vault,
    ...NO_REFETCH
  })
}
