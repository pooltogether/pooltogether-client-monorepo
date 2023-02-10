import { BigNumber } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'

/**
 * Formats a number string to the requested precision
 * @param val number string (ex. "1005.2924")
 * @param precision precision to format to (default is 2)
 * @returns
 */
export const formatStringWithPrecision = (val: string, precision: number = 2) => {
  return val.substring(0, val.indexOf('.') + precision + 1)
}

/**
 * Formats a number to make it legible & user-friendly
 * @param val number to format
 * @param options formatting options
 * @returns
 */
export const formatNumberForDisplay = (
  val: BigNumber | string | number,
  options: Intl.NumberFormatOptions & {
    locale?: string
    round?: boolean
    hideZeroes?: boolean
  } = { locale: 'en' }
) => {
  const { locale, round, hideZeroes, ...formatOptions } = options
  let _val: number

  if (val === undefined || val === null) {
    return ''
  } else if (typeof val === 'number') {
    _val = val
  } else if (typeof val === 'string') {
    _val = Number(val)
  } else if (!!val._isBigNumber) {
    _val = val.toNumber()
  } else {
    return ''
  }

  if (!!round) {
    _val = Math.round(_val)
  }

  return _val.toLocaleString(locale || 'en', {
    ...formatOptions,
    maximumFractionDigits: !!hideZeroes
      ? _val <= 1
        ? formatOptions.maximumFractionDigits
        : 0
      : formatOptions.maximumFractionDigits,
    minimumFractionDigits: !!hideZeroes
      ? _val <= 1
        ? formatOptions.minimumFractionDigits
        : 0
      : formatOptions.minimumFractionDigits
  })
}

/**
 * Wraps formatNumberForDisplay and handles shifting decimals of a BigNumber
 * @param val BigNumber to format
 * @param decimals decimals to shift by
 * @param options formatting options
 * @returns
 */
export const formatUnformattedBigNumberForDisplay = (
  val: BigNumber,
  decimals: string,
  options: Intl.NumberFormatOptions & {
    locale?: string
    round?: boolean
    hideZeroes?: boolean
  }
) => {
  const shiftedBigNumber = formatUnits(val, decimals)
  return formatNumberForDisplay(shiftedBigNumber, options)
}

/**
 * Wraps formatNumberForDisplay and handles currency style selection
 * @param val number to format
 * @param currency currency symbol and formatting to follow (default is "USD")
 * @param options formatting options
 * @returns
 */
export const formatCurrencyNumberForDisplay = (
  val: string | number,
  currency: string = 'USD',
  options: Omit<Intl.NumberFormatOptions, 'style' | 'currency'> & {
    locale?: string
    round?: boolean
    hideZeroes?: boolean
  }
) => {
  return formatNumberForDisplay(val, { ...options, style: 'currency', currency })
}

/**
 * Returns the number of digits after a decimal place
 * @param val number to check max precision for
 * @returns
 */
export const getMaxPrecision = (val: number) => {
  return val.toString().split('.')[1]?.length || 0
}
