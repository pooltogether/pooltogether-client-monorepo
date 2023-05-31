import classNames from 'classnames'
import Link from 'next/link'
import { PrizePoolCard } from 'pt-components'
import { usePrizePools } from 'pt-hyperstructure-hooks'
import { formatPrizePools } from '../../utils'

export const PrizePoolCards = () => {
  const formattedPrizePoolInfo = formatPrizePools()
  const prizePools = usePrizePools(formattedPrizePoolInfo)
  const numPrizePools = formattedPrizePoolInfo.length

  return (
    <div
      className={classNames(
        'flex flex-col w-full items-center gap-4 rounded-lg md:grid md:w-auto md:p-4',
        {
          'grid-cols-1': numPrizePools === 1,
          'grid-cols-2': numPrizePools % 2 === 0 && numPrizePools % 3 !== 0,
          'grid-cols-3': numPrizePools % 3 === 0
        }
      )}
    >
      {Object.values(prizePools).map((prizePool) => {
        return (
          <Link
            key={`pp-${prizePool.id}`}
            href={`/vaults?network=${prizePool.chainId}`}
            className='w-full max-w-sm'
          >
            <PrizePoolCard prizePool={prizePool} />
          </Link>
        )
      })}
    </div>
  )
}
