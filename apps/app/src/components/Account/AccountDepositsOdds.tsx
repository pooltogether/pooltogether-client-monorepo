import classNames from 'classnames'
import { useAccount } from 'wagmi'
import { useAllUserPrizeOdds, useSelectedVaults } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'
import { formatNumberForDisplay } from 'pt-utilities'
import { useSupportedPrizePools } from '@hooks/useSupportedPrizePools'

interface AccountDepositsOddsProps {
  className?: string
}

export const AccountDepositsOdds = (props: AccountDepositsOddsProps) => {
  const { className } = props

  const { address: userAddress } = useAccount()

  const { vaults } = useSelectedVaults()

  const prizePools = useSupportedPrizePools()
  const prizePoolsArray = Object.values(prizePools)

  const { data: prizeOdds, isFetched: isFetchedPrizeOdds } = useAllUserPrizeOdds(
    prizePoolsArray,
    vaults,
    userAddress
  )

  return (
    <div
      className={classNames(
        'flex w-full items-center justify-between px-4 py-1 text-pt-purple-100 rounded-lg',
        'md:py-6 md:bg-pt-bg-purple',
        className
      )}
    >
      <span className='text-xs md:text-base'>Daily Prize Odds</span>
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
