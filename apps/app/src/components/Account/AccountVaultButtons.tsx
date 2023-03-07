import { VaultInfo } from 'pt-types'
import { DepositButton } from '@components/Deposit/DepositButton'
import { WithdrawButton } from '@components/Withdraw/WithdrawButton'

interface AccountVaultButtonsProps {
  vaultInfo: VaultInfo
}

export const AccountVaultButtons = (props: AccountVaultButtonsProps) => {
  const { vaultInfo } = props

  return (
    <div className='flex justify-end gap-2'>
      <DepositButton vaultInfo={vaultInfo}>Deposit</DepositButton>
      <WithdrawButton vaultInfo={vaultInfo}>Withdraw</WithdrawButton>
    </div>
  )
}
