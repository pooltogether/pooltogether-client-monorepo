import { useAccount } from 'wagmi'
import { Vault } from 'pt-client-js'
import { DepositButton, WithdrawButton } from 'pt-components'
import { useUserVaultShareBalance } from 'pt-hyperstructure-hooks'

interface VaultButtonsProps {
  vault: Vault
}

export const VaultButtons = (props: VaultButtonsProps) => {
  const { vault } = props

  const { address: userAddress } = useAccount()

  const { data: vaultBalance } = useUserVaultShareBalance(vault, userAddress)

  const shareBalance = parseFloat(vaultBalance?.amount ?? '0')

  return (
    <div className='flex justify-end gap-2'>
      {shareBalance > 0 && <WithdrawButton vault={vault} color='transparent' />}
      <DepositButton vault={vault} />
    </div>
  )
}
