import { Vault } from 'pt-client-js'
import { TokenWithBalance } from 'pt-types'

interface AccountVaultOddsProps {
  vault: Vault
  tokenData: TokenWithBalance
}

// TODO: calculate odds
export const AccountVaultOdds = (props: AccountVaultOddsProps) => {
  const { vault, tokenData } = props

  return <span className='text-base'>1 in X</span>
}
