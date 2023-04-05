import { utils } from 'ethers'
import { CurrencyValue } from 'pt-components'
import { useLargestGrandPrize, usePrizePools, usePrizeTokenData } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'
import { getTokenPriceFromObject } from 'pt-utilities'
import { useAllTokenPrices } from '@hooks/useAllTokenPrices'
import { formatPrizePools } from '../../utils'

export const LargestPrizeHeader = () => {
  const formattedPrizePoolInfo = formatPrizePools()
  const prizePools = usePrizePools(formattedPrizePoolInfo)

  const { data: largestGrandPrize, isFetched: isFetchedLargestGrandPrize } = useLargestGrandPrize(
    Object.values(prizePools)
  )

  // TODO: need to get data for prize pool with the largest grand prize, not assuming they are all the same
  const { data: prizeTokenData, isFetched: isFetchedPrizeTokenData } = usePrizeTokenData(
    Object.values(prizePools)[0]
  )

  const { data: tokenPrices, isFetched: isFetchedTokenPrices } = useAllTokenPrices()
  const prizeTokenPrice =
    isFetchedPrizeTokenData && !!prizeTokenData
      ? getTokenPriceFromObject(prizeTokenData.chainId, prizeTokenData.address, tokenPrices)
      : 0

  const formattedLargestGrandPrize = parseFloat(
    isFetchedPrizeTokenData && !!prizeTokenData && isFetchedLargestGrandPrize && !!largestGrandPrize
      ? utils.formatUnits(largestGrandPrize, prizeTokenData.decimals)
      : '0'
  )

  const prizeValue = !!prizeTokenPrice ? formattedLargestGrandPrize * prizeTokenPrice : 0

  return (
    <div className='flex flex-col items-center gap-3'>
      <span className='text-5xl font-averta font-semibold'>
        Deposit for a chance to win up to{' '}
        {isFetchedLargestGrandPrize && isFetchedPrizeTokenData && isFetchedTokenPrices ? (
          <CurrencyValue baseValue={prizeValue} hideZeroes={true} />
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
