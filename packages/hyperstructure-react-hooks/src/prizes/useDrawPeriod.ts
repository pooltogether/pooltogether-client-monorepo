import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { NO_REFETCH } from 'generic-react-hooks'
import { PrizePool } from 'hyperstructure-client-js'
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
