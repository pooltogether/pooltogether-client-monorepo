import { BigNumber } from 'ethers'
import { PrizePool } from 'pt-client-js'
import { useAllPrizeInfo, usePrizeTokenData } from 'pt-hyperstructure-hooks'
import { Card, Spinner } from 'pt-ui'
import { formatBigNumberForDisplay } from 'pt-utilities'
import { TokenValue } from '../Currency/TokenValue'
import { PrizePoolHeader } from './PrizePoolHeader'

export interface PrizePoolCardProps {
  prizePool: PrizePool
  tokenPrice: number
  href?: string
}

export const PrizePoolCard = (props: PrizePoolCardProps) => {
  const { prizePool, tokenPrice, href } = props

  const { data: allPrizeInfo, isFetched: isFetchedAllPrizeInfo } = useAllPrizeInfo([prizePool])
  const grandPrize =
    isFetchedAllPrizeInfo && !!allPrizeInfo
      ? allPrizeInfo[prizePool.id]?.[0].amount ?? BigNumber.from(0)
      : BigNumber.from(0)

  const { data: prizeTokenData, isFetched: isFetchedPrizeTokenData } = usePrizeTokenData(prizePool)

  return (
    <Card href={href} className='gap-16'>
      <PrizePoolHeader chainId={prizePool.chainId} />
      <div className='flex flex-col gap-0.5 text-pt-purple-100'>
        <span className='text-sm uppercase'>Grand Prize</span>
        {isFetchedAllPrizeInfo && isFetchedPrizeTokenData && !!prizeTokenData ? (
          <>
            <span className='text-4xl text-pt-teal'>
              <TokenValue
                token={{ ...prizeTokenData, price: tokenPrice, balance: grandPrize.toString() }}
                hideZeroes={true}
              />
            </span>
            <span className='font-light'>
              ≈{' '}
              {formatBigNumberForDisplay(grandPrize, prizeTokenData.decimals, { hideZeroes: true })}{' '}
              POOL
            </span>
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </Card>
  )
}
