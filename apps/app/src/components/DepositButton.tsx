import { Vault } from 'pt-client-js'
import { useIsDepositModalOpen } from 'pt-generic-hooks'
import { useSelectedVault } from 'pt-hyperstructure-hooks'
import { Button, ButtonProps } from 'pt-ui'

interface DepositButtonProps extends Omit<ButtonProps, 'onClick'> {
  vault: Vault
}

export const DepositButton = (props: DepositButtonProps) => {
  const { vault, children, ...rest } = props

  const { setIsDepositModalOpen } = useIsDepositModalOpen()

  const { setSelectedVaultById } = useSelectedVault()

  const handleClick = () => {
    setSelectedVaultById(vault.id)
    setIsDepositModalOpen(true)
  }

  return (
    <Button onClick={handleClick} {...rest}>
      {children ?? 'Deposit'}
    </Button>
  )
}
