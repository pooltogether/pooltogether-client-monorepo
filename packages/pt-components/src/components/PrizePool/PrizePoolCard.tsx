import { BigNumber } from 'ethers'
import { PrizePool } from 'pt-client-js'
import { useAllPrizeInfo, usePrizeTokenData } from 'pt-hyperstructure-hooks'
import { Card, Spinner } from 'pt-ui'
import { formatBigNumberForDisplay } from 'pt-utilities'
import { NetworkBadge } from '../Badges/NetworkBadge'
import { TokenValue } from '../Currency/TokenValue'

export interface PrizePoolCardProps {
  prizePool: PrizePool
}

export const PrizePoolCard = (props: PrizePoolCardProps) => {
  const { prizePool } = props

  const { data: allPrizeInfo, isFetched: isFetchedAllPrizeInfo } = useAllPrizeInfo([prizePool])
  const grandPrize =
    isFetchedAllPrizeInfo && !!allPrizeInfo
      ? allPrizeInfo[prizePool.id]?.[0].amount ?? BigNumber.from(0)
      : BigNumber.from(0)

  const { data: prizeTokenData, isFetched: isFetchedPrizeTokenData } = usePrizeTokenData(prizePool)

  return (
    <Card wrapperClassName='hover:bg-pt-purple-50/20' className='gap-16'>
      <NetworkBadge
        chainId={prizePool.chainId}
        appendText='Prize Pool'
        hideBg={true}
        className='gap-2'
        iconClassName='h-8 w-8'
        textClassName='text-2xl font-semibold'
      />
      <div className='flex flex-col gap-0.5 text-pt-purple-100'>
        <span className='text-sm uppercase'>Grand Prize</span>
        {isFetchedAllPrizeInfo && isFetchedPrizeTokenData && !!prizeTokenData ? (
          <>
            <span className='text-4xl text-pt-teal'>
              <TokenValue
                token={{ ...prizeTokenData, amount: grandPrize.toString() }}
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
