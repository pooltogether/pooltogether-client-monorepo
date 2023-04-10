import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { PrizePool } from 'pt-client-js'
import { NO_REFETCH } from 'pt-generic-hooks'
import { QUERY_KEYS } from '../constants'

/**
 * Returns the start timestamp of a prize pool's next draw (in seconds)
 * @param prizePool instance of the `PrizePool` class
 * @returns
 */
export const useNextDrawTimestamp = (prizePool: PrizePool): UseQueryResult<number, unknown> => {
  const queryKey = [QUERY_KEYS.nextDrawTimestamp, prizePool?.id]

  return useQuery(queryKey, async () => await prizePool.getNextDrawStartTimestamp(), {
    enabled: !!prizePool,
    ...NO_REFETCH
  })
}
