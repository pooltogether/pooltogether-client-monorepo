import { Vault } from 'pt-client-js'
import { MODAL_KEYS, useIsModalOpen } from 'pt-generic-hooks'
import { useSelectedVault } from 'pt-hyperstructure-hooks'
import { Button, ButtonProps } from 'pt-ui'

interface WithdrawButtonProps extends Omit<ButtonProps, 'onClick'> {
  vault: Vault
}

export const WithdrawButton = (props: WithdrawButtonProps) => {
  const { vault, children, ...rest } = props

  const { setIsModalOpen } = useIsModalOpen(MODAL_KEYS.withdraw)

  const { setSelectedVaultById } = useSelectedVault()

  const handleClick = () => {
    setSelectedVaultById(vault.id)
    setIsModalOpen(true)
  }

  return (
    <Button onClick={handleClick} {...rest}>
      {children ?? 'Withdraw'}
    </Button>
  )
}
