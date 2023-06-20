import { formatNumberForDisplay } from '@shared/utilities'
import { useProtocolStats } from './useProtocolStats'

export const useV4Stats = () => {
  const { data: protocolStats, isFetched: isFetchedProtocolStats } = useProtocolStats()

  return {
    totalPrizesAwarded: protocolStats?.totalPrizes,
    totalDeposited: protocolStats?.tvl,
    uniqueWallets: protocolStats?.uniqueWallets,
    isFetched: isFetchedProtocolStats
  }
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
