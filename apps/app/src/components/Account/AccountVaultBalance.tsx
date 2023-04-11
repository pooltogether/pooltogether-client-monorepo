import { BigNumber } from 'ethers'
import { Vault } from 'pt-client-js'
import { TokenValue } from 'pt-components'
import { useVaultExchangeRate } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'
import { formatBigNumberForDisplay, getAssetsFromShares } from 'pt-utilities'

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
      ? getAssetsFromShares(shareBalance, vaultExchangeRate, vault.decimals)
      : BigNumber.from(0)

  return (
    <div className='flex flex-col items-center'>
      {!!vault.tokenData ? (
        <>
          <TokenValue token={{ ...vault.tokenData, amount: tokenBalance.toString() }} />
          <span className='text-sm text-pt-purple-200'>
            {formatBigNumberForDisplay(tokenBalance, vault.decimals)} {vault.tokenData.symbol}
          </span>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  )
}
