import { Vault } from 'pt-client-js'
import { Spinner } from 'pt-ui'
import { getNiceNetworkNameByChainId } from 'pt-utilities'
import { NetworkBadge } from '../../../Badges/NetworkBadge'
import { WithdrawForm } from '../../../Form/WithdrawForm'
import { NetworkFees } from '../../NetworkFees'

interface MainViewProps {
  vault: Vault
}

export const MainView = (props: MainViewProps) => {
  const { vault } = props

  const networkName = getNiceNetworkNameByChainId(vault.chainId)

  return (
    <div className='flex flex-col gap-6'>
      <span className='text-xl font-semibold text-center'>
        Withdraw from {vault.name ?? <Spinner />} on {networkName}
      </span>
      <NetworkBadge
        chainId={vault.chainId}
        appendText='Prize Pool'
        hideBorder={true}
        className='!py-1 mx-auto'
      />
      {!!vault.shareData && !!vault.tokenData && vault.decimals !== undefined && (
        <WithdrawForm vault={vault} showInputInfoRows={true} />
      )}
      <NetworkFees vault={vault} show={['withdraw']} />
    </div>
  )
}
