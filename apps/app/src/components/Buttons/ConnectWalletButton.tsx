import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Button, ButtonProps } from 'pt-ui'

interface ConnectWalletButtonProps extends ButtonProps {}

export const ConnectWalletButton = (props: ConnectWalletButtonProps) => {
  const { ...rest } = props

  const { openConnectModal } = useConnectModal()

  return (
    <Button onClick={openConnectModal} {...rest}>
      Connect
    </Button>
  )
}
