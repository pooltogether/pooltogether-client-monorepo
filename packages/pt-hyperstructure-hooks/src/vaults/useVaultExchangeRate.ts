import { useQuery } from '@tanstack/react-query'
import { Vault } from 'pt-client-js'
import { NO_REFETCH } from 'pt-generic-hooks'
import { QUERY_KEYS } from '../constants'

/**
 * Returns a vault's exchange rate to calculate shares to assets
 * @param vault instance of the `Vault` class
 * @param refetchInterval optional automatic refetching interval in ms
 * @returns
 */
export const useVaultExchangeRate = (vault: Vault, refetchInterval?: number) => {
  const queryKey = [QUERY_KEYS.vaultExchangeRates, vault?.id]

  return useQuery(queryKey, async () => await vault.getExchangeRate(), {
    enabled: !!vault,
    ...NO_REFETCH,
    refetchInterval: refetchInterval ?? false
  })
}
