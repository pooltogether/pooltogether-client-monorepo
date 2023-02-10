import { BigNumber } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'

/**
 * Pads two BigNumbers with a set precision then divides them
 * @param a numerator for division
 * @param b denominator for division
 * @param precision precision for padding (default is 4)
 * @returns
 */
export const divideBigNumbers = (a: BigNumber, b: BigNumber, precision: number = 4) => {
  if (a.isZero() || b.isZero()) return 0
  return Number(formatUnits(a.mul(10 ** precision).div(b), String(precision)))
}

/**
 * Calculates a percentage of a BigNumber
 * @param bn BigNumber to calculate a percentage from
 * @param percentage percentage to calculate from BigNumber (ex. 0.2)
 * @param precision precision for padding (default is 4)
 * @returns
 */
export const calculatePercentageOfBigNumber = (
  bn: BigNumber,
  percentage: number,
  precision: number = 4
) => {
  return bn.mul(percentage * 10 ** precision).div(10 ** precision)
}
