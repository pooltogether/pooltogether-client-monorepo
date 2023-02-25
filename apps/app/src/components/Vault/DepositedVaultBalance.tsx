import { BigNumber } from 'ethers'
import { VaultInfoWithBalance } from 'pt-types'
import { formatBigNumberForDisplay } from 'pt-utilities'

interface DepositedVaultBalanceProps {
  vaultInfo: VaultInfoWithBalance
}

export const DepositedVaultBalance = (props: DepositedVaultBalanceProps) => {
  return (
    <span>
      {formatBigNumberForDisplay(
        BigNumber.from(props.vaultInfo.balance),
        props.vaultInfo.decimals.toString()
      )}{' '}
      {props.vaultInfo.extensions.underlyingAsset.symbol}
    </span>
  )
}
