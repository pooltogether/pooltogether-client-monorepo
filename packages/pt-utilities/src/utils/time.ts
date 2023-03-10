import { BigNumber } from 'ethers'
import { TimeUnit } from 'pt-types'
import {
  MINUTES_PER_DAY,
  SECONDS_PER_DAY,
  SECONDS_PER_HOUR,
  SECONDS_PER_MINUTE,
  SECONDS_PER_YEAR
} from '../constants'

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
 * Finds the difference between two date objects in days, hours, minutes and seconds
 * @param dateA DateTime JS object (ie. new Date(Date.now()))
 * @param dateB DateTime JS object (ie. new Date(Date.now()))
 * @returns
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
 * @returns
 */
export const getSecondsSinceEpoch = () => Number((Date.now() / 1000).toFixed(0))

/**
 * Converts a daily event count into a frequency (every X days/weeks/months/years) with the most relevant unit of time
 * @param dailyCount Number count of times an event takes place in any given day

 * 0 means the event never takes place
 * 
 * 1 means it happens once a day
 * 
 * 2 means it happens twice a day, etc.
 * @returns
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

/**
 * Returns prize frequency text for any given frequency
 * @param data data from `formatDailyCountToFrequency()`
 * @param format desired output format (default is 'everyXdays')
 * @returns
 */
export const getPrizeTextFromFrequency = (
  data: { frequency: number; unit: TimeUnit },
  format?: 'everyXdays' | 'daily'
) => {
  // "Every X Days/Weeks/Months/Years" format:
  if (format === 'everyXdays' || format === undefined) {
    if (data.frequency !== 0) {
      if (data.unit === TimeUnit.day) {
        if (data.frequency < 1.5) {
          return `Daily`
        } else {
          return `Every ${Math.round(data.frequency)} Days`
        }
      } else if (data.unit === TimeUnit.week) {
        return `Every ${Math.round(data.frequency)} Weeks`
      } else if (data.unit === TimeUnit.month) {
        return `Every ${Math.round(data.frequency)} Months`
      } else {
        return `Every ${Math.round(data.frequency)} Years`
      }
    } else {
      return null
    }
  }

  // "X Prize(s) Daily/Weekly/Monthly/Yearly" format:
  if (format === 'daily') {
    if (data.frequency !== 0) {
      let perUnitFreq = 1 / data.frequency

      if (data.unit === TimeUnit.day) {
        if (perUnitFreq >= 1.5) {
          return `${Math.round(perUnitFreq)} Prizes Daily`
        } else if (perUnitFreq >= 1) {
          return `1 Prize Daily`
        } else {
          perUnitFreq *= 7
          data.unit = TimeUnit.week
        }
      }

      if (data.unit === TimeUnit.week) {
        if (perUnitFreq >= 1.5) {
          return `${Math.round(perUnitFreq)} Prizes Weekly`
        } else if (perUnitFreq >= 1) {
          return `1 Prize Weekly`
        } else {
          perUnitFreq *= 365 / 12 / 7
          data.unit = TimeUnit.month
        }
      }

      if (data.unit === TimeUnit.month) {
        if (perUnitFreq >= 1.5) {
          return `${Math.round(perUnitFreq)} Prizes Monthly`
        } else if (perUnitFreq >= 1) {
          return `1 Prize Monthly`
        } else {
          perUnitFreq *= 12
          data.unit = TimeUnit.year
        }
      }

      if (data.unit === TimeUnit.year) {
        if (perUnitFreq >= 1.5) {
          return `${Math.round(perUnitFreq)} Prizes Yearly`
        } else if (perUnitFreq >= 1) {
          return `1 Prize Yearly`
        } else {
          return `${Math.round(perUnitFreq)} Prizes Yearly`
        }
      }
    } else {
      return null
    }
  }

  return null
}
