import { useAccount } from 'wagmi'
import { PrizePool, Vault } from 'pt-client-js'
import { usePrizeOdds, useUserVaultShareBalance } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'
import { getNiceNetworkNameByChainId } from 'pt-utilities'
import { NetworkBadge } from '../../../Badges/NetworkBadge'
import { DepositForm } from '../../../Form/DepositForm'

interface MainViewProps {
  vault: Vault
  prizePool: PrizePool
}

export const MainView = (props: MainViewProps) => {
  const { vault, prizePool } = props

  const networkName = getNiceNetworkNameByChainId(vault.chainId)

  return (
    <div className='flex flex-col gap-6'>
      <span className='text-xl font-semibold text-center'>
        Deposit to {vault.name ?? <Spinner />} on {networkName}
      </span>
      <NetworkBadge
        chainId={vault.chainId}
        appendText='Prize Pool'
        hideBorder={true}
        className='!py-1 mx-auto'
      />
      {!!vault.shareData && !!vault.tokenData && vault.decimals !== undefined && (
        <DepositForm vault={vault} />
      )}
      <WeeklyOdds vault={vault} prizePool={prizePool} />
      {/* TODO: add estimated network gas fees */}
    </div>
  )
}

interface WeeklyOddsProps {
  vault: Vault
  prizePool: PrizePool
}

const WeeklyOdds = (props: WeeklyOddsProps) => {
  const { vault, prizePool } = props

  const { address: userAddress } = useAccount()

  const { data: shareBalance, isFetched: isFetchedShareBalance } = useUserVaultShareBalance(
    vault,
    userAddress as `0x${string}`
  )

  const { data: prizeOdds, isFetched: isFetchedPrizeOdds } = usePrizeOdds(
    prizePool,
    vault,
    shareBalance?.amount ?? '0'
  )

  return (
    <div className='flex flex-col items-center gap-2'>
      <span className='text-xs font-semibold text-pt-purple-100'>Weekly Chance of Winning</span>
      <span className='text-sm text-pt-purple-50'>
        {isFetchedShareBalance && isFetchedPrizeOdds && !!prizeOdds ? (
          `1 in ${prizeOdds.oneInX}`
        ) : (
          <Spinner />
        )}
      </span>
    </div>
  )
}
