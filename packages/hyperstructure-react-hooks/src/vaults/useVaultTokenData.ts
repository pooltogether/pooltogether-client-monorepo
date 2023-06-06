import { NO_REFETCH } from '@pooltogether/generic-react-hooks'
import { Vault } from '@pooltogether/hyperstructure-client-js'
import { useQuery } from '@tanstack/react-query'
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
