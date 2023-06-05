import { Vault } from '@pooltogether/hyperstructure-client-js'
import { useQuery } from '@tanstack/react-query'
import { NO_REFETCH } from 'generic-react-hooks'
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
