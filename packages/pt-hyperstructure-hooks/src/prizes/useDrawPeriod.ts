import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { PrizePool } from 'pt-client-js'
import { NO_REFETCH } from 'pt-generic-hooks'
import { QUERY_KEYS } from '../constants'

/**
 * Returns a prize pool's draw period (in seconds)
 * @param prizePool instance of the `PrizePool` class
 * @returns
 */
export const useDrawPeriod = (prizePool: PrizePool): UseQueryResult<number, unknown> => {
  const queryKey = [QUERY_KEYS.drawPeriod, prizePool?.id]

  return useQuery(queryKey, async () => await prizePool.getDrawPeriodInSeconds(), {
    enabled: !!prizePool,
    ...NO_REFETCH
  })
}
