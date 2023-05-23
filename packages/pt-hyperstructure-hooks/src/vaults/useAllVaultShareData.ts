import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { Vaults } from 'pt-client-js'
import { NO_REFETCH } from 'pt-generic-hooks'
import { TokenWithSupply } from 'pt-types'
import { populateCachePerId } from '..'
import { QUERY_KEYS } from '../constants'

/**
 * Returns share data for each vault
 *
 * Stores queried share data in cache
 * @param vaults instance of the `Vaults` class
 * @returns
 */
export const useAllVaultShareData = (
  vaults: Vaults
): UseQueryResult<{ [vaultId: string]: TokenWithSupply }, unknown> => {
  const queryClient = useQueryClient()

  const vaultIds = !!vaults ? Object.keys(vaults.vaults) : []
  const getQueryKey = (val: (string | number)[]) => [QUERY_KEYS.vaultShareData, val]

  return useQuery(getQueryKey(vaultIds), async () => await vaults.getShareData(), {
    enabled: !!vaults,
    ...NO_REFETCH,
    onSuccess: (data) => populateCachePerId(queryClient, getQueryKey, data)
  })
}
