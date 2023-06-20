import { useProtocolStats } from 'src/serverAtoms'
import { formatProtocolStatsValue } from 'src/utils'

export const useFormattedProtocolStats = () => {
  const protocolStats = useProtocolStats()

  if (!!protocolStats) {
    return {
      totalPrizes: `$${formatProtocolStatsValue(protocolStats.totalPrizes)}`,
      tvl: `$${formatProtocolStatsValue(protocolStats.tvl)}`,
      uniqueWallets: formatProtocolStatsValue(protocolStats.uniqueWallets, { hideLabel: true })
    }
  }

  return {}
}
