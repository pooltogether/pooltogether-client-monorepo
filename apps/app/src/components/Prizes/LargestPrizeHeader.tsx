import { TokenValue } from 'pt-components'
import { useLargestGrandPrize, usePrizePools } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'
import { formatPrizePools } from '../../utils'

export const LargestPrizeHeader = () => {
  const formattedPrizePoolInfo = formatPrizePools()
  const prizePools = usePrizePools(formattedPrizePoolInfo)

  const { data: gpData } = useLargestGrandPrize(Object.values(prizePools))

  return (
    <div className='flex flex-col items-center gap-3'>
      <span className='text-5xl font-averta font-semibold'>
        Deposit for a chance to win up to{' '}
        {!!gpData ? <TokenValue token={gpData.token} hideZeroes={true} /> : <Spinner />}
      </span>
      <span className='text-pt-purple-100'>
        Deposit into prize pools for a weekly chance to win.
      </span>
    </div>
  )
}
