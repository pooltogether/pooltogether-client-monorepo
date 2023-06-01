import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { NO_REFETCH } from 'generic-react-hooks'
import { Vaults } from 'hyperstructure-client-js'
import { TokenWithSupply } from 'types'
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
