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

  const shareBalance = vaultBalance?.amount ?? 0n

  return (
    <div className='flex justify-end items-center gap-2'>
      {shareBalance > 0n && <WithdrawButton vault={vault} color='transparent' />}
      <DepositButton vault={vault} />
    </div>
  )
}
