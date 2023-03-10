import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { BigNumber } from 'ethers'
import { Vault, Vaults } from 'pt-client-js'
import { NO_REFETCH } from 'pt-generic-hooks'
import { QUERY_KEYS } from '../constants'
import { populateCachePerId } from '../utils/populateCachePerId'

/**
 * Returns exchange rates to calculate shares to assets in each vault
 *
 * Stores queried exchange rates in cache
 * @param vaults instance of the `Vaults` class
 * @param refetchInterval optional automatic refetching interval in ms
 * @returns
 */
export const useVaultExchangeRates = (
  vaults: Vaults,
  refetchInterval?: number
): UseQueryResult<{ [vaultId: string]: BigNumber }, unknown> => {
  const queryClient = useQueryClient()

  const queryKey = [QUERY_KEYS.vaultExchangeRates, vaults?.vaultAddresses]

  return useQuery(queryKey, async () => await vaults.getExchangeRates(), {
    enabled: !!vaults,
    ...NO_REFETCH,
    refetchInterval: refetchInterval ?? false,
    onSuccess: (data) => populateCachePerId(queryClient, queryKey, data)
  })
}

/**
 * Returns a vault's exchange rate to calculate shares to assets
 *
 * Stores queried exchange rate in cache
 * @param vault instance of the `Vault` class
 * @param refetchInterval optional automatic refetching interval in ms
 * @returns
 */
export const useVaultExchangeRate = (
  vault: Vault,
  refetchInterval?: number
): UseQueryResult<BigNumber, unknown> => {
  const queryClient = useQueryClient()

  const queryKey = [
    QUERY_KEYS.vaultExchangeRates,
    !!vault ? [{ [vault.chainId]: vault.address }] : []
  ]

  return useQuery(queryKey, async () => await vault.getExchangeRate(), {
    enabled: !!vault,
    ...NO_REFETCH,
    refetchInterval: refetchInterval ?? false,
    onSuccess: (data) => populateCachePerId(queryClient, queryKey, { [vault.id]: data })
  })
}
