import { Card } from 'pt-ui'
import { formatNumberForDisplay, NETWORK } from 'pt-utilities'
import { CurrencyValue } from '../Currency/CurrencyValue'
import { PrizePoolHeader } from './PrizePoolHeader'

export interface PrizePoolCardProps {
  chainId: NETWORK
  href?: string
}

export const PrizePoolCard = (props: PrizePoolCardProps) => {
  const { chainId, href } = props

  // TODO: get prize pool's grand prize in usd
  const grandPrize = 5_000

  // TODO: get POOL token price in usd
  const poolPrice = 0.93

  return (
    <Card href={href} className='gap-16'>
      <PrizePoolHeader chainId={chainId} />
      <div className='flex flex-col gap-0.5 text-pt-purple-100'>
        <span className='text-sm uppercase'>Grand Prize</span>
        <span className='text-4xl text-pt-teal'>
          <CurrencyValue baseValue={grandPrize} hideZeroes={true} />
        </span>
        <span className='font-light'>
          ≈ {formatNumberForDisplay(grandPrize / poolPrice, { hideZeroes: true })} POOL
        </span>
      </div>
    </Card>
  )
}
