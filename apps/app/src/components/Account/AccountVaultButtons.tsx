import { VaultInfo } from 'pt-types'
import { Button } from 'pt-ui'
import { DepositButton } from '@components/Deposit/DepositButton'

interface AccountVaultButtonsProps {
  vaultInfo: VaultInfo
}

export const AccountVaultButtons = (props: AccountVaultButtonsProps) => {
  const { vaultInfo } = props

  return (
    <div className='flex gap-2'>
      <DepositButton vaultInfo={vaultInfo}>Deposit</DepositButton>
      <Button color='white' outline={true}>
        Withdraw
      </Button>
    </div>
  )
}
