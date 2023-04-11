import { Vault } from 'pt-client-js'
import { Spinner } from 'pt-ui'
import { getNiceNetworkNameByChainId } from 'pt-utilities'
import { NetworkBadge } from '../Badges/NetworkBadge'
import { WithdrawForm } from '../Form/WithdrawForm'

interface WithdrawModalBodyProps {
  vault: Vault
}

export const WithdrawModalBody = (props: WithdrawModalBodyProps) => {
  const { vault } = props

  const networkName = getNiceNetworkNameByChainId(vault.chainId)

  return (
    <div className='flex flex-col gap-6'>
      <span className='w-full text-xl font-semibold text-center'>
        Withdraw from {vault.name ?? <Spinner />} on {networkName}
      </span>
      <div className='flex flex-col items-center gap-1'>
        <NetworkBadge chainId={vault.chainId} appendText='Prize Pool' />
      </div>
      {!!vault.shareData && !!vault.tokenData && vault.decimals !== undefined && (
        <WithdrawForm vault={vault} />
      )}
    </div>
  )
}
