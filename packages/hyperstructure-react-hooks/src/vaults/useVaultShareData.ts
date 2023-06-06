import { NO_REFETCH } from '@pooltogether/generic-react-hooks'
import { TokenWithSupply, Vault } from '@pooltogether/hyperstructure-client-js'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants'

/**
 * Returns a vault's share data
 * @param vault instance of the `Vault` class
 * @returns
 */
export const useVaultShareData = (vault: Vault): UseQueryResult<TokenWithSupply, unknown> => {
  const queryKey = [QUERY_KEYS.vaultShareData, vault?.id]

  return useQuery(queryKey, async () => await vault.getShareData(), {
    enabled: !!vault,
    ...NO_REFETCH
  })
}
