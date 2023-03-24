import { utils } from 'ethers'
import { Vault } from 'pt-client-js'
import { CurrencyValue } from 'pt-components'
import { useSingleVaultTokenData, useVaultBalance } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'
import { formatBigNumberForDisplay, getTokenPriceFromObject } from 'pt-utilities'
import { useAllTokenPrices } from '@hooks/useAllTokenPrices'

interface VaultTotalDepositsProps {
  vault: Vault
  displayCurrency?: boolean
}

export const VaultTotalDeposits = (props: VaultTotalDepositsProps) => {
  const { vault, displayCurrency } = props

  const { data: vaultTokenData, isFetched: isFetchedVaultTokenData } =
    useSingleVaultTokenData(vault)

  const { data: tokenPrices, isFetched: isFetchedTokenPrices } = useAllTokenPrices()
  const usdPrice = !!vaultTokenData
    ? getTokenPriceFromObject(vault.chainId, vaultTokenData.address, tokenPrices)
    : 0

  const { data: totalDeposits, isFetched: isFetchedTotalDeposits } = useVaultBalance(vault)

  if (
    !isFetchedTotalDeposits ||
    !isFetchedVaultTokenData ||
    (displayCurrency && !isFetchedTokenPrices)
  ) {
    return <Spinner />
  }

  if (displayCurrency) {
    const formattedTokenAmount =
      !!totalDeposits && vaultTokenData
        ? Number(utils.formatUnits(totalDeposits, vaultTokenData.decimals))
        : 0

    return (
      <span className='text-base font-normal'>
        <CurrencyValue baseValue={formattedTokenAmount * usdPrice} hideZeroes={true} />
      </span>
    )
  }

  return (
    <span className='text-base font-normal'>
      {!!totalDeposits && vaultTokenData
        ? formatBigNumberForDisplay(totalDeposits, vaultTokenData.decimals, {
            hideZeroes: true
          })
        : 0}{' '}
      {vaultTokenData?.symbol}
    </span>
  )
}
