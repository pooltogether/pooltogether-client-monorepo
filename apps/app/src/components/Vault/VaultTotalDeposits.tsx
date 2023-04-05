import { utils } from 'ethers'
import { Vault } from 'pt-client-js'
import { CurrencyValue } from 'pt-components'
import { useVaultBalance, useVaultTokenPrice } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'
import { formatBigNumberForDisplay } from 'pt-utilities'

interface VaultTotalDepositsProps {
  vault: Vault
  displayCurrency?: boolean
}

export const VaultTotalDeposits = (props: VaultTotalDepositsProps) => {
  const { vault, displayCurrency } = props

  const { tokenPrice, isFetched: isFetchedTokenPrice } = useVaultTokenPrice(vault)

  const { data: totalDeposits, isFetched: isFetchedTotalDeposits } = useVaultBalance(vault)

  if (!isFetchedTotalDeposits || !vault.tokenData || (displayCurrency && !isFetchedTokenPrice)) {
    return <Spinner />
  }

  if (displayCurrency && tokenPrice !== undefined) {
    const formattedTokenAmount = !!totalDeposits
      ? Number(utils.formatUnits(totalDeposits, vault.decimals))
      : 0

    return (
      <span className='text-base font-normal'>
        <CurrencyValue baseValue={formattedTokenAmount * tokenPrice} hideZeroes={true} />
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
