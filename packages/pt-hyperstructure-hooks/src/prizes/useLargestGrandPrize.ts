import { BigNumber } from 'ethers'
import { PrizePool } from 'pt-client-js'
import { useAllPrizeInfo } from './useAllPrizeInfo'

/**
 * Returns the largest grand prize out of all prize pools given
 *
 * Wraps {@link useAllPrizeInfo}
 * @param prizePools instances of `PrizePool` to check
 * @returns
 */
export const useLargestGrandPrize = (
  prizePools: PrizePool[]
): { data?: BigNumber; isFetched: boolean } => {
  const { data: allPrizeInfo, isFetched: isFetchedAllPrizeInfo } = useAllPrizeInfo(prizePools)

  if (isFetchedAllPrizeInfo && !!allPrizeInfo) {
    let largestGrandPrize = BigNumber.from(0)

    const prizePoolIds = Object.keys(allPrizeInfo)
    prizePoolIds.forEach((prizePoolId) => {
      const grandPrize = allPrizeInfo[prizePoolId][0].amount
      if (grandPrize.gt(largestGrandPrize)) {
        largestGrandPrize = grandPrize
      }
    })

    return { data: largestGrandPrize, isFetched: true }
  } else {
    return { isFetched: false }
  }
}
