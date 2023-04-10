import { NextDrawCountdown, TokenValue } from 'pt-components'
import { useLargestGrandPrize, usePrizePools } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'
import { formatPrizePools } from '../../utils'

export const LargestPrizeHeader = () => {
  const formattedPrizePoolInfo = formatPrizePools()
  const prizePools = usePrizePools(formattedPrizePoolInfo)
  const prizePoolsArray = Object.values(prizePools)

  const { data: gpData } = useLargestGrandPrize(prizePoolsArray)

  return (
    <>
      <div className='flex flex-col items-center gap-3'>
        <span className='text-5xl font-averta font-semibold'>
          Deposit for a chance to win up to{' '}
          {!!gpData ? <TokenValue token={gpData.token} hideZeroes={true} /> : <Spinner />}
        </span>
        <span className='text-pt-purple-100'>
          Deposit into prize pools for a daily chance to win.
        </span>
      </div>
      <NextDrawCountdown prizePool={prizePoolsArray[0]} />
    </>
  )
}
