import { Vault } from 'pt-client-js'
import { DepositButton } from '@components/DepositButton'
import { WithdrawButton } from '@components/WithdrawButton'

interface AccountVaultButtonsProps {
  vault: Vault
}

export const AccountVaultButtons = (props: AccountVaultButtonsProps) => {
  const { vault } = props

  return (
    <div className='flex justify-end gap-2'>
      <DepositButton vault={vault} />
      <WithdrawButton vault={vault} />
    </div>
  )
}
