import { BigNumber } from 'ethers'
import { Vault } from 'pt-client-js'
import { useVaultExchangeRate } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'
import { getAssetsFromShares } from 'pt-utilities'
import { TokenValueAndAmount } from '@components/TokenValueAndAmount'

interface AccountVaultBalanceProps {
  vault: Vault
  shareBalance: BigNumber
}

export const AccountVaultBalance = (props: AccountVaultBalanceProps) => {
  const { vault, shareBalance } = props

  const { data: vaultExchangeRate, isFetched: isFetchedVaultExchangeRate } =
    useVaultExchangeRate(vault)

  const tokenBalance =
    isFetchedVaultExchangeRate && !!vaultExchangeRate && vault.decimals !== undefined
      ? getAssetsFromShares(shareBalance, vaultExchangeRate, vault.decimals).toString()
      : '0'

  return (
    <div className='flex flex-col items-center'>
      {!!vault.tokenData ? (
        <TokenValueAndAmount token={{ ...vault.tokenData, amount: tokenBalance }} />
      ) : (
        <Spinner />
      )}
    </div>
  )
}
