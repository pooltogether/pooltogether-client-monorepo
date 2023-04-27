import { Vault } from 'pt-client-js'
import { TokenValue } from 'pt-components'
import { useVaultBalance } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'

interface VaultTotalDepositsProps {
  vault: Vault
}

export const VaultTotalDeposits = (props: VaultTotalDepositsProps) => {
  const { vault } = props

  const { data: totalDeposits, isFetched: isFetchedTotalDeposits } = useVaultBalance(vault)

  if (!isFetchedTotalDeposits || !totalDeposits) {
    return <Spinner />
  }

  return <TokenValue token={totalDeposits} hideZeroes={true} />
}
