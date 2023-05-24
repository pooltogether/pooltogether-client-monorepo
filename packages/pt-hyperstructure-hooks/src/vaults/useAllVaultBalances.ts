import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { Vaults } from 'pt-client-js'
import { NO_REFETCH } from 'pt-generic-hooks'
import { TokenWithAmount } from 'pt-types'
import { populateCachePerId } from '..'
import { QUERY_KEYS } from '../constants'

/**
 * Returns the total underlying token balance deposited in each vault
 *
 * Stores queried balances in cache
 * @param vaults instance of the `Vaults` class
 * @param refetchInterval optional automatic refetching interval in ms
 * @returns
 */
export const useAllVaultBalances = (
  vaults: Vaults,
  refetchInterval?: number
): UseQueryResult<{ [vaultId: string]: TokenWithAmount }, unknown> => {
  const queryClient = useQueryClient()

  const vaultIds = !!vaults ? Object.keys(vaults.vaults) : []
  const getQueryKey = (val: (string | number)[]) => [QUERY_KEYS.vaultBalances, val]

  return useQuery(getQueryKey(vaultIds), async () => await vaults.getTotalTokenBalances(), {
    enabled: !!vaults,
    ...NO_REFETCH,
    refetchInterval: refetchInterval ?? false,
    onSuccess: (data) => populateCachePerId(queryClient, getQueryKey, data)
  })
}
