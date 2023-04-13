import classNames from 'classnames'

interface AccountDepositsOddsProps {
  className?: string
}

export const AccountDepositsOdds = (props: AccountDepositsOddsProps) => {
  const { className } = props

  const odds = 'X' // TODO: calculate odds

  return (
    <div
      className={classNames(
        'flex w-full items-center justify-between px-4 py-6 text-pt-purple-100 bg-pt-bg-purple rounded-lg',
        className
      )}
    >
      <span>Daily Prize Odds</span>
      <span>1 in {odds}</span>
    </div>
  )
}
