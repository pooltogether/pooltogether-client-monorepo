import { formatNumberForDisplay } from '@shared/utilities'

export const useV4Stats = () => {
  const totalPrizesAwarded = 3_220_000
  const totalDeposited = 10_154_000
  const uniqueWallets = 56_000

  return { totalPrizesAwarded, totalDeposited, uniqueWallets }
}

export const useFormattedV4Stats = () => {
  const { totalPrizesAwarded, totalDeposited, uniqueWallets } = useV4Stats()

  return {
    totalPrizesAwarded: `$${formatLabeledValue(totalPrizesAwarded)}`,
    totalDeposited: `$${formatLabeledValue(totalDeposited)}`,
    uniqueWallets: formatNumberForDisplay(Math.floor(uniqueWallets / 1e3) * 1e3)
  }
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
