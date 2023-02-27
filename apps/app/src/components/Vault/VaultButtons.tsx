import { VaultInfo } from 'pt-types'
import { Button } from 'pt-ui'
import { DepositButton } from '@components/Deposit/DepositButton'

interface VaultButtonsProps {
  vaultInfo: VaultInfo
}

export const VaultButtons = (props: VaultButtonsProps) => {
  return (
    <div className='flex gap-2'>
      <DepositButton vaultInfo={props.vaultInfo} />
      <Button theme={'purple'} outline={true}>
        Details
      </Button>
    </div>
  )
}
