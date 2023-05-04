import { useQuery, useQueryClient } from '@tanstack/react-query'
import { PrizePool, Vaults } from 'pt-client-js'
import { NO_REFETCH } from 'pt-generic-hooks'
import { QUERY_KEYS } from '../constants'
import { populateCachePerId } from '../utils/populateCachePerId'

/**
 * Returns each vault's percentage contribution to a prize pool
 * @param prizePool instance of the `PrizePool` class
 * @param vaults instance of the `Vaults` class
 * @param numDraws number of past draws to consider (default is `7`)
 * @returns
 */
export const useAllVaultPercentageContributions = (
  prizePool: PrizePool,
  vaults: Vaults,
  numDraws: number = 7
) => {
  const queryClient = useQueryClient()

  const vaultIds = !!vaults ? Object.keys(vaults.vaults) : []
  const getQueryKey = (val: (string | number)[]) => [
    QUERY_KEYS.vaultPercentageContributions,
    prizePool?.id,
    val
  ]

  return useQuery(
    getQueryKey(vaultIds),
    async () => {
      const lastDrawId = await prizePool.getLastDrawId()
      const vaultAddresses = Object.values(vaults.vaults).map((vault) => vault.address)
      const contributionPercentages = await prizePool.getVaultContributedPercentages(
        vaultAddresses,
        lastDrawId > numDraws ? lastDrawId - numDraws : 1,
        lastDrawId + 1
      )
      return contributionPercentages
    },
    {
      enabled: !!prizePool && !!vaults,
      ...NO_REFETCH,
      onSuccess: (data) => populateCachePerId(queryClient, getQueryKey, data)
    }
  )
}
