import classNames from 'classnames'
import { useAccount } from 'wagmi'
import { Vault } from 'pt-client-js'
import { DepositButton, WithdrawButton } from 'pt-components'
import { useUserVaultShareBalance } from 'pt-hyperstructure-hooks'

interface VaultButtonsProps {
  vault: Vault
  fullSized?: boolean
  inverseOrder?: boolean
  className?: string
}

export const VaultButtons = (props: VaultButtonsProps) => {
  const { vault, fullSized, inverseOrder, className } = props

  const { address: userAddress } = useAccount()

  const { data: vaultBalance } = useUserVaultShareBalance(vault, userAddress)

  const shareBalance = vaultBalance?.amount ?? 0n

  return (
    <div className={classNames('flex items-center gap-2', className)}>
      <DepositButton
        vault={vault}
        fullSized={fullSized}
        className={inverseOrder ? 'order-2' : 'order-1'}
      />
      {shareBalance > 0n && (
        <WithdrawButton
          vault={vault}
          fullSized={fullSized}
          className={inverseOrder ? 'order-1' : 'order-2'}
          color='transparent'
        />
      )}
    </div>
  )
}
