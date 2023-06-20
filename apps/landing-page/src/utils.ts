import { formatNumberForDisplay } from '@shared/utilities'
import { ProtocolStats } from './types'

export const getProtocolStats = async () => {
  const results = await fetch('https://protocol-stats.ncookie.workers.dev')
  const data: ProtocolStats = await results.json()
  return data
}

export const formatProtocolStatsValue = (value: number, options?: { hideLabel?: boolean }) => {
  if (value >= 1e9) {
    return `${formatNumberForDisplay(Math.floor(value) / 1e9, {
      maximumFractionDigits: 1
    })}${!options?.hideLabel ? ' Billion' : ''}`
  } else if (value >= 1e6) {
    return `${formatNumberForDisplay(Math.floor(value) / 1e6, {
      maximumFractionDigits: 1
    })}${!options?.hideLabel ? ' Million' : ''}`
  } else if (value >= 1e3) {
    return `${formatNumberForDisplay(Math.floor(value / 1e3) * 1e3)}${
      !options?.hideLabel ? ' Thousand' : ''
    }`
  } else {
    return formatNumberForDisplay(value, { maximumFractionDigits: 0 })
  }
}
