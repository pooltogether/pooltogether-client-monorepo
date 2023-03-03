import classNames from 'classnames'
import { CurrencyValue } from '@components/CurrencyValue'

interface AccountDepositsHeaderProps {
  className?: string
}

// TODO: display total user balance in currency
// TODO: display spinner during loading
export const AccountDepositsHeader = (props: AccountDepositsHeaderProps) => {
  return (
    <div className={classNames('flex flex-col items-center gap-2', props.className)}>
      <span className='dark:text-pt-purple-100'>Your Deposits</span>
      <span className='text-3xl'>
        <CurrencyValue baseValue={0} hideZeroes={true} />
      </span>
    </div>
  )
}
