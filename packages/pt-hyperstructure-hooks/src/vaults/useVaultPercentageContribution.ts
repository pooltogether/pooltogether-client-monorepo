import { useQuery, useQueryClient } from '@tanstack/react-query'
import { PrizePool, Vault } from 'pt-client-js'
import { NO_REFETCH } from 'pt-generic-hooks'
import { QUERY_KEYS } from '../constants'
import { populateCachePerId } from '../utils/populateCachePerId'

/**
 * Returns a vault's percentage contribution to a prize pool
 * @param prizePool instance of the `PrizePool` class
 * @param vault instance of the `Vault` class
 * @param numDraws number of past draws to consider (default is `7`)
 * @returns
 */
export const useVaultPercentageContribution = (
  prizePool: PrizePool,
  vault: Vault,
  numDraws: number = 7
) => {
  const queryClient = useQueryClient()

  const getQueryKey = (val: (string | number)[]) => [
    QUERY_KEYS.vaultPercentageContributions,
    prizePool?.id,
    numDraws,
    val
  ]

  return useQuery(
    getQueryKey([vault.id]),
    async () => {
      const lastDrawId = await prizePool.getLastDrawId()
      const contributionPercentages = await prizePool.getVaultContributedPercentages(
        [vault.address],
        lastDrawId > numDraws ? lastDrawId - numDraws : 1,
        lastDrawId + 1
      )
      const contributionPercentage = contributionPercentages[vault.id]
      return contributionPercentage
    },
    {
      enabled: !!prizePool && !!vault,
      ...NO_REFETCH,
      onSuccess: (data) => populateCachePerId(queryClient, getQueryKey, { [vault.id]: data })
    }
  )
}
