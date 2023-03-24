import { Vault } from 'pt-client-js'
import { Button } from 'pt-ui'
import { DepositButton } from '@components/DepositButton'

interface VaultButtonsProps {
  vault: Vault
}

export const VaultButtons = (props: VaultButtonsProps) => {
  const { vault } = props

  return (
    <div className='flex justify-end gap-2'>
      <DepositButton vault={vault}>Deposit</DepositButton>
      {/* TODO: details button functionality */}
      <Button color='white' outline={true}>
        Details
      </Button>
    </div>
  )
}
