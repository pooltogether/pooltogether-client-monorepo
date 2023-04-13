import { Vault } from 'pt-client-js'
import { TokenValue } from 'pt-components'
import { useVaultBalance, useVaultTokenData } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'

interface VaultTotalDepositsProps {
  vault: Vault
}

export const VaultTotalDeposits = (props: VaultTotalDepositsProps) => {
  const { vault } = props

  const { data: totalDeposits, isFetched: isFetchedTotalDeposits } = useVaultBalance(vault)

  // TODO: this data shouldn't be necessary if useSelectedVaults is doing its job - should investigate
  const { data: tokenData } = useVaultTokenData(vault)

  if (!isFetchedTotalDeposits || !totalDeposits || (!vault.tokenData && !tokenData)) {
    return <Spinner />
  }

  return (
    <TokenValue
      token={{ ...(vault.tokenData ?? tokenData), amount: totalDeposits.toString() }}
      hideZeroes={true}
    />
  )
}
