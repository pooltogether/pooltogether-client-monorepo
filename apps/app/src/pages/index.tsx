import classNames from 'classnames'
import { utils } from 'ethers'
import Link from 'next/link'
import { CurrencyValue, NextDrawCountdown, PrizePoolCard } from 'pt-components'
import { useLargestGrandPrize, usePrizePools, usePrizeTokenData } from 'pt-hyperstructure-hooks'
import { Button, Spinner } from 'pt-ui'
import { getTokenPriceFromObject } from 'pt-utilities'
import { Layout } from '@components/Layout'
import { formatPrizePools } from '@constants'
import { useAllTokenPrices } from '@hooks/useAllTokenPrices'

export default function HomePage() {
  const formattedPrizePoolInfo = formatPrizePools()
  const prizePools = usePrizePools(formattedPrizePoolInfo)
  const numPrizePools = formattedPrizePoolInfo.length

  const { data: largestGrandPrize, isFetched: isFetchedLargestGrandPrize } = useLargestGrandPrize(
    Object.values(prizePools)
  )

  // TODO: need to get data for prize pool with the largest grand prize, not assuming they are all the same
  const { data: prizeTokenData, isFetched: isFetchedPrizeTokenData } = usePrizeTokenData(
    Object.values(prizePools)[0]
  )

  const { data: tokenPrices, isFetched: isFetchedTokenPrices } = useAllTokenPrices()
  const prizeTokenUsdPrice =
    isFetchedPrizeTokenData && !!prizeTokenData
      ? getTokenPriceFromObject(prizeTokenData.chainId, prizeTokenData.address, tokenPrices)
      : 0

  const formattedLargestGrandPrize = parseFloat(
    isFetchedPrizeTokenData && !!prizeTokenData && isFetchedLargestGrandPrize && !!largestGrandPrize
      ? utils.formatUnits(largestGrandPrize, prizeTokenData.decimals)
      : '0'
  )

  const usdLargestGrandPrize = !!prizeTokenUsdPrice
    ? formattedLargestGrandPrize * prizeTokenUsdPrice
    : 0

  return (
    <Layout className='gap-8'>
      <div className='flex flex-col items-center gap-3'>
        <span className='text-5xl font-averta font-semibold'>
          Deposit for a chance to win up to{' '}
          {isFetchedLargestGrandPrize && isFetchedPrizeTokenData && isFetchedTokenPrices ? (
            <CurrencyValue baseValue={usdLargestGrandPrize} hideZeroes={true} />
          ) : (
            <Spinner />
          )}
        </span>
        <span className='text-pt-purple-100'>
          Deposit into prize pools for a weekly chance to win.
        </span>
      </div>
      <NextDrawCountdown />
      <Link href='/deposit' passHref={true}>
        <Button>Deposit to Win</Button>
      </Link>
      <div
        className={classNames('grid gap-4 bg-pt-bg-purple-dark p-4 rounded-lg', {
          'grid-cols-1': numPrizePools === 1,
          'grid-cols-2': numPrizePools % 2 === 0 && numPrizePools % 3 !== 0,
          'grid-cols-3': numPrizePools % 3 === 0
        })}
      >
        {Object.values(prizePools).map((prizePool) => {
          return (
            <PrizePoolCard
              key={`pp-${prizePool.id}`}
              prizePool={prizePool}
              tokenUsdPrice={prizeTokenUsdPrice}
              href={`/deposit?network=${prizePool.chainId}`}
            />
          )
        })}
      </div>
    </Layout>
  )
}
