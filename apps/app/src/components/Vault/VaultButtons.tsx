import { VaultInfo } from 'pt-types'
import { Button } from 'pt-ui'
import { DepositButton } from '@components/DepositButton'

interface VaultButtonsProps {
  vaultInfo: VaultInfo
}

export const VaultButtons = (props: VaultButtonsProps) => {
  const { vaultInfo } = props

  return (
    <div className='flex justify-end gap-2'>
      <DepositButton vaultInfo={vaultInfo}>Deposit</DepositButton>
      {/* TODO: re-add "Details" button once the vault-specific page exists (not MVP) */}
      {/* <Button color='white' outline={true}>
        Details
      </Button> */}
    </div>
  )
}
