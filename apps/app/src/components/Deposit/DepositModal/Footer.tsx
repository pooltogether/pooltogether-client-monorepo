import { BigNumber } from 'ethers'
import { useAccount, useNetwork, useProvider } from 'wagmi'
import { useTokenAllowance } from 'pt-hooks'
import { VaultInfo } from 'pt-types'
import { ConnectWalletButton } from '@components/Buttons/ConnectWalletButton'
import { SendApproveButton } from '@components/Buttons/SendApproveButton'
import { SendDepositButton } from '@components/Buttons/SendDepositButton'
import { SwitchNetworkButton } from '@components/Buttons/SwitchNetworkButton'

interface DepositModalFooterProps {
  vaultInfo: VaultInfo
  depositAmount: BigNumber // TODO: possibly get this directly from a form hook instead
}

export const DepositModalFooter = (props: DepositModalFooterProps) => {
  const { address: userAddress, isDisconnected } = useAccount()
  const { chain } = useNetwork()

  const provider = useProvider({ chainId: props.vaultInfo.chainId })
  const { data: allowance, isFetched: isFetchedAllowance } = useTokenAllowance(
    provider,
    userAddress,
    props.vaultInfo.address,
    props.vaultInfo.extensions.underlyingAsset.address
  )

  if (isDisconnected) {
    return <ConnectWalletButton fullSized={true} />
  } else if (chain?.id !== props.vaultInfo.chainId) {
    return <SwitchNetworkButton chainId={props.vaultInfo.chainId} fullSized={true} />
  } else if (!isFetchedAllowance || allowance.lt(props.depositAmount)) {
    return (
      <SendApproveButton
        depositAmount={props.depositAmount}
        vaultInfo={props.vaultInfo}
        fullSized={true}
      />
    )
  } else {
    return (
      <SendDepositButton
        depositAmount={props.depositAmount}
        vaultInfo={props.vaultInfo}
        fullSized={true}
      />
    )
  }
}
