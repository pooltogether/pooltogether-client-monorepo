import { BigNumber, utils } from 'ethers'
import { CurrencyValue } from 'pt-components'
import { useVault, useVaultExchangeRate } from 'pt-hyperstructure-hooks'
import { VaultInfoWithBalance } from 'pt-types'
import {
  formatBigNumberForDisplay,
  getAssetsFromShares,
  getTokenPriceFromObject
} from 'pt-utilities'
import { useAllCoingeckoTokenPrices } from '@hooks/useAllCoingeckoTokenPrices'

interface AccountVaultBalanceProps {
  vaultInfo: VaultInfoWithBalance
}

export const AccountVaultBalance = (props: AccountVaultBalanceProps) => {
  const { vaultInfo } = props

  const { data: tokenPrices } = useAllCoingeckoTokenPrices()
  const usdPrice = getTokenPriceFromObject(
    vaultInfo.chainId,
    vaultInfo.extensions.underlyingAsset.address,
    tokenPrices
  )

  const vault = useVault(vaultInfo)

  const { data: vaultExchangeRate } = useVaultExchangeRate(vault)

  const shareBalance = BigNumber.from(vaultInfo.balance)
  const tokenBalance = getAssetsFromShares(shareBalance, vaultExchangeRate, vaultInfo.decimals)

  const formattedTokenBalance = utils.formatUnits(tokenBalance, vaultInfo.decimals)
  const usdBalance = Number(formattedTokenBalance) * usdPrice

  return (
    <div className='flex flex-col'>
      <span className='text-base'>
        {formatBigNumberForDisplay(tokenBalance, vaultInfo.decimals.toString())}{' '}
      </span>
      <span className='text-sm text-pt-purple-100'>
        <CurrencyValue baseValue={usdBalance} hideZeroes={true} />
      </span>
    </div>
  )
}
