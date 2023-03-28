import { utils } from 'ethers'
import { Vault } from 'pt-client-js'
import { CurrencyValue } from 'pt-components'
import { useVaultBalance } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'
import { formatBigNumberForDisplay, getTokenPriceFromObject } from 'pt-utilities'
import { useAllTokenPrices } from '@hooks/useAllTokenPrices'

interface VaultTotalDepositsProps {
  vault: Vault
  displayCurrency?: boolean
}

export const VaultTotalDeposits = (props: VaultTotalDepositsProps) => {
  const { vault, displayCurrency } = props

  const { data: tokenPrices, isFetched: isFetchedTokenPrices } = useAllTokenPrices()
  const usdPrice = !!vault.tokenData
    ? getTokenPriceFromObject(vault.chainId, vault.tokenData.address, tokenPrices)
    : 0

  const { data: totalDeposits, isFetched: isFetchedTotalDeposits } = useVaultBalance(vault)

  if (!isFetchedTotalDeposits || !vault.tokenData || (displayCurrency && !isFetchedTokenPrices)) {
    return <Spinner />
  }

  if (displayCurrency) {
    const formattedTokenAmount = !!totalDeposits
      ? Number(utils.formatUnits(totalDeposits, vault.decimals))
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
        ? formatBigNumberForDisplay(totalDeposits, vault.decimals, {
            hideZeroes: true
          })
        : 0}{' '}
      {vault.tokenData.symbol}
    </span>
  )
}
