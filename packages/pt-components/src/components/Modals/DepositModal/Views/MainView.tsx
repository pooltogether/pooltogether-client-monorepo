import { PrizePool, Vault } from 'pt-client-js'
import { Spinner } from 'pt-ui'
import { getNiceNetworkNameByChainId } from 'pt-utilities'
import { NetworkBadge } from '../../../Badges/NetworkBadge'
import { DepositForm } from '../../../Form/DepositForm'
import { NetworkFees } from '../../NetworkFees'
import { Odds } from '../../Odds'

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
        <DepositForm vault={vault} showInputInfoRows={true} />
      )}
      <div className='flex gap-9 mx-auto'>
        <Odds vault={vault} prizePool={prizePool} />
        <NetworkFees vault={vault} />
      </div>
    </div>
  )
}
