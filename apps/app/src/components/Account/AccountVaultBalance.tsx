import { BigNumber, utils } from 'ethers'
import { Vault } from 'pt-client-js'
import { CurrencyValue } from 'pt-components'
import { useVaultExchangeRate, useVaultTokenPrice } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'
import { formatBigNumberForDisplay, getAssetsFromShares } from 'pt-utilities'

interface AccountVaultBalanceProps {
  vault: Vault
  shareBalance: BigNumber
}

export const AccountVaultBalance = (props: AccountVaultBalanceProps) => {
  const { vault, shareBalance } = props

  const { tokenPrice } = useVaultTokenPrice(vault)

  const { data: vaultExchangeRate, isFetched: isFetchedVaultExchangeRate } =
    useVaultExchangeRate(vault)

  const tokenBalance =
    isFetchedVaultExchangeRate && !!vaultExchangeRate && vault.decimals !== undefined
      ? getAssetsFromShares(shareBalance, vaultExchangeRate, vault.decimals)
      : BigNumber.from(0)

  const formattedTokenBalance =
    vault.decimals !== undefined ? Number(utils.formatUnits(tokenBalance, vault.decimals)) : 0
  const tokenValue = !!tokenPrice ? formattedTokenBalance * tokenPrice : 0

  return (
    <div className='flex flex-col'>
      {vault.decimals !== undefined ? (
        <>
          <span className='text-base'>
            {formatBigNumberForDisplay(tokenBalance, vault.decimals)}
          </span>
          <span className='text-sm text-pt-purple-100'>
            <CurrencyValue baseValue={tokenValue} hideZeroes={true} />
          </span>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  )
}
