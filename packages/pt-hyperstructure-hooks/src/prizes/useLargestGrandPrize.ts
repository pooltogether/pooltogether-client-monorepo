import { BigNumber } from 'ethers'
import { PrizePool } from 'pt-client-js'
import { useAllPrizeInfo } from '..'

/**
 * Returns the prize pool with the largest grand prize
 *
 * Wraps {@link useAllPrizeInfo}
 * @param prizePools instances of `PrizePool` to check
 * @returns
 */
export const useLargestGrandPrize = (
  prizePools: PrizePool[]
): { data?: { prizePoolId: string; grandPrize: BigNumber }; isFetched: boolean } => {
  const { data: allPrizeInfo, isFetched: isFetchedAllPrizeInfo } = useAllPrizeInfo(prizePools)

  if (isFetchedAllPrizeInfo && !!allPrizeInfo) {
    let prizePoolId = ''
    let grandPrize = BigNumber.from(0)

    for (const id in allPrizeInfo) {
      const prize = allPrizeInfo[id][0].amount
      if (prize.gt(grandPrize) || prizePoolId === '') {
        prizePoolId = id
        grandPrize = prize
      }
    }

    return { data: { prizePoolId, grandPrize }, isFetched: true }
  } else {
    return { isFetched: false }
  }
}
