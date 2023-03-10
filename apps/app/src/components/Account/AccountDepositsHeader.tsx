import classNames from 'classnames'
import { CurrencyValue } from 'pt-components'
import { Spinner } from 'pt-ui'
import { useUserTotalUsdBalance } from '@hooks/useUserTotalUsdBalance'

interface AccountDepositsHeaderProps {
  className?: string
}

export const AccountDepositsHeader = (props: AccountDepositsHeaderProps) => {
  const { data: totalUsdBalance, isFetched: isFetchedTotalUsdBalance } = useUserTotalUsdBalance()

  return (
    <div className={classNames('flex flex-col items-center gap-2', props.className)}>
      <span className='dark:text-pt-purple-100'>Your Deposits</span>
      <span className='text-3xl'>
        {!isFetchedTotalUsdBalance && <Spinner />}
        {isFetchedTotalUsdBalance && (
          <CurrencyValue baseValue={totalUsdBalance} hideZeroes={true} />
        )}
      </span>
    </div>
  )
}
