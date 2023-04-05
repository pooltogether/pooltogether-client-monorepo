import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { Vault } from 'pt-client-js'
import { NO_REFETCH } from 'pt-generic-hooks'
import { TokenWithSupply } from 'pt-types'
import { QUERY_KEYS } from '../constants'

/**
 * Returns a vault's underlying token data
 *
 * Stores queried token data in cache
 * @param vault instance of the `Vault` class
 * @returns
 */
export const useVaultTokenData = (vault: Vault) => {
  const queryClient = useQueryClient()

  const queryKey = [QUERY_KEYS.vaultTokenData, [vault?.id]]

  const result = useQuery(queryKey, async () => await vault.getTokenData(), {
    enabled: !!vault,
    ...NO_REFETCH,
    onSuccess: (data) => queryClient.setQueryData(queryKey, { [vault.id]: data })
  }) as UseQueryResult<{ [vaultId: string]: TokenWithSupply }>

  return { ...result, data: result.data?.[vault?.id] }
}
