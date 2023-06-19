import { NO_REFETCH } from '@shared/generic-react-hooks'
import { useQuery } from '@tanstack/react-query'

interface PrizeHistory {
  i: number // Draw ID
  w: number // Winner Count
  p: number // Claimable Prize Count
  c: string // Claimable Prize Amount
  d: string // Dropped Prize Amount
  t: string // Total Prize Amount
}

export const usePrizeHistory = () => {
  const queryKey = ['prizeHistory']

  return useQuery(
    queryKey,
    async () => {
      // TODO: this should be fetched through a KV cache on cloudflare
      const results = await fetch('https://poolexplorer.xyz/history')
      const data: PrizeHistory[] = await results.json()
      return data
    },
    NO_REFETCH
  )
}
