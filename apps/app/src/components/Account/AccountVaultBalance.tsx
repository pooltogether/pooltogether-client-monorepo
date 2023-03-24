import { BigNumber, utils } from 'ethers'
import { Vault } from 'pt-client-js'
import { CurrencyValue } from 'pt-components'
import { useVaultExchangeRate } from 'pt-hyperstructure-hooks'
import { TokenWithBalance } from 'pt-types'
import {
  formatBigNumberForDisplay,
  getAssetsFromShares,
  getTokenPriceFromObject
} from 'pt-utilities'
import { useAllTokenPrices } from '@hooks/useAllTokenPrices'

interface AccountVaultBalanceProps {
  vault: Vault
  tokenData: TokenWithBalance
}

export const AccountVaultBalance = (props: AccountVaultBalanceProps) => {
  const { vault, tokenData } = props

  const { data: tokenPrices } = useAllTokenPrices()
  const usdPrice = getTokenPriceFromObject(vault.chainId, tokenData.address, tokenPrices)

  const { data: vaultExchangeRate, isFetched: isFetchedVaultExchangeRate } =
    useVaultExchangeRate(vault)

  const shareBalance = BigNumber.from(tokenData.balance)
  const tokenBalance =
    isFetchedVaultExchangeRate && !!vaultExchangeRate
      ? getAssetsFromShares(shareBalance, vaultExchangeRate, tokenData.decimals)
      : BigNumber.from(0)

  const formattedTokenBalance = utils.formatUnits(tokenBalance, tokenData.decimals)
  const usdBalance = Number(formattedTokenBalance) * usdPrice

  return (
    <div className='flex flex-col'>
      <span className='text-base'>
        {formatBigNumberForDisplay(tokenBalance, tokenData.decimals)}{' '}
      </span>
      <span className='text-sm text-pt-purple-100'>
        <CurrencyValue baseValue={usdBalance} hideZeroes={true} />
      </span>
    </div>
  )
}
