import { utils } from 'ethers'
import { CurrencyValue } from 'pt-components'
import { useVault, useVaultBalance } from 'pt-hyperstructure-hooks'
import { VaultInfo } from 'pt-types'
import { Spinner } from 'pt-ui'
import { formatBigNumberForDisplay, getTokenPriceFromObject } from 'pt-utilities'
import { useAllCoingeckoTokenPrices } from '@hooks/useAllCoingeckoTokenPrices'

interface VaultTotalDepositsProps {
  vaultInfo: VaultInfo
  displayCurrency?: boolean
}

export const VaultTotalDeposits = (props: VaultTotalDepositsProps) => {
  const { vaultInfo, displayCurrency } = props

  const vault = useVault(vaultInfo)

  const { data: tokenPrices, isFetched: isFetchedTokenPrices } = useAllCoingeckoTokenPrices()
  const usdPrice = getTokenPriceFromObject(
    vaultInfo.chainId,
    vaultInfo.extensions.underlyingAsset.address,
    tokenPrices
  )

  const { data: totalDeposits, isFetched: isFetchedTotalDeposits } = useVaultBalance(vault)

  if (!isFetchedTotalDeposits || (displayCurrency && !isFetchedTokenPrices)) {
    return <Spinner />
  }

  if (displayCurrency) {
    const formattedTokenAmount = !!totalDeposits
      ? Number(utils.formatUnits(totalDeposits, vaultInfo.decimals))
      : 0

    return (
      <span className='text-base font-normal'>
        <CurrencyValue baseValue={formattedTokenAmount * usdPrice} hideZeroes={true} />
      </span>
    )
  }

  return (
    <span className='text-base font-normal'>
      {!!totalDeposits
        ? formatBigNumberForDisplay(totalDeposits, vaultInfo.decimals.toString(), {
            hideZeroes: true
          })
        : 0}{' '}
      {vaultInfo.extensions.underlyingAsset.symbol}
    </span>
  )
}
