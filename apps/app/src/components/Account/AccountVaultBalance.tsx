import { BigNumber, utils } from 'ethers'
import { Vault } from 'pt-client-js'
import { CurrencyValue } from 'pt-components'
import { useVaultExchangeRate } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'
import {
  formatBigNumberForDisplay,
  getAssetsFromShares,
  getTokenPriceFromObject
} from 'pt-utilities'
import { useAllTokenPrices } from '@hooks/useAllTokenPrices'

interface AccountVaultBalanceProps {
  vault: Vault
  shareBalance: BigNumber
}

export const AccountVaultBalance = (props: AccountVaultBalanceProps) => {
  const { vault, shareBalance } = props

  const { data: tokenPrices } = useAllTokenPrices()
  const usdPrice = !!vault.tokenData
    ? getTokenPriceFromObject(vault.chainId, vault.tokenData.address, tokenPrices)
    : 0

  const { data: vaultExchangeRate, isFetched: isFetchedVaultExchangeRate } =
    useVaultExchangeRate(vault)

  const tokenBalance =
    isFetchedVaultExchangeRate && !!vaultExchangeRate && vault.decimals !== undefined
      ? getAssetsFromShares(shareBalance, vaultExchangeRate, vault.decimals)
      : BigNumber.from(0)

  const formattedTokenBalance =
    vault.decimals !== undefined ? utils.formatUnits(tokenBalance, vault.decimals) : '0'
  const usdBalance = Number(formattedTokenBalance) * usdPrice

  return (
    <div className='flex flex-col'>
      {vault.decimals !== undefined ? (
        <>
          <span className='text-base'>
            {formatBigNumberForDisplay(tokenBalance, vault.decimals)}
          </span>
          <span className='text-sm text-pt-purple-100'>
            <CurrencyValue baseValue={usdBalance} hideZeroes={true} />
          </span>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  )
}
