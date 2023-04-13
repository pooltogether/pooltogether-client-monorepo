import classNames from 'classnames'
import { Vault } from 'pt-client-js'
import { DepositButton } from '@components/DepositButton'
import { WithdrawButton } from '@components/WithdrawButton'

interface VaultPageButtonsProps {
  vault: Vault
  className?: string
}

export const VaultPageButtons = (props: VaultPageButtonsProps) => {
  const { vault, className } = props

  return (
    <div className={classNames('flex gap-4 items-center', className)}>
      <DepositButton vault={vault} color='transparent' />
      <WithdrawButton vault={vault} color='transparent' />
    </div>
  )
}
