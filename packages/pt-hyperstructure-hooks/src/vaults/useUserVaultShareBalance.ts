import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { Vault } from 'pt-client-js'
import { NO_REFETCH } from 'pt-generic-hooks'
import { TokenWithAmount } from 'pt-types'
import { QUERY_KEYS } from '../constants'

/**
 * Returns a user's share balance in a vault
 *
 * Stores queried vault balance in cache
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
  const queryClient = useQueryClient()

  const queryKey = [QUERY_KEYS.userVaultBalances, userAddress, [vault?.id]]

  const result = useQuery(queryKey, async () => await vault.getUserShareBalance(userAddress), {
    enabled: !!vault && !!userAddress,
    ...NO_REFETCH,
    refetchInterval: refetchInterval ?? false,
    onSuccess: (data) => queryClient.setQueryData(queryKey, { [vault.id]: data })
  }) as UseQueryResult<{ [vaultId: string]: TokenWithAmount }>

  return { ...result, data: result.data?.[vault?.id] }
}
