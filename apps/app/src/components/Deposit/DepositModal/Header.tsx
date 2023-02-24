import { VaultInfo } from 'pt-types'
import { getNiceNetworkNameByChainId } from 'pt-utilities'

interface DepositModalHeaderProps {
  vaultInfo: VaultInfo
}

export const DepositModalHeader = (props: DepositModalHeaderProps) => {
  const { vaultInfo } = props

  const networkName = getNiceNetworkNameByChainId(vaultInfo.chainId)

  return (
    <span className='font-semibold text-center mt-6'>
      Deposit to {vaultInfo.name} on {networkName}
    </span>
  )
}
