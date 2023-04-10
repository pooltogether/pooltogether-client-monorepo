import { BigNumber, utils } from 'ethers'

/**
 * Pads two BigNumbers with a set precision then divides them
 * @param a numerator for division
 * @param b denominator for division
 * @param precision precision for padding (default is 4)
 * @returns
 */
export const divideBigNumbers = (a: BigNumber, b: BigNumber, precision: number = 4) => {
  if (a.isZero() || b.isZero()) return 0
  return parseFloat(utils.formatUnits(a.mul(10 ** precision).div(b), String(precision)))
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

/**
 * Helper function to sort BigNumbers in ascending order
 * @param a first BigNumber
 * @param b second BigNumber
 * @returns
 */
export const sortByBigNumberAsc = (a: BigNumber, b: BigNumber) => {
  const aSubB = a.sub(b)
  if (aSubB.isZero()) return 0
  if (aSubB.isNegative()) return -1
  return 1
}

/**
 * Helper function to sort BigNumbers in descending order
 * @param a first BigNumber
 * @param b second BigNumber
 * @returns
 */
export const sortByBigNumberDesc = (a: BigNumber, b: BigNumber) => {
  const bSubA = b.sub(a)
  if (bSubA.isZero()) return 0
  if (bSubA.isNegative()) return -1
  return 1
}
