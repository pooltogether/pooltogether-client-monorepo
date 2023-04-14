import { Vault } from 'pt-client-js'
import { MODAL_KEYS, useIsModalOpen } from 'pt-generic-hooks'
import { useSelectedVault } from 'pt-hyperstructure-hooks'
import { Button, ButtonProps } from 'pt-ui'

interface DepositButtonProps extends Omit<ButtonProps, 'onClick'> {
  vault: Vault
}

export const DepositButton = (props: DepositButtonProps) => {
  const { vault, children, ...rest } = props

  const { setIsModalOpen } = useIsModalOpen(MODAL_KEYS.deposit)

  const { setSelectedVaultById } = useSelectedVault()

  const handleClick = () => {
    setSelectedVaultById(vault.id)
    setIsModalOpen(true)
  }

  return (
    <Button onClick={handleClick} {...rest}>
      {children ?? 'Deposit'}
    </Button>
  )
}
