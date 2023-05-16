import classNames from 'classnames'
import { useAccount } from 'wagmi'
import { CurrencyValue } from 'pt-components'
import { Spinner } from 'pt-ui'
import { useUserTotalWinnings } from '@hooks/useUserTotalWinnings'

interface AccountWinningsHeaderProps {
  className?: string
}

export const AccountWinningsHeader = (props: AccountWinningsHeaderProps) => {
  const { className } = props

  const { address: userAddress } = useAccount()

  const { data: totalWinnings, isFetched: isFetchedTotalWinnings } = useUserTotalWinnings()

  return (
    <div className={classNames('flex flex-col items-center gap-2', className)}>
      <span className='text-pt-purple-100'>Your Winnings</span>
      <span className='text-3xl font-averta font-semibold'>
        {!isFetchedTotalWinnings && !!userAddress && <Spinner />}
        {isFetchedTotalWinnings && <CurrencyValue baseValue={totalWinnings} countUp={true} />}
      </span>
    </div>
  )
}
