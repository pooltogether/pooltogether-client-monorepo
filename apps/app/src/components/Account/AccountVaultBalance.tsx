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
    <div className='flex flex-col'>
      {!!vault.tokenData ? (
        <>
          <span className='text-base'>
            {formatBigNumberForDisplay(tokenBalance, vault.decimals)}
          </span>
          <span className='text-sm text-pt-purple-100'>
            <TokenValue
              token={{ ...vault.tokenData, amount: tokenBalance.toString() }}
              hideZeroes={true}
            />
          </span>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  )
}
