import classNames from 'classnames'
import { Vault } from 'hyperstructure-client-js'
import { DepositButton, WithdrawButton } from 'react-components'

interface VaultPageButtonsProps {
  vault: Vault
  className?: string
}

export const VaultPageButtons = (props: VaultPageButtonsProps) => {
  const { vault, className } = props

  return (
    <div className={classNames('flex gap-4 items-center', className)}>
      <WithdrawButton vault={vault} color='transparent' />
      <DepositButton vault={vault} />
    </div>
  )
}
