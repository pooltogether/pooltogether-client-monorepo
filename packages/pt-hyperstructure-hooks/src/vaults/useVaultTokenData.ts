import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { Vault, Vaults } from 'pt-client-js'
import { NO_REFETCH } from 'pt-generic-hooks'
import { TokenWithSupply } from 'pt-types'
import { QUERY_KEYS } from '../constants'
import { populateCachePerId } from '../utils/populateCachePerId'

/**
 * Returns underlying token data for each vault
 *
 * Stores queried token data in cache
 * @param vaults instance of the `Vaults` class
 * @returns
 */
export const useVaultTokenData = (
  vaults: Vaults
): UseQueryResult<{ [vaultId: string]: TokenWithSupply }, unknown> => {
  const queryClient = useQueryClient()

  const vaultIds = !!vaults ? Object.keys(vaults.vaults) : []
  const getQueryKey = (val: (string | number)[]) => [QUERY_KEYS.vaultTokenData, val]

  return useQuery(getQueryKey(vaultIds), async () => await vaults.getTokenData(), {
    enabled: !!vaults,
    ...NO_REFETCH,
    onSuccess: (data) => populateCachePerId(queryClient, getQueryKey, data)
  })
}

/**
 * Returns a vault's token data
 *
 * Stores queried token data in cache
 * @param vault instance of the `Vault` class
 * @returns
 */
export const useSingleVaultTokenData = (vault: Vault) => {
  const queryClient = useQueryClient()

  const queryKey = [QUERY_KEYS.vaultTokenData, [vault?.id]]

  const result = useQuery(queryKey, async () => await vault.getTokenData(), {
    enabled: !!vault,
    ...NO_REFETCH,
    onSuccess: (data) => queryClient.setQueryData(queryKey, { [vault.id]: data })
  }) as UseQueryResult<{ [vaultId: string]: TokenWithSupply }>

  return { ...result, data: result.data?.[vault?.id] }
}
