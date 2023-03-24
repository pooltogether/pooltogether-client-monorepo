import { BigNumber, utils } from 'ethers'
import { Vault } from 'pt-client-js'
import { CurrencyValue } from 'pt-components'
import { useVaultExchangeRate, useVaultTokenAddress } from 'pt-hyperstructure-hooks'
import {
  formatBigNumberForDisplay,
  getAssetsFromShares,
  getTokenPriceFromObject
} from 'pt-utilities'
import { useAllTokenPrices } from '@hooks/useAllTokenPrices'

interface AccountVaultBalanceProps {
  vault: Vault
  shareBalance: BigNumber
  decimals: number
}

export const AccountVaultBalance = (props: AccountVaultBalanceProps) => {
  const { vault, shareBalance, decimals } = props

  const { data: vaultTokenAddress } = useVaultTokenAddress(vault)

  const { data: tokenPrices } = useAllTokenPrices()
  const usdPrice = !!vaultTokenAddress
    ? getTokenPriceFromObject(vault.chainId, vaultTokenAddress, tokenPrices)
    : 0

  const { data: vaultExchangeRate, isFetched: isFetchedVaultExchangeRate } =
    useVaultExchangeRate(vault)

  const tokenBalance =
    isFetchedVaultExchangeRate && !!vaultExchangeRate
      ? getAssetsFromShares(shareBalance, vaultExchangeRate, decimals)
      : BigNumber.from(0)

  const formattedTokenBalance = utils.formatUnits(tokenBalance, decimals)
  const usdBalance = Number(formattedTokenBalance) * usdPrice

  return (
    <div className='flex flex-col'>
      <span className='text-base'>{formatBigNumberForDisplay(tokenBalance, decimals)} </span>
      <span className='text-sm text-pt-purple-100'>
        <CurrencyValue baseValue={usdBalance} hideZeroes={true} />
      </span>
    </div>
  )
}
