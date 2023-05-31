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
        <span className='w-2/3 text-2xl text-center font-averta font-semibold md:w-full md:text-4xl lg:text-5xl'>
          Deposit for a chance to win up to{' '}
          {!!gpData ? <TokenValue token={gpData.token} hideZeroes={true} /> : <Spinner />}
        </span>
        <span className='hidden text-pt-purple-100 md:block'>
          Deposit into prize pools for a daily chance to win.
        </span>
      </div>
      <NextDrawCountdown prizePool={prizePoolsArray[0]} />
    </>
  )
}
