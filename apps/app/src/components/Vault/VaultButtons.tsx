import { Vault } from 'pt-client-js'
import { DepositButton } from '@components/DepositButton'

interface VaultButtonsProps {
  vault: Vault
}

export const VaultButtons = (props: VaultButtonsProps) => {
  const { vault } = props

  return (
    <div className='flex justify-end gap-2'>
      <DepositButton vault={vault} />
    </div>
  )
}
