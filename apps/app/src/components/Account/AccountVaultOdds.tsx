import { VaultInfoWithBalance } from 'pt-types'

interface AccountVaultOddsProps {
  vaultInfo: VaultInfoWithBalance
}

// TODO: calculate odds
export const AccountVaultOdds = (props: AccountVaultOddsProps) => {
  const { vaultInfo } = props

  return <span className='text-base'>1 in X</span>
}
