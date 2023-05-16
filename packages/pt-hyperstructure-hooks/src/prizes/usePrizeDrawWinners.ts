import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useProvider } from 'wagmi'
import { PrizePool } from 'pt-client-js'
import { SubgraphPrizePoolDraw } from 'pt-types'
import { getPrizePoolHistoricalWins } from 'pt-utilities'
import { QUERY_KEYS } from '../constants'

/**
 * Returns historical prize pool draws and their winners
 * @param prizePool instance of the `PrizePool` class
 * @param options optional settings
 * @returns
 */
export const usePrizeDrawWinners = (
  prizePool: PrizePool,
  options?: {
    first?: number
    skip?: number
    orderDirection?: 'asc' | 'desc'
    refetchInterval?: number
  }
): UseQueryResult<SubgraphPrizePoolDraw[], unknown> => {
  const provider = useProvider({ chainId: prizePool?.chainId })

  const enabled = !!prizePool && !!provider

  const queryKey = [QUERY_KEYS.drawWinners, prizePool?.chainId, JSON.stringify(options)]

  return useQuery(queryKey, async () => await getPrizePoolHistoricalWins(provider, options), {
    refetchInterval: options?.refetchInterval,
    enabled
  })
}
