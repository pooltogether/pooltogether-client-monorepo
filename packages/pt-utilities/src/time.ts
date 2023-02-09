import { BigNumber } from 'ethers'
import { TimeUnit } from 'pt-types'

/**
 * Second constants
 */
export const SECONDS_PER_MINUTE = 60
export const SECONDS_PER_HOUR = 3600
export const SECONDS_PER_DAY = 86400
export const SECONDS_PER_YEAR = 31536000

/**
 * Minute constants
 */
export const MINUTES_PER_HOUR = 60
export const MINUTES_PER_DAY = 1440

/**
 * Breaks down a number of seconds into years, months, days, hours, minutes, seconds
 * @param totalSeconds
 * @returns
 */
export const getTimeBreakdown = (totalSeconds: number | string) => {
  let diff = Number(totalSeconds)

  let years = 0
  if (diff >= SECONDS_PER_YEAR) {
    years = Math.floor(diff / SECONDS_PER_YEAR)
    diff -= years * SECONDS_PER_YEAR
  }

  let days = 0
  if (diff >= SECONDS_PER_DAY) {
    days = Math.floor(diff / SECONDS_PER_DAY)
    diff -= days * SECONDS_PER_DAY
  }

  let hours = 0
  if (days || diff >= SECONDS_PER_HOUR) {
    hours = Math.floor(diff / SECONDS_PER_HOUR)
    diff -= hours * SECONDS_PER_HOUR
  }

  let minutes = 0
  if (hours || diff >= 60) {
    minutes = Math.floor(diff / 60)
    diff -= minutes * 60
  }

  let seconds = 0
  if (minutes || diff >= 1) {
    seconds = diff
  }

  return {
    years,
    days,
    hours,
    minutes,
    seconds
  }
}

/**
 * Converts milliseconds to seconds
 * @param milliseconds milliseconds as a number
 * @param options option to use bignumber math if necessary
 * @returns
 */
export const msToS = (milliseconds: number, options?: { bigNumber?: boolean }) => {
  if (!milliseconds) {
    return 0
  }
  if (options?.bigNumber) {
    return BigNumber.from(milliseconds).div(1000).toNumber()
  } else {
    return milliseconds / 1000
  }
}

/**
 * Converts seconds to milliseconds
 * @param seconds seconds as a number
 * @returns
 */
export const sToMs = (seconds: number) => {
  if (!seconds) {
    return 0
  }
  return seconds * 1000
}

/**
 * Converts days to milliseconds
 * @param days days as a number
 * @returns
 */
export const dToMs = (days: number) => {
  if (!days) {
    return 0
  }
  return days * SECONDS_PER_DAY * 1000
}

/**
 * Converts milliseconds to days
 * @param days days as a number
 * @returns
 */
export const msToD = (ms: number) => {
  if (!ms) {
    return 0
  }
  return ms / 1000 / SECONDS_PER_DAY
}

/**
 * Converts days to seconds
 * @param days days as a number
 * @returns
 */
export const dToS = (days: number) => {
  if (!days) {
    return 0
  }
  return days * SECONDS_PER_DAY
}

/**
 * Converts seconds to days
 * @param s seconds as a number
 * @returns
 */
export const sToD = (s: number) => {
  if (!s) {
    return 0
  }
  return s / SECONDS_PER_DAY
}

/**
 * Converts seconds to minutes
 * @param s seconds as a number
 * @returns
 */
export const sToM = (s: number) => {
  if (!s) {
    return 0
  }
  return s / SECONDS_PER_MINUTE
}

/**
 * Converts days to minutes
 * @param days days as a number
 * @returns
 */
export const dToM = (days: number) => {
  if (!days) {
    return 0
  }
  return days * MINUTES_PER_DAY
}

/**
 * Finds the difference between two date objects
 * @param dateA DateTime JS object (ie. new Date(Date.now()))
 * @param dateB DateTime JS object (ie. new Date(Date.now()))
 * @returns Object with difference split into keys with days, hours, minutes, and seconds
 */
export const subtractDates = (dateA: Date, dateB: Date) => {
  let msA = dateA.getTime()
  let msB = dateB.getTime()

  let diff = msA - msB

  let days = 0
  if (diff >= 86400000) {
    days = diff / 86400000
    diff -= days * 86400000
  }

  let hours = 0
  if (days || diff >= 3600000) {
    hours = diff / 3600000
    diff -= hours * 3600000
  }

  let minutes = 0
  if (hours || diff >= 60000) {
    minutes = diff / 60000
    diff -= minutes * 60000
  }

  let seconds = 0
  if (minutes || diff >= 1000) {
    seconds = diff / 1000
  }

  return {
    days,
    hours,
    minutes,
    seconds
  }
}

/**
 * Return seconds since Epoch as a number
 * @returns Number of seconds since the Unix Epoch
 */
export const getSecondsSinceEpoch = () => Number((Date.now() / 1000).toFixed(0))

/**
 * Converts a daily event count into a frequency with the most relevant unit of time.
 * @param dailyCount Number count of times an event takes place in any given day.
 * 0 means the event never takes place.
 * 1 means it happens once a day.
 * 2 means it happens twice a day, etc.
 * @returns Object with frequency and unit of time specified.
 */
export const formatDailyCountToFrequency = (dailyCount: number) => {
  const result: { frequency: number; unit: TimeUnit } = {
    frequency: 0,
    unit: TimeUnit.day
  }

  if (dailyCount > 0) {
    const days = 1 / dailyCount
    const weeks = days / 7
    const months = days / (365 / 12)
    const years = days / 365

    if (weeks < 1.5) {
      result.frequency = days
    } else if (months < 1.5) {
      result.frequency = weeks
      result.unit = TimeUnit.week
    } else if (years < 1.5) {
      result.frequency = months
      result.unit = TimeUnit.month
    } else {
      result.frequency = years
      result.unit = TimeUnit.year
    }
  }

  return result
}
