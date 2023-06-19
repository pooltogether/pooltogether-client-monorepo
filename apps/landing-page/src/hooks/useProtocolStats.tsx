import { NO_REFETCH } from '@shared/generic-react-hooks'
import { useQuery } from '@tanstack/react-query'

interface ProtocolStats {
  totalPlayers: number
  pool: number
  tvl: { total: number }
  historicalWinners: number
}

export const useProtocolStats = () => {
  const queryKey = ['protocolStats']

  return useQuery(
    queryKey,
    async () => {
      // TODO: this should be fetched through a KV cache on cloudflare
      const results = await fetch('https://poolexplorer.xyz/stats')
      const data: ProtocolStats = await results.json()
      return data
    },
    NO_REFETCH
  )
}
