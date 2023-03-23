import { BigNumber, utils } from 'ethers'
import { PrizePool } from 'pt-client-js'
import { useAllPrizeInfo, usePrizeTokenData } from 'pt-hyperstructure-hooks'
import { Card, Spinner } from 'pt-ui'
import { formatNumberForDisplay } from 'pt-utilities'
import { CurrencyValue } from '../Currency/CurrencyValue'
import { PrizePoolHeader } from './PrizePoolHeader'

export interface PrizePoolCardProps {
  prizePool: PrizePool
  tokenUsdPrice: number
  href?: string
}

export const PrizePoolCard = (props: PrizePoolCardProps) => {
  const { prizePool, tokenUsdPrice, href } = props

  const { data: allPrizeInfo, isFetched: isFetchedAllPrizeInfo } = useAllPrizeInfo([prizePool])
  const grandPrize =
    isFetchedAllPrizeInfo && !!allPrizeInfo
      ? allPrizeInfo[prizePool.id]?.[0].amount ?? BigNumber.from(0)
      : BigNumber.from(0)

  const { data: prizeTokenData, isFetched: isFetchedPrizeTokenData } = usePrizeTokenData(prizePool)
  const formattedGrandPrize = parseFloat(
    isFetchedPrizeTokenData && !!prizeTokenData
      ? utils.formatUnits(grandPrize, prizeTokenData.decimals)
      : '0'
  )

  return (
    <Card href={href} className='gap-16'>
      <PrizePoolHeader chainId={prizePool.chainId} />
      <div className='flex flex-col gap-0.5 text-pt-purple-100'>
        <span className='text-sm uppercase'>Grand Prize</span>
        {isFetchedAllPrizeInfo && isFetchedPrizeTokenData ? (
          <>
            <span className='text-4xl text-pt-teal'>
              <CurrencyValue baseValue={formattedGrandPrize * tokenUsdPrice} hideZeroes={true} />
            </span>
            <span className='font-light'>
              ≈ {formatNumberForDisplay(formattedGrandPrize, { hideZeroes: true })} POOL
            </span>
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </Card>
  )
}
