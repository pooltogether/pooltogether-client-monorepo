import { Vault } from 'pt-client-js'
import { TokenValue } from 'pt-components'
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

  if (displayCurrency) {
    return (
      <span className='text-base font-normal'>
        {!!vault.tokenData ? (
          <TokenValue
            token={{ ...vault.tokenData, price: tokenPrice, amount: totalDeposits?.toString() }}
            hideZeroes={true}
          />
        ) : (
          <Spinner />
        )}
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
