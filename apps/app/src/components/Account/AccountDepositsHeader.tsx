import classNames from 'classnames'
import { useAccount } from 'wagmi'
import { CurrencyValue } from 'pt-components'
import { Spinner } from 'pt-ui'
import { useUserTotalBalance } from '@hooks/useUserTotalBalance'

interface AccountDepositsHeaderProps {
  className?: string
}

export const AccountDepositsHeader = (props: AccountDepositsHeaderProps) => {
  const { className } = props

  const { address: userAddress } = useAccount()

  const { data: totalBalance, isFetched: isFetchedTotalBalance } = useUserTotalBalance()

  return (
    <div className={classNames('flex flex-col items-center gap-1 md:gap-2', className)}>
      <span className='text-sm text-pt-purple-100 md:text-base'>Your Deposits</span>
      <span className='text-2xl font-averta font-semibold md:text-3xl'>
        {!isFetchedTotalBalance && !!userAddress && <Spinner />}
        {isFetchedTotalBalance && <CurrencyValue baseValue={totalBalance} countUp={true} />}
      </span>
    </div>
  )
}
