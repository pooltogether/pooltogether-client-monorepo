import { Vault } from 'pt-client-js'
import { Spinner } from 'pt-ui'
import { getNiceNetworkNameByChainId } from 'pt-utilities'
import { NetworkBadge } from '../Badges/NetworkBadge'
import { DepositForm } from '../Form/DepositForm'

interface DepositModalBodyProps {
  vault: Vault
}

export const DepositModalBody = (props: DepositModalBodyProps) => {
  const { vault } = props

  const networkName = getNiceNetworkNameByChainId(vault.chainId)

  return (
    <div className='flex flex-col gap-6'>
      <span className='w-full text-xl font-semibold text-center'>
        Deposit to {vault.name ?? <Spinner />} on {networkName}
      </span>
      <div className='flex flex-col items-center gap-1'>
        <NetworkBadge chainId={vault.chainId} appendText='Prize Pool' />
      </div>
      {!!vault.shareData && !!vault.tokenData && vault.decimals !== undefined && (
        <DepositForm vault={vault} />
      )}
    </div>
  )
}
