import classNames from 'classnames'
import { Vault } from 'pt-client-js'
import { DepositButton, WithdrawButton } from 'pt-components'

interface VaultPageButtonsProps {
  vault: Vault
  className?: string
}

export const VaultPageButtons = (props: VaultPageButtonsProps) => {
  const { vault, className } = props

  return (
    <div className={classNames('flex gap-4 items-center', className)}>
      <DepositButton vault={vault} />
      <WithdrawButton vault={vault} color='transparent' />
    </div>
  )
}
