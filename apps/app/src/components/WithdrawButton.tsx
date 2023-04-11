import { Vault } from 'pt-client-js'
import { useIsWithdrawModalOpen } from 'pt-generic-hooks'
import { useSelectedVault } from 'pt-hyperstructure-hooks'
import { Button, ButtonProps } from 'pt-ui'

interface WithdrawButtonProps extends Omit<ButtonProps, 'onClick'> {
  vault: Vault
}

export const WithdrawButton = (props: WithdrawButtonProps) => {
  const { vault, children, ...rest } = props

  const { setIsWithdrawModalOpen } = useIsWithdrawModalOpen()

  const { setSelectedVaultById } = useSelectedVault()

  const handleClick = () => {
    setSelectedVaultById(vault.id)
    setIsWithdrawModalOpen(true)
  }

  return (
    <Button onClick={handleClick} {...rest}>
      {children ?? 'Withdraw'}
    </Button>
  )
}
