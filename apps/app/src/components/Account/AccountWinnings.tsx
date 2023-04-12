import { useAccount } from 'wagmi'
import { usePrizePools } from 'pt-hyperstructure-hooks'
import { useAllUserPrizePoolWins } from '@hooks/useAllUserPrizePoolWins'
import { formatPrizePools } from '../../utils'
import { AccountWinningsHeader } from './AccountWinningsHeader'
import { AccountWinningsTable } from './AccountWinningsTable'

interface AccountWinningsProps {
  className?: string
}

export const AccountWinnings = (props: AccountWinningsProps) => {
  const { className } = props

  const { address: userAddress } = useAccount()

  const formattedPrizePoolInfo = formatPrizePools()
  const prizePools = usePrizePools(formattedPrizePoolInfo)
  const prizePoolsArray = Object.values(prizePools)

  const { data: wins, isFetched: isFetchedWins } = useAllUserPrizePoolWins(
    prizePoolsArray,
    userAddress
  )

  if (typeof window !== 'undefined' && !!userAddress && !!wins && wins.length === 0) {
    return <span>You haven't won any prizes recently.</span>
  }

  if (isFetchedWins && !!wins) {
    return (
      <div className={className}>
        <AccountWinningsHeader />
        <AccountWinningsTable rounded={true} className='mt-8' />
      </div>
    )
  }
}
