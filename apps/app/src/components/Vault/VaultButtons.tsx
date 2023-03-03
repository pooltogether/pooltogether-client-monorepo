import { VaultInfo } from 'pt-types'
import { Button } from 'pt-ui'
import { DepositButton } from '@components/Deposit/DepositButton'

interface VaultButtonsProps {
  vaultInfo: VaultInfo
}

export const VaultButtons = (props: VaultButtonsProps) => {
  const { vaultInfo } = props

  return (
    <div className='flex gap-2'>
      <DepositButton vaultInfo={vaultInfo}>Deposit</DepositButton>
      <Button color='white' outline={true}>
        Details
      </Button>
    </div>
  )
}
