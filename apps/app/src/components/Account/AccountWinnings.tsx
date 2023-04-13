import classNames from 'classnames'
import { useAccount } from 'wagmi'
import { usePrizePools } from 'pt-hyperstructure-hooks'
import { ExternalLink, LINKS } from 'pt-ui'
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

  const isEmpty = isFetchedWins && !!wins ? wins.length === 0 : false

  if (typeof window !== 'undefined' && !!userAddress && isFetchedWins && !!wins) {
    return (
      <div className={className}>
        <AccountWinningsHeader />
        {isEmpty && <NoWinsCard className='mt-4' />}
        {!isEmpty && <AccountWinningsTable rounded={true} className='mt-8' />}
      </div>
    )
  }
}

interface NoWinsCardProps {
  className?: string
}

const NoWinsCard = (props: NoWinsCardProps) => {
  const { className } = props

  return (
    <div className={classNames('w-full p-4 bg-pt-bg-purple rounded-lg', className)}>
      <div className='inline-flex w-full gap-3 items-center justify-center p-3 text-lg font-medium bg-pt-transparent rounded-lg'>
        <span className='text-pt-purple-100'>You haven't won any prizes recently.</span>
        <ExternalLink
          href={LINKS.docs}
          text='Learn how PoolTogether works'
          size='lg'
          className='text-pt-teal'
        />
      </div>
    </div>
  )
}
