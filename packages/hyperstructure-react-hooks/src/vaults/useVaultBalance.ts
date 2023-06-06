import { NO_REFETCH } from '@pooltogether/generic-react-hooks'
import { Vault } from '@pooltogether/hyperstructure-client-js'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants'

/**
 * Returns a vault's total underlying token balance
 * @param vault instance of the `Vault` class
 * @param refetchInterval optional automatic refetching interval in ms
 * @returns
 */
export const useVaultBalance = (vault: Vault, refetchInterval?: number) => {
  const queryKey = [QUERY_KEYS.vaultBalances, vault?.id]

  return useQuery(queryKey, async () => await vault.getTotalTokenBalance(), {
    enabled: !!vault,
    ...NO_REFETCH,
    refetchInterval: refetchInterval ?? false
  })
}
