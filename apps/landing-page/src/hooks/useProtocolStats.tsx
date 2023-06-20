import { NO_REFETCH } from '@shared/generic-react-hooks'
import { useQuery } from '@tanstack/react-query'

interface ProtocolStats {
  uniqueWallets: number
  poolPrice: number
  tvl: number
  uniqueWinners: number
  totalPrizes: number
}

export const useProtocolStats = () => {
  const queryKey = ['protocolStats']

  return useQuery(
    queryKey,
    async () => {
      const results = await fetch('https://protocol-stats.ncookie.workers.dev')
      const data: ProtocolStats = await results.json()
      return data
    },
    NO_REFETCH
  )
}
