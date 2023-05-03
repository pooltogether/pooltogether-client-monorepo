import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { PrizePool } from 'pt-client-js'
import { NO_REFETCH } from 'pt-generic-hooks'
import { QUERY_KEYS } from '../constants'

/**
 * Returns a prize pool's estimated number of prizes awarded based on number of tiers active
 * @param prizePool instance of the `PrizePool` class
 * @returns
 */
export const useEstimatedPrizeCount = (prizePool: PrizePool): UseQueryResult<number, unknown> => {
  const queryKey = [QUERY_KEYS.estimatedPrizeCount, prizePool?.id]

  return useQuery(queryKey, async () => await prizePool.getEstimatedPrizeCount(), {
    enabled: !!prizePool,
    ...NO_REFETCH
  })
}
