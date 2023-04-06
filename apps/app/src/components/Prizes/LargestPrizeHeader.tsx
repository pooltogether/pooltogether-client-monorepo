import { useMemo } from 'react'
import { TokenValue } from 'pt-components'
import {
  useLargestGrandPrize,
  usePrizePools,
  usePrizeTokenData,
  usePrizeTokenPrice
} from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'
import { formatPrizePools } from '../../utils'

export const LargestPrizeHeader = () => {
  const formattedPrizePoolInfo = formatPrizePools()
  const prizePools = usePrizePools(formattedPrizePoolInfo)

  const { data: largestGrandPrizeData, isFetched: isFetchedLargestGrandPrize } =
    useLargestGrandPrize(Object.values(prizePools))

  const prizePool = useMemo(() => {
    if (!!largestGrandPrizeData?.prizePoolId) {
      return prizePools[largestGrandPrizeData.prizePoolId]
    }
  }, [prizePools, largestGrandPrizeData])

  const { data: prizeTokenData, isFetched: isFetchedPrizeTokenData } = usePrizeTokenData(prizePool)

  const { tokenPrice: prizeTokenPrice, isFetched: isFetchedPrizeTokenPrice } =
    usePrizeTokenPrice(prizePool)

  return (
    <div className='flex flex-col items-center gap-3'>
      <span className='text-5xl font-averta font-semibold'>
        Deposit for a chance to win up to{' '}
        {isFetchedLargestGrandPrize && isFetchedPrizeTokenData && isFetchedPrizeTokenPrice ? (
          <TokenValue
            token={{
              ...prizeTokenData,
              price: prizeTokenPrice,
              balance: largestGrandPrizeData.grandPrize.toString()
            }}
            hideZeroes={true}
          />
        ) : (
          <Spinner />
        )}
      </span>
      <span className='text-pt-purple-100'>
        Deposit into prize pools for a weekly chance to win.
      </span>
    </div>
  )
}
