import { VaultInfo } from 'pt-types'
import { getNiceNetworkNameByChainId } from 'pt-utilities'

interface DepositModalHeaderProps {
  vaultInfo: VaultInfo
}

export const DepositModalHeader = (props: DepositModalHeaderProps) => {
  const vaultName = props.vaultInfo.name
  const networkName = getNiceNetworkNameByChainId(props.vaultInfo.chainId)

  return (
    <span className='font-semibold text-center mt-6'>
      Deposit to {vaultName} on {networkName}
    </span>
  )
}
