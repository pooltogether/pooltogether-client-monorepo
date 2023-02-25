import { utils } from 'ethers'
import { UseFormWatch } from 'react-hook-form'
import { useAccount, useNetwork, useProvider } from 'wagmi'
import { useTokenAllowance } from 'pt-hooks'
import { VaultInfo } from 'pt-types'
import { ConnectWalletButton } from '@components/Buttons/ConnectWalletButton'
import { SendApproveButton } from '@components/Buttons/SendApproveButton'
import { SendDepositButton } from '@components/Buttons/SendDepositButton'
import { SwitchNetworkButton } from '@components/Buttons/SwitchNetworkButton'
import { DepositFormValues } from './DepositForm'
import { isValidFormInput } from './DepositFormInput'

interface DepositModalFooterProps {
  vaultInfo: VaultInfo
  watch: UseFormWatch<DepositFormValues>
  isValidFormInputs: boolean
}

export const DepositModalFooter = (props: DepositModalFooterProps) => {
  const { vaultInfo, watch, isValidFormInputs } = props

  const { address: userAddress, isDisconnected } = useAccount()
  const { chain } = useNetwork()

  const provider = useProvider({ chainId: vaultInfo.chainId })
  const { data: allowance, isFetched: isFetchedAllowance } = useTokenAllowance(
    provider,
    userAddress,
    vaultInfo.address,
    vaultInfo.extensions.underlyingAsset.address
  )

  const formTokenAmount = watch('tokenAmount', '0')
  const depositAmount = utils.parseUnits(
    isValidFormInput(formTokenAmount, vaultInfo.decimals) ? formTokenAmount : '0',
    vaultInfo.decimals
  )

  if (isDisconnected) {
    return <ConnectWalletButton fullSized={true} />
  } else if (chain?.id !== vaultInfo.chainId) {
    return <SwitchNetworkButton chainId={vaultInfo.chainId} fullSized={true} />
  } else if (!isFetchedAllowance || allowance.lt(depositAmount)) {
    return (
      <SendApproveButton
        amount={depositAmount}
        vaultInfo={vaultInfo}
        fullSized={true}
        disabled={!isValidFormInputs}
      />
    )
  } else {
    return (
      <SendDepositButton
        depositAmount={depositAmount}
        vaultInfo={vaultInfo}
        fullSized={true}
        disabled={!isValidFormInputs}
      />
    )
  }
}
