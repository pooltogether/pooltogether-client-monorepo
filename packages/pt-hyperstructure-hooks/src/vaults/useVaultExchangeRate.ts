import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { BigNumber } from 'ethers'
import { Vault } from 'pt-client-js'
import { NO_REFETCH } from 'pt-generic-hooks'
import { QUERY_KEYS } from '../constants'

/**
 * Returns a vault's exchange rate to calculate shares to assets
 *
 * Stores queried exchange rate in cache
 * @param vault instance of the `Vault` class
 * @param refetchInterval optional automatic refetching interval in ms
 * @returns
 */
export const useVaultExchangeRate = (vault: Vault, refetchInterval?: number) => {
  const queryClient = useQueryClient()

  const queryKey = [QUERY_KEYS.vaultExchangeRates, [vault?.id]]

  const result = useQuery(queryKey, async () => await vault.getExchangeRate(), {
    enabled: !!vault,
    ...NO_REFETCH,
    refetchInterval: refetchInterval ?? false,
    onSuccess: (data) => queryClient.setQueryData(queryKey, { [vault.id]: data })
  }) as UseQueryResult<{ [vaultId: string]: BigNumber }>

  return { ...result, data: result.data?.[vault?.id] }
}
