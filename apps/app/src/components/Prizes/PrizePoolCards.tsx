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
      className={classNames('grid gap-4 p-4 rounded-lg', {
        'grid-cols-1': numPrizePools === 1,
        'grid-cols-2': numPrizePools % 2 === 0 && numPrizePools % 3 !== 0,
        'grid-cols-3': numPrizePools % 3 === 0
      })}
    >
      {Object.values(prizePools).map((prizePool) => {
        return (
          <Link key={`pp-${prizePool.id}`} href={`/vaults?network=${prizePool.chainId}`}>
            <PrizePoolCard prizePool={prizePool} />
          </Link>
        )
      })}
    </div>
  )
}
