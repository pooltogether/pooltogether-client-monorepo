import classNames from 'classnames'
import { useAccount } from 'wagmi'
import { useAllUserPrizeOdds, usePrizePools, useSelectedVaults } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'
import { formatNumberForDisplay } from 'pt-utilities'
import { formatPrizePools } from '../../utils'

interface AccountDepositsOddsProps {
  className?: string
}

export const AccountDepositsOdds = (props: AccountDepositsOddsProps) => {
  const { className } = props

  const { address: userAddress } = useAccount()

  const { vaults } = useSelectedVaults()

  const formattedPrizePoolInfo = formatPrizePools()
  const prizePools = usePrizePools(formattedPrizePoolInfo)
  const prizePoolsArray = Object.values(prizePools)

  const { data: prizeOdds, isFetched: isFetchedPrizeOdds } = useAllUserPrizeOdds(
    prizePoolsArray,
    vaults,
    userAddress
  )

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
