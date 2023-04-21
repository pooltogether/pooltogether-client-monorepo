import { useQuery } from '@tanstack/react-query'
import { Vault } from 'pt-client-js'
import { NO_REFETCH } from 'pt-generic-hooks'
import { QUERY_KEYS } from '../constants'

/**
 * Returns a user's share balance in a vault
 * @param vault instance of the `Vault` class
 * @param userAddress user address to get balance for
 * @param refetchInterval optional automatic refetching interval in ms
 * @returns
 */
export const useUserVaultShareBalance = (
  vault: Vault,
  userAddress: string,
  refetchInterval?: number
) => {
  const queryKey = [QUERY_KEYS.userVaultBalances, userAddress, vault?.id]

  return useQuery(queryKey, async () => await vault.getUserShareBalance(userAddress), {
    enabled: !!vault && !!userAddress,
    ...NO_REFETCH,
    refetchInterval: refetchInterval ?? false
  })
}
