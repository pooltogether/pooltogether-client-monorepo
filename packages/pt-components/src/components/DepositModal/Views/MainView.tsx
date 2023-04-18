import { Vault } from 'pt-client-js'
import { Spinner } from 'pt-ui'
import { getNiceNetworkNameByChainId } from 'pt-utilities'
import { NetworkBadge } from '../../Badges/NetworkBadge'
import { DepositForm } from '../../Form/DepositForm'

interface MainViewProps {
  vault: Vault
}

export const MainView = (props: MainViewProps) => {
  const { vault } = props

  const networkName = getNiceNetworkNameByChainId(vault.chainId)

  const odds = 'X' // TODO: calculate odds

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
      <div className='flex flex-col items-center gap-2'>
        <span className='text-xs font-semibold text-pt-purple-100'>Weekly Chance of Winning</span>
        <span className='text-sm text-pt-purple-50'>1 in {odds}</span>
      </div>
      {/* TODO: add estimated network gas fees */}
    </div>
  )
}
