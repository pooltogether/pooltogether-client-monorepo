import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { PrizePool } from 'pt-client-js'
import { NO_REFETCH } from 'pt-generic-hooks'
import { TokenWithSupply } from 'pt-types'
import { QUERY_KEYS } from '../constants'

/**
 * Returns basic data about the token awarded by a prize pool
 * @param prizePool
 * @returns
 */
export const usePrizeTokenData = (
  prizePool: PrizePool
): UseQueryResult<TokenWithSupply, unknown> => {
  const queryKey = [QUERY_KEYS.prizeTokenData, prizePool?.id]

  return useQuery(queryKey, async () => await prizePool.getPrizeTokenData(), {
    enabled: !!prizePool,
    ...NO_REFETCH
  })
}
