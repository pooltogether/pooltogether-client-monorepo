import { useEffect, useState } from 'react'
import { getTimeBreakdown, msToS, sToMs } from 'pt-utilities'

/**
 * Returns days, hours, minutes and seconds until a given epoch timestamp
 * @param targetEpochTimestampInSeconds epoch timestamp in seconds
 * @returns
 */
export const useCountdown = (targetEpochTimestampInSeconds: number) => {
  const targetTimestampInMs = new Date(sToMs(targetEpochTimestampInSeconds ?? 0)).getTime()
  const [countdownInMs, setCountdownInMs] = useState(targetTimestampInMs - new Date().getTime())

  useEffect(() => {
    if (targetTimestampInMs > 0) {
      const interval = setInterval(() => {
        setCountdownInMs(targetTimestampInMs - new Date().getTime())
      }, 1_000)

      return () => clearInterval(interval)
    }
  }, [targetTimestampInMs])

  if (countdownInMs <= 0) {
    return { years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
  } else if (targetTimestampInMs > 0) {
    return getTimeBreakdown(msToS(countdownInMs))
  } else {
    return { years: null, days: null, hours: null, minutes: null, seconds: null }
  }
}
