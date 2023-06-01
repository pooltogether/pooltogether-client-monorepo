import classNames from 'classnames'
import { MODAL_KEYS, useIsModalOpen } from 'generic-react-hooks'
import { Vault } from 'hyperstructure-client-js'
import { useSelectedVault } from 'hyperstructure-react-hooks'
import { Button, ButtonProps } from 'ui'

interface WithdrawButtonProps extends Omit<ButtonProps, 'onClick'> {
  vault: Vault
}

export const WithdrawButton = (props: WithdrawButtonProps) => {
  const { vault, children, className, ...rest } = props

  const { setIsModalOpen } = useIsModalOpen(MODAL_KEYS.withdraw)

  const { setSelectedVaultById } = useSelectedVault()

  const handleClick = () => {
    setSelectedVaultById(vault.id)
    setIsModalOpen(true)
  }

  return (
    <Button onClick={handleClick} className={classNames('w-24', className)} {...rest}>
      {children ?? 'Withdraw'}
    </Button>
  )
}
