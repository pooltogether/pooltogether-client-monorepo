import { Vault } from 'pt-client-js'

interface AccountVaultOddsProps {
  vault: Vault
}

// TODO: calculate odds
export const AccountVaultOdds = (props: AccountVaultOddsProps) => {
  const { vault } = props

  return <span className='text-base'>1 in X</span>
}
