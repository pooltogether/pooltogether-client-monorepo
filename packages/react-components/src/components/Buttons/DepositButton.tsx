import { MODAL_KEYS, useIsModalOpen } from '@pooltogether/generic-react-hooks'
import { Vault } from '@pooltogether/hyperstructure-client-js'
import { useSelectedVault } from '@pooltogether/hyperstructure-react-hooks'
import { Button, ButtonProps } from '@pooltogether/ui'
import classNames from 'classnames'

interface DepositButtonProps extends Omit<ButtonProps, 'onClick'> {
  vault: Vault
}

export const DepositButton = (props: DepositButtonProps) => {
  const { vault, children, className, ...rest } = props

  const { setIsModalOpen } = useIsModalOpen(MODAL_KEYS.deposit)

  const { setSelectedVaultById } = useSelectedVault()

  const handleClick = () => {
    setSelectedVaultById(vault.id)
    setIsModalOpen(true)
  }

  return (
    <Button onClick={handleClick} className={classNames('w-24', className)} {...rest}>
      {children ?? 'Deposit'}
    </Button>
  )
}
