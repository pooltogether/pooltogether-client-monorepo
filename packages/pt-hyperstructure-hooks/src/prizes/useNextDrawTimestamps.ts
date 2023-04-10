import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { PrizePool } from 'pt-client-js'
import { NO_REFETCH } from 'pt-generic-hooks'
import { QUERY_KEYS } from '../constants'
import { useDrawPeriod } from './useDrawPeriod'

/**
 * Returns the start and end timestamps of a prize pool's next draw (in seconds)
 * @param prizePool instance of the `PrizePool` class
 * @returns
 */
export const useNextDrawTimestamps = (
  prizePool: PrizePool
): UseQueryResult<{ start: number; end: number }, unknown> => {
  const { data: drawPeriod, isFetched: isFetchedDrawPeriod } = useDrawPeriod(prizePool)

  const enabled = !!prizePool && isFetchedDrawPeriod && drawPeriod !== undefined

  const queryKey = [QUERY_KEYS.nextDrawTimestamp, prizePool?.id]

  return useQuery(
    queryKey,
    async () => {
      const start = await prizePool.getNextDrawStartTimestamp()
      const end = start + (drawPeriod ?? 0)
      return { start, end }
    },
    {
      enabled,
      ...NO_REFETCH
    }
  )
}
