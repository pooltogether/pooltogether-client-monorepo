import classNames from 'classnames'
import { useAccount } from 'wagmi'
import { Spinner } from 'pt-ui'
import { formatNumberForDisplay } from 'pt-utilities'

interface AccountDepositsOddsProps {
  className?: string
}

export const AccountDepositsOdds = (props: AccountDepositsOddsProps) => {
  const { className } = props

  const { address: userAddress } = useAccount()

  // TODO: need hook for multiple prize pools and vaults (across chains?)
  const prizeOdds = { percent: 0.0238, oneInX: 42 }
  const isFetchedPrizeOdds = true

  return (
    <div
      className={classNames(
        'flex w-full items-center justify-between px-4 py-6 text-pt-purple-100 bg-pt-bg-purple rounded-lg',
        className
      )}
    >
      <span>Daily Prize Odds</span>
      <span>
        {isFetchedPrizeOdds && !!prizeOdds ? (
          `1 in ${formatNumberForDisplay(prizeOdds.oneInX, { maximumSignificantDigits: 3 })}`
        ) : (
          <Spinner />
        )}
      </span>
    </div>
  )
}
