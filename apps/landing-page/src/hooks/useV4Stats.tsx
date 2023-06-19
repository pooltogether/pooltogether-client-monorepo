import { formatNumberForDisplay } from '@shared/utilities'
import { usePrizeHistory } from './usePrizeHistory'
import { useProtocolStats } from './useProtocolStats'

export const useV4Stats = () => {
  const { data: protocolStats, isFetched: isFetchedProtocolStats } = useProtocolStats()
  const { data: prizeHistory, isFetched: isFetchedPrizeHistory } = usePrizeHistory()

  const totalPrizesAwarded = prizeHistory?.reduce((a, b) => a + parseInt(b.c ?? 0), 0)
  const totalDeposited = protocolStats?.tvl.total
  const uniqueWallets = protocolStats?.totalPlayers

  const isFetched = isFetchedProtocolStats && isFetchedPrizeHistory

  return { totalPrizesAwarded, totalDeposited, uniqueWallets, isFetched }
}

export const useFormattedV4Stats = () => {
  const { totalPrizesAwarded, totalDeposited, uniqueWallets, isFetched } = useV4Stats()

  if (isFetched && !!totalPrizesAwarded && !!totalDeposited && !!uniqueWallets) {
    return {
      totalPrizesAwarded: `$${formatLabeledValue(totalPrizesAwarded)}`,
      totalDeposited: `$${formatLabeledValue(totalDeposited)}`,
      uniqueWallets: formatNumberForDisplay(Math.floor(uniqueWallets / 1e3) * 1e3)
    }
  }

  return {}
}

const formatLabeledValue = (value: number) => {
  if (value >= 1e9) {
    return `${formatNumberForDisplay(Math.floor(value) / 1e9, {
      maximumFractionDigits: 1
    })} Billion`
  } else if (value >= 1e6) {
    return `${formatNumberForDisplay(Math.floor(value) / 1e6, {
      maximumFractionDigits: 1
    })} Million`
  } else if (value >= 1e3) {
    return `${formatNumberForDisplay(Math.floor(value / 1e3) * 1e3)} Thousand`
  } else {
    return formatNumberForDisplay(value, { maximumFractionDigits: 0 })
  }
}
