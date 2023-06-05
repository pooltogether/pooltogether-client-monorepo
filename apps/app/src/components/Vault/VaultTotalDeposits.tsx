import { Vault } from '@pooltogether/hyperstructure-client-js'
import { useVaultBalance } from '@pooltogether/hyperstructure-react-hooks'
import { TokenValue } from 'react-components'
import { Spinner } from 'ui'

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
