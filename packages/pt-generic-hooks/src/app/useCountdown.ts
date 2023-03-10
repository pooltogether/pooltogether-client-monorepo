import { useEffect, useState } from 'react'
import { SECONDS_PER_DAY, SECONDS_PER_HOUR, SECONDS_PER_MINUTE, sToMs } from 'pt-utilities'

/**
 * Returns days, hours, minutes and seconds until a given epoch timestamp
 * @param targetEpochTimestampInSeconds epoch timestamp in seconds
 * @returns
 */
export const useCountdown = (targetEpochTimestampInSeconds: number) => {
  if (!!targetEpochTimestampInSeconds) {
    const targetTimestampInMs = new Date(sToMs(targetEpochTimestampInSeconds)).getTime()

    const [countdownInMs, setCountdownInMs] = useState(targetTimestampInMs - new Date().getTime())

    useEffect(() => {
      const interval = setInterval(() => {
        setCountdownInMs(targetTimestampInMs - new Date().getTime())
      }, 1_000)

      return () => clearInterval(interval)
    }, [targetTimestampInMs])

    if (countdownInMs <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    const days = Math.floor(countdownInMs / (1_000 * SECONDS_PER_DAY))
    const hours = Math.floor(
      (countdownInMs % (1_000 * SECONDS_PER_DAY)) / (1_000 * SECONDS_PER_HOUR)
    )
    const minutes = Math.floor(
      (countdownInMs % (1_000 * SECONDS_PER_HOUR)) / (1_000 * SECONDS_PER_MINUTE)
    )
    const seconds = Math.floor((countdownInMs % (1_000 * SECONDS_PER_MINUTE)) / 1_000)

    return { days, hours, minutes, seconds }
  } else {
    return { days: null, hours: null, minutes: null, seconds: null }
  }
}
