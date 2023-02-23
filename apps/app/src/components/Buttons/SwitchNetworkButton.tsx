import { useChainModal } from '@rainbow-me/rainbowkit'
import { useSwitchNetwork } from 'wagmi'
import { Button, ButtonProps } from 'pt-ui'
import { getNiceNetworkNameByChainId } from 'pt-utilities'

interface SwitchNetworkButtonProps extends ButtonProps {
  chainId: number
}

export const SwitchNetworkButton = (props: SwitchNetworkButtonProps) => {
  const { chainId, ...rest } = props

  const { isLoading: isSwitchingNetwork, switchNetwork } = useSwitchNetwork()
  const { openChainModal } = useChainModal()

  const networkName = getNiceNetworkNameByChainId(chainId)

  return (
    <Button
      onClick={() => (!!switchNetwork ? switchNetwork(chainId) : openChainModal())}
      disabled={isSwitchingNetwork}
      {...rest}
    >
      {isSwitchingNetwork && <span>Switching to {networkName}...</span>}
      {!isSwitchingNetwork && <span>Switch to {networkName} Network</span>}
    </Button>
  )
}
